import './App.css';
import React from 'react';
import Category from './components/Category';
import Item from './components/Item';
import { currencyString } from './util';
import { plantData } from './data/plants';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

  function finalizeQuant(e) {
    e.preventDefault();
    let sum = 0;
    let summary = "Order Summary:";
    for(const key in myQuants) {
      sum += myQuants[key][1];
      if(!myQuants[key][0]) delete myQuants[key];
      else summary += `\n${myQuants[key][0]} ${key} - ${currencyString(myQuants[key][1])}`;
    }
    
    let csv = JSON.stringify(myQuants);
    csv = csv.replaceAll("{", "");
    csv = csv.replaceAll("}", "");
    csv = csv.replaceAll(":[", ",");
    csv = csv.replaceAll("],", "\n");
    csv = csv.replaceAll("]", "");
    csv = `${firstNameInput.current.value},${lastNameInput.current.value},${phoneInput.current.value},${emailInput.current.value}\n` + csv;
    csv = window.btoa(csv);

    if(window.confirm(`${summary}\n\nYour order total is ${currencyString(sum)}. Confirm order?`)) {

      summary = `${summary}\n\nOrder Total: ${currencyString(sum)}`;

      sendEmail('template_cj6ncrr', {from_name: `${firstNameInput.current.value} ${lastNameInput.current.value}`,CSV_content: csv});
      
      let templateParams = {
        order_name: `${firstNameInput.current.value} ${lastNameInput.current.value}`,
        email_body: summary,
        order_email: emailInput.current.value
      };

      window.setTimeout(sendEmail('template_u3adivs', templateParams), 800);
      window.setTimeout(window.location.assign("/done"), 1500);
    }
  }

  function sendEmail(template, myParams) {
    emailjs.send('service_uovy849', template, myParams, "9HHIR7RW6edIq2hG-")
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (error) => {
        console.log('FAILED...', error);
      });
  }

  return (
            <form id="myForm" onSubmit={finalizeQuant}>
              <div className='contact-row'>
                <input type='text' ref={firstNameInput} placeholder='Last Name' required></input>
                <input type='text' ref={lastNameInput} placeholder='First Name' required></input>
              </div>
              <div className='contact-row'>
                <input type='tel' ref={phoneInput} placeholder='Phone #'required></input>
                <input type='email' ref={emailInput} placeholder='Email' required></input>
              </div>
              <header>
                <h1>2023 County Downs Garden Club Plant Sale</h1>
                <h2>Orders are due by <span className='redder'>May 1st</span></h2>
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
                <h2 id='total-label'>Total:</h2>
                <h2 id="total-counter" ref={totalOutput} className='center-text'>$0.00</h2>
              </main>
              <div className='button-group'>
                <hr />
                <button>PLACE ORDER</button>
                <hr />
              </div>
            </form>
  );
}

export default App;
