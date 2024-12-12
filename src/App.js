import { useEffect, useState } from 'react';
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
  const [collapsed, setCollapsed] = useState(false); // Summary collapsed state
  const [summaryWidth, setSummaryWidth] = useState(20); // Summary width
  const [cardsWidth, setCardsWidth] = useState(80); // Cards width
  const [printMode, setPrintMode] = useState(false); // Print mode for the cards

  useEffect(() => {
    if (collapsed) {
      setSummaryWidth(0);
      setCardsWidth(100);
    } else {
      setSummaryWidth(20);
      setCardsWidth(80);
    }
  }, [collapsed]);

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

  function printContext(context) {
    const keys = Object.keys(context);
    return keys.map(function(key) {
      return <div>{key}: {context[key]}</div>;
    });
  }

  if(printMode) {
    return (<div className="print-container">
      <h1>OpenMirage report</h1>
      <button className="print" onClick={() => setPrintMode(false)}>Close</button>
      <button className="print" onClick={() => window.print()}>Print</button>
      {data.map(function(item, index) {
            return (<>
                <h2>{item.title} {item.error == true ? "- Error" : null}</h2>
                <h3>Context</h3>
                <div>{printContext(item.context)}</div>
                <h3>Content</h3>
                <div>{item.content}</div>
              </>);
      })}
    </div>)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{margin: 0}} >OpenMirage</h1>
        <button className="toggle-summary" onClick={() => setCollapsed(!collapsed)}>Toggle Summary</button>
        <button className="print" onClick={() => setPrintMode(true)}>Print</button>
      </header>
      <div className="content-container">
        <div className="summary-container" style={{width: summaryWidth  + "%"}}>
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
        <div className="cards-container" style={{width: cardsWidth  + "%"}}>
          { /* Create a list of cards for the card display */ }
          {data.map(function(item, index) {
            return <Block id={"card_" + index} key={"card_" + index} title={item.title} content={item.content} context={item.context} deleteCard={() => deleteCard(index)} error={item.error}/>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
