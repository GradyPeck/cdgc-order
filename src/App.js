import './App.css';
import Category from './components/Category';
import Item from './components/Item';
import { currencyString } from './util';
import { plantData } from './data/plants';

function App() {

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
      myQuants[name] = [quant * cost, quant];
      console.log(myQuants);
      let sum = 0;
      for(const key in myQuants) {
        console.log(key, " : ", myQuants[key][0]);
        sum += myQuants[key][0];
      }
      console.log("TOTAL: ", sum);
      const totalCounter = document.getElementById("total-counter");
      totalCounter.innerText = currencyString(sum);
    }
  }

  function finalizeQuant(e) {
    e.preventDefault();
    let sum = 0;
    for(const key in myQuants) {
      sum += myQuants[key][0];
      if(!myQuants[key][1]) delete myQuants[key];
    }
    console.log("MYQUANTS: ", myQuants);
    console.log(JSON.stringify(myQuants));
    window.confirm(`Your order total is ${currencyString(sum)}. Confirm order?`);
  }

  return (
    <form id="myForm" onSubmit={finalizeQuant}>
      <div className='contact-row'>
        <input type='text' placeholder='Last Name' required></input>
        <input type='text' placeholder='First Name' required></input>
      </div>
      <div className='contact-row'>
        <input type='tel' placeholder='Phone #' required></input>
        <input type='email' placeholder='Email' required></input>
      </div>
      <header>
        <h1>2023 County Downs Garden Club Plant Sale</h1>
        <h2>Orders are due by May 2nd</h2>
        <h2>Plant order pick up will be May 19th and 20th. You will be contacted to choose a pick up time.</h2>
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
        <h2 id="total-counter">$0.00</h2>
      </main>
      <button>Place Order</button>
    </form>
  );
}

export default App;
