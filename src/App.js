import './App.css';
import React, { useState } from 'react';
import Category from './components/Category';
import Item from './components/Item';
import SummaryItem from './components/SummaryItem';
import SummaryModal from './components/SummaryModal';
import { currencyString } from './util';
import { plantData } from './data/plants';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

function App() {

  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const phoneInput = useRef(null);
  const emailInput = useRef(null);
  const totalOutput = useRef(null);
  // const loadingBox = useRef(null);
  const summaryBkg = useRef(null);
  const summaryBox = useRef(null);
  const submitButton = useRef(null);

  // const [summaryItems, setSummaryItems] = useState([]);

  let summary = "";
  let sum = 0;
  let summaryItems = [];

  const myQuants = {};

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
    if(quant || myQuants[name] != null) {
      myQuants[name] = [quant, quant * cost];
      sum = 0;
      for(const key in myQuants) {
        sum += myQuants[key][1];
      }
      totalOutput.current.innerText = currencyString(sum);
    }
  }

  function summarize() {
    summary = "";
    let newSummaryItems = []; //TODO: consider eliminating in favor of summaryItems

    //prevent empty orders
    if(Object.keys(myQuants).length === 0) {
      submitButton.current.disabled = true;
      newSummaryItems = [
        <h3 key="0">It looks like you're trying to submit an empty order.</h3>,
        <h3 key="01">Please type the number of plants you want into the quantity blanks and try again!</h3>
      ];
    }//otherwise, summarize the order
    else {
      submitButton.current.disabled = false;
      newSummaryItems = [<h3 key="1">Your Shopping Cart:</h3>];
      for (let datum of plantData) {
        const keys = Object.keys(datum);
        //for items outside of categories
        if(keys.includes("name")) {
          //write this item into summary if it appears in quants
          if(Object.keys(myQuants).includes(datum["name"])) {
            updateSummary(`${myQuants[datum["name"]][0]} ${datum["name"]} - ${currencyString(myQuants[datum["name"]][1])}`, 1);
          }
        }
        else {
          const catName = keys[0];
          let writeCat = true;
          for (let item of datum[catName]) {
            const itemName = `${catName}: ${item["name"]}`
            //write this item into summary if it appears in quants
            if(Object.keys(myQuants).includes(itemName)) {
              //the first time this triggers, write the category heading
              if(writeCat) {
                updateSummary(catName, 1);
                writeCat = false;
              }
              updateSummary(`${myQuants[itemName][0]} ${item["name"]} - ${currencyString(myQuants[itemName][1])}`, 2);
            }
          }
        }
      }
      newSummaryItems.push(<h3 key="2">Your order total is {currencyString(sum)}.</h3>);
      newSummaryItems.push(<h3 key="3">PLACE ORDER?</h3>);
    }

    function updateSummary(myText, indents) {
      //update the textual summary to send to EmailJS
      summary += "\n";
      for(let i = 0; i < indents; i++) {
        if(i === 0) summary += "-";
        summary += "\t";
      }
      summary += myText;
  
      //update the HTML summary to display in the review order modal
      newSummaryItems.push(<SummaryItem key={myText} myText={myText} indents={indents} />);
    }

    summaryItems = newSummaryItems;
  }

  function reviewOrder(e) {
    e.preventDefault();

    //prune zero-quantity items and total up cost
    sum = 0;
    for(const key in myQuants) {
      sum += myQuants[key][1];
      if(!myQuants[key][0]) delete myQuants[key];
    }

    summarize();
    summaryBkg.current.style.visibility = "visible";

  }

  function hideSummary() {
    summaryBkg.current.style.visibility = "collapse";
  }

  function submitOrder(e) {
    e.preventDefault();

    //create CSV to send to Justina
    let csv = JSON.stringify(myQuants);
    csv = csv.replaceAll("{", "");
    csv = csv.replaceAll("}", "");
    csv = csv.replaceAll(":[", ",");
    csv = csv.replaceAll("],", "\n");
    csv = csv.replaceAll("]", "");
    csv = `${firstNameInput.current.value},${lastNameInput.current.value},${phoneInput.current.value},${emailInput.current.value},${currencyString(sum)}\n` + csv;
    csv = window.btoa(csv);

    //add total line to summary
    summary = `${summary}\n\nOrder Total: ${currencyString(sum)}`;

    //array to collect the email.js promise returns
    let emailReturns = [];

    //send CSV email and collect returned promise
    emailReturns.push(
      emailjs.send(
        'service_vbj6dhc', 
        'template_cj6ncrr', 
        {from_name: `${firstNameInput.current.value} ${lastNameInput.current.value}`, email_body: `Order Summary: ${summary}`, CSV_content: csv}, 
        "1Pwmo3BHx-shOTe4M"
      )
    );

    // loadingBox.current.style["display"] = "flex";
    
    //setting up params for second email
    let templateParams = {
      order_name: `${firstNameInput.current.value} ${lastNameInput.current.value}`,
      email_body: `Order Summary: ${summary}`,
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
      summaryItems = [<h3 key="1">Your Shopping Cart:</h3>];
      // loadingBox.current.style["display"] = "none";
      // summaryBox.current.innerHTML = 
      // <div>
      //   <p>{`Thanks for your order! It has been submitted.
      //   \nThis form will now clear itself, but a confirmation email with your order details has been sent to ${emailInput.current.value}.
      //   \nIf you don't receive this email in the next several minutes, or if you have any questions, call Judy Peck at 248-935-6653 or Justina Misuraca at 248-762-0764`}</p>
      //   {/* <button onClick={window.location.reload()}>Close</button> */}
      // </div>
      // window.alert(`Thanks for your order! It has been submitted.
      // \nThis form will now clear itself, but a confirmation email with your order details has been sent to ${emailInput.current.value}.
      // \nIf you don't receive this email in the next several minutes, or if you have any questions, call Judy Peck at 248-935-6653 or Justina Misuraca at 248-762-0764`);
      // window.location.reload();
    })
    .catch(() => {
      // loadingBox.current.style["display"] = "none";
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
          <h1>2024 County Downs Garden Club Plant Sale</h1>
          <h2>Orders are due by <span className='redder'>May 1st.</span></h2>
          <h2>Plant order pick up will be <span className='redder'>May 16th and 17th.</span></h2>
          <h2>You will be contacted to choose a pick up time.</h2>
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
        {/* <div id="loading-box" ref={loadingBox}>
          <p>Processing! Please wait...</p>
        </div> */}
      </div>
      {/* <SummaryModal summaryItems={summaryItems} hideSummary={hideSummary} submitOrder={submitOrder} /> */}
      <div id='summary-background' ref={summaryBkg}>
        <div id='summary-box' ref={summaryBox}>
          {summaryItems}
          <div id='summary-buttons'>
            <button onClick={hideSummary} className='summary-button'>CONTINUE SHOPPING</button>
            <button ref={submitButton} onClick={submitOrder} className='summary-button' >SUBMIT</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
