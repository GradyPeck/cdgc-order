import './App.css';
import React from 'react';
import Category from './components/Category';
import Item from './components/Item';
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
      let sum = 0;
      for(const key in myQuants) {
        sum += myQuants[key][1];
      }
      totalOutput.current.innerText = currencyString(sum);
    }
  }

  function submitOrder(e) {
    e.preventDefault();

    //prune zero-quantity items and total up cost
    let sum = 0;
    let summary = "Your Shopping Cart:";
    for(const key in myQuants) {
      sum += myQuants[key][1];
      if(!myQuants[key][0]) delete myQuants[key];
      else summary += `\n    ${myQuants[key][0]} ${key} - ${currencyString(myQuants[key][1])}`;
    }

    //prevent empty orders
    if(Object.keys(myQuants).length === 0) {
      alert("It looks like you're trying to submit an empty order. Please type the number of plants you want into the quantity blanks and try again!");
      return;
    }

    //show order summary and prompt for confirmation
    if(window.confirm(`${summary}\n\nYour order total is ${currencyString(sum)}. \nPLACE ORDER?`)) {

      //create CSV to send to Justina
      let csv = JSON.stringify(myQuants);
      csv = csv.replaceAll("{", "");
      csv = csv.replaceAll("}", "");
      csv = csv.replaceAll(":[", ",");
      csv = csv.replaceAll("],", "\n");
      csv = csv.replaceAll("]", "");
      csv = `${firstNameInput.current.value},${lastNameInput.current.value},${phoneInput.current.value},${emailInput.current.value}\n` + csv;
      csv = window.btoa(csv);

      //add total line to summary
      summary = `${summary}\n\nOrder Total: ${currencyString(sum)}`;

      //array to collect the email.js promise returns
      let emailReturns = [];

      //send CSV email and collect returned promise
      emailReturns.push(
        emailjs.send(
          'service_uovy849', 
          'template_cj6ncrr', 
          {from_name: `${firstNameInput.current.value} ${lastNameInput.current.value}`, email_body: summary, CSV_content: csv}, 
          "9HHIR7RW6edIq2hG-"
        )
      );
      
      //setting up params for second email
      let templateParams = {
        order_name: `${firstNameInput.current.value} ${lastNameInput.current.value}`,
        email_body: summary,
        order_email: emailInput.current.value
      };

      //after one second, send the second email and collect the returned promise 
      window.setTimeout(
        () => {emailReturns.push(
          emailjs.send(
            'service_uovy849', 
            'template_u3adivs', 
            templateParams, 
            "9HHIR7RW6edIq2hG-"
          )
        )},
      1000);

      Promise.all(emailReturns)
      .then(() => {window.alert(`Thanks for your order! It has been submitted.
        \nThis form will now clear itself, but a confirmation email with your order details has been sent to ${emailInput.current.value}.
        \nIf you don't receive this email in the next several minutes, or if you have any questions, call Judy Peck at 248-935-6653 or Justina Misuraca at 248-762-0764`);
        window.location.reload();})
      .catch(() => {window.alert("Sorry, we are unable to process your order online!\n\nPlease call Judy Peck at 248-935-6653 or Justina Misuraca at 248-762-0764")});
    }
  }

  function noSubmit(e) {
    if (e.code === "Enter") {
      e.preventDefault();
    }
  }

  return (
    <form id="myForm" onSubmit={submitOrder} onKeyDown={noSubmit}>
      <div className='contact-row'>
        <input type='text' ref={firstNameInput} placeholder='First Name' required></input>
        <input type='text' ref={lastNameInput} placeholder='Last Name' required></input>
      </div>
      <div className='contact-row'>
        <input type='tel' ref={phoneInput} placeholder='Phone #' required></input>
        <input type='email' ref={emailInput} placeholder='Email' required></input>
      </div>
      <header>
        <h1>2023 County Downs Garden Club Plant Sale</h1>
        <h2>Orders are due by <span className='redder'>May 1st.</span></h2>
        <h2>Plant order pick up will be <span className='redder'>May 18th and 19th.</span></h2>
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
        <button>REVIEW YOUR ORDER</button>
        <hr />
        <h2 id='total-label'>Total:</h2>
        <h2 id="total-counter" ref={totalOutput} className='center-text'>$0.00</h2>
        <hr id='final-spacer'/>
      </div>
    </form>
  );
}

export default App;
