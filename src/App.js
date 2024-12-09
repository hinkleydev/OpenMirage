import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Block from './components/Block';
import Form from './components/Form';

function App() {
  /**
   * Data should come in the format of an object containing
   * title - a string that shows the basic use of the data
   * metadata - an object of key-values pairs for information like status codes and headers
   * content - an object containing the response content to display to the user
   */
  const [data, setData] = useState([]); // Cards stored here
  function deleteCard(index) {
    const newData = data.filter((item, i) => i !== index);
    setData(newData);
  }

  function focusCard(id, event) {
    event.preventDefault();
    let element = document.getElementById(id);
    console.log(element);
    element.focus();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>OpenMirage</h1>
      </header>
      <div className="content-container">
        <div className="summary-container">
          <div className="summary-cards">
            <ul>
              {/* Create a short list for a summary display */}
              {data.map(function(item, index) {
                return <li key={"sum_" + index} onClick={(event) => focusCard("card_" + index, event) }>{item.title}</li>;
              })}
            </ul>
          </div>
          <Form data={data} setData={setData} />
        </div>
        <div className="cards-container">
          { /* Create a list of cards for the card display */ }
          {data.map(function(item, index) {
            return <Block id={"card_" + index} key={"card_" + index} title={item.title} content={item.content} deleteCard={() => deleteCard(index)}/>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
