import './App.css';
import Category from './components/Category';
import Item from './components/Item';
import SummaryItem from './components/SummaryItem';
import SummaryModal from './components/SummaryModal';
import { currencyString } from './util';
import { plantData } from './data/plants';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

function App() {

  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const phoneInput = useRef(null);
  const emailInput = useRef(null);
  const totalOutput = useRef(null);
  const loadingBox = useRef(null);
  const summaryBkg = useRef(null);
  const summaryBox = useRef(null);
  const submitButton = useRef(null);

  const[myQuants, setQuants] = useState();
  const[summaryItems, setSummary] = useState({text: "no text", html: null});

  let sum = 0;

  const myEntries = plantData.map((datum, i) => {
    const keys = Object.keys(datum);
    if(keys.includes("name")) {
        return <Item key={i} entry={datum} update={updateQuant} />;
    }
    else {
        const myName = keys[0];
        return <Category key={i} name={myName} itemList={datum[myName]} indent={datum["indent"]} update={updateQuant} />;
    }
  });

  function updateQuant(name, quant, cost) {
    let tempQuants;
    tempQuants = {...myQuants};
    if(quant || tempQuants[name] != null) {
      tempQuants[name] = [quant, quant * cost];
      sum = 0;
      for(const key in tempQuants) {
        sum += tempQuants[key][1];
      }
      totalOutput.current.innerText = currencyString(sum);
    }
    setQuants({...tempQuants});
  }

  function summarize(quants) {
    let textSummary = "";
    let htmlSummary = [];

    //prevent empty orders
    if(Object.keys(quants).length === 0) {
      submitButton.current.disabled = true;
      htmlSummary = [
        <h3 key="0">It looks like you're trying to submit an empty order.</h3>,
        <h3 key="01">Please type the number of plants you want into the quantity blanks and try again!</h3>
      ];
    }//require the info blanks to have values
    else if(!(firstNameInput.current.value && lastNameInput.current.value && phoneInput.current.value && emailInput.current.value)){
      submitButton.current.disabled = true;
      htmlSummary = [
        <h3 key="0">It looks like we need more information.</h3>,
        <h3 key="01">Please fill out the info blanks at the top of the page and try again!</h3>
      ];
    }//otherwise, summarize the order
    else {
      submitButton.current.disabled = false;
      htmlSummary = [<h3 key="1">Your Shopping Cart:</h3>];
      for (let datum of plantData) {
        const keys = Object.keys(datum);
        //for items outside of categories
        if(keys.includes("name")) {
          //write this item into summaries if it appears in quants
          if(Object.keys(quants).includes(datum["name"])) {
            updateSummary(`${quants[datum["name"]][0]} ${datum["name"]} - ${currencyString(quants[datum["name"]][1])}`, 0);
          }
        }
        else {
          const catName = keys[0];
          let writeCat = true;
          for (let item of datum[catName]) {
            const itemName = `${catName}: ${item["name"]}`
            //write this item into summaries if it appears in quants
            if(Object.keys(quants).includes(itemName)) {
              //the first time this triggers, write the category heading
              if(writeCat) {
                updateSummary(catName, 0);
                writeCat = false;
              }
              updateSummary(`${quants[itemName][0]} ${item["name"]} - ${currencyString(quants[itemName][1])}`, 1);
            }
          }
        }
      }
      htmlSummary.push(<h3 key="2">Your order total is {currencyString(sum)}.</h3>);
      htmlSummary.push(<h3 key="3">PLACE ORDER?</h3>);
    }

    function updateSummary(myText, indents) {
      //update textSummary to send to EmailJS
      textSummary += "\n";
      for(let i = 0; i < indents; i++) {
        if(i === 0) textSummary += "-";
        textSummary += "\t";
      }
      textSummary += myText;
  
      //update the HTML textSummary to display in the review order modal
      htmlSummary.push(<SummaryItem key={myText} myText={myText} indents={indents} />);
    }

    setSummary({text: textSummary, html: Array.from(htmlSummary)});
  }

  function reviewOrder(e) {
    e.preventDefault();

    //prune zero-quantity items and total up cost
    let tempQuants;
    tempQuants = {...myQuants};
    sum = 0;
    for(const key in tempQuants) {
      sum += tempQuants[key][1];
      if(!tempQuants[key][0]) delete tempQuants[key];
    }
    setQuants({...tempQuants});
    summarize(tempQuants);
    summaryBkg.current.style.visibility = "visible";

  }

  function hideSummary() {
    summaryBkg.current.style.visibility = "hidden";
  }

  function submitOrder(e) {
    e.preventDefault();

    //compute the sum
    sum = 0;
    for(const key in myQuants) {
      sum += myQuants[key][1];
    }

    //create CSV to send to Justina
    let csv = JSON.stringify(myQuants);
    csv = csv.replaceAll("{", "");
    csv = csv.replaceAll("}", "");
    csv = csv.replaceAll(":[", ",");
    csv = csv.replaceAll("],", "\n");
    csv = csv.replaceAll("]", "");
    csv = `${firstNameInput.current.value},${lastNameInput.current.value},${phoneInput.current.value},${emailInput.current.value},${currencyString(sum)}\n` + csv;
    csv = window.btoa(csv);

    //add total line to textSummary
    let textSummary = summaryItems.text;
    textSummary = `${textSummary}\n\nOrder Total: ${currencyString(sum)}`;

    //array to collect the email.js promise returns
    let emailReturns = [];

    //send CSV email and collect returned promise
    emailReturns.push(
      emailjs.send(
        'service_vbj6dhc', 
        'template_cj6ncrr', 
        {from_name: `${firstNameInput.current.value} ${lastNameInput.current.value}`, email_body: `Order Summary: ${textSummary}`, CSV_content: csv}, 
        "1Pwmo3BHx-shOTe4M"
      )
    );

    loadingBox.current.style["display"] = "flex";
    summaryBkg.current.style.visibility = "hidden";
    
    //setting up params for second email
    let templateParams = {
      order_name: `${firstNameInput.current.value} ${lastNameInput.current.value}`,
      email_body: `Order Summary: ${textSummary}`,
      order_email: emailInput.current.value
    };

    //after one second, send the second email and collect the returned promise 
    window.setTimeout(
      () => {
        emailReturns.push(
          emailjs.send(
            'service_vbj6dhc', 
            'template_u3adivs', 
            templateParams, 
            "1Pwmo3BHx-shOTe4M"
          )
        );
      },
    1000);

    Promise.all(emailReturns)
    .then(() => {
      loadingBox.current.style["display"] = "none";
      summaryBkg.current.style.visibility = "visible";
      summaryBox.current.innerHTML = 
      `<div>
      <p>Thanks for your order! It has been submitted.</p>
      <p>This form will now clear itself, but a confirmation email with your order details has been sent to ${emailInput.current.value}.</p>
      <p>If you don't receive this email in the next several minutes, or if you have any questions, call Judy Peck at 248-935-6653 or Justina Misuraca at 248-762-0764.</p>
      <button onClick={window.location.reload()}>Close</button>
      </div>`
      // window.alert(`Thanks for your order! It has been submitted.
      // \nThis form will now clear itself, but a confirmation email with your order details has been sent to ${emailInput.current.value}.
      // \nIf you don't receive this email in the next several minutes, or if you have any questions, call Judy Peck at 248-935-6653 or Justina Misuraca at 248-762-0764`);
      // window.location.reload();
    })
    .catch(() => {
      loadingBox.current.style["display"] = "none";
      window.alert("Sorry, we are unable to process your order online!\n\nPlease call Judy Peck at 248-935-6653 or Justina Misuraca at 248-762-0764");
    });
  }

  function noSubmit(e) {
    if (e.code === "Enter") {
      e.preventDefault();
    }
  }

  function noClear(e) {
    e.preventDefault();
  }

  return (
    <>
      <div id="myForm" onSubmit={noClear} onKeyDown={noSubmit}>
        <div className='contact-row'>
          <input type='text' ref={firstNameInput} placeholder='First Name' required></input>
          <input type='text' ref={lastNameInput} placeholder='Last Name' required></input>
        </div>
        <div className='contact-row'>
          <input type='tel' ref={phoneInput} placeholder='Phone #' required></input>
          <input type='email' ref={emailInput} placeholder='Email' required></input>
        </div>
        <header>
          <h1>2025 County Downs Garden Club Plant Sale</h1>
          <h2>Orders due by <span className='redder'>May 1st</span></h2>
          <h2>Plant order pick up <span className='redder'>May 15th and 16th</span></h2>
          <h2>You will be contacted to choose a pick up time</h2>
          <h2>Location:  Justina's House, 8149 Hendrie, Huntington Woods</h2>
          <h2>Questions:  Call Judy Peck at 248-935-6653 or Justina Misuraca at 248-762-0764</h2>
        </header>
        <main className='main-grid'>
          <h3 className='grid-banner'>PLANT ASSORTMENT</h3>
          <div id='grid-heading-spacer'> </div>
          <h4 className='grid-heading'>Quantity</h4>
          <h4 className='grid-heading'>Cost</h4>
          <h4 className='grid-heading'>Total</h4>
          {myEntries}
          <h2 id='total-spacer'>Thank you for your support!</h2>
        </main>
        <div className='button-group'>
          <hr />
          <button onClick={reviewOrder}>REVIEW YOUR ORDER</button>
          <hr />
          <h2 id='total-label'>Total:</h2>
          <h2 id="total-counter" ref={totalOutput} className='center-text'>$0.00</h2>
          <hr id='final-spacer'/>
        </div>
        <div id="loading-box" ref={loadingBox}>
          <p>Processing! Please wait...</p>
        </div>
      </div>
      <SummaryModal summaryItems={summaryItems} hideSummary={hideSummary} submitOrder={submitOrder} 
      bkgRef={summaryBkg} boxRef={summaryBox} buttonRef={submitButton}/>
    </>
  );
}

export default App;
