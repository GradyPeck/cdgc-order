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
      const totalCounter = document.getElementById("totalCounter");
      totalCounter.innerText = currencyString(sum);
    }
  }

  return (
    <form id="myForm">
      <div className='formRow'>
        <input type='text' placeholder='Last Name'></input>
        <input type='text' placeholder='First Name'></input>
      </div>
      <div className='formRow'>
        <input type='tel' placeholder='Phone #'></input>
        <input type='email' placeholder='Email'></input>
      </div>
      <header>
        <h1>2023 County Downs Garden Club Plant Sale</h1>
        <h2>Orders are due by May 2nd</h2>
        <h2>Plant order pick up will be May 19th and 20th. You will be contacted to choose a pick up time</h2>
        <h2>Location:  Justina's House, 8149 Hendrie, Huntington Woods</h2>
        <h2>Questions:  Call Judy Peck at 248-935-6653 or Justina Misuraca at 248-762-0764</h2>
      </header>
      <main className='main-grid'>
        <h3 className='grid-banner'>PLANT ASSORTMENT</h3>
        <div className='grid-heading'></div>
        <div className='grid-heading'></div>
        <h4 className='grid-heading'>Quantity</h4>
        <h4 className='grid-heading'>Cost</h4>
        <h4 className='grid-heading'>Total</h4>
        {myEntries}
      </main>
      <h2 id="totalCounter">0</h2>
    </form>
  );
}

export default App;
