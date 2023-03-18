import './App.css';
import Category from './components/Category';
import { plantData } from './data/plants';

function App() {
  const myCats = Object.keys(plantData).map((key, i) => <Category key={i} name={key} itemList={plantData[key]}/>);

  return (
    <form>
      {/* TODO: name blanks */}
      {/* TODO: contact info blanks */}
      {/* TODO: Format Header */}
      <header>
        <h1>2023 County Downs Garden Club Plant Sale</h1>
        <h2>Orders are due by May 2nd</h2>
        <h2>Plant order pick up will be May 19th and 20th. You will be contacted to choose a pick up time</h2>
        <h2>Location:  Justina's House, 8149 Hendrie, Huntington Woods</h2>
        <h2>Questions:  Call Judy Peck at 248-935-6653 or Justina Misuraca at 248-762-0764</h2>
      </header>
      <div>
        <p>PLANT ASSORTMENT</p>
      </div>
      <div>
        <p>Quantity</p>
        <p>Cost</p>
        <p>Total</p>
      </div>
      {myCats}
    </form>
  );
}

export default App;
