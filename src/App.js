import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Block from './components/Block';

function App() {
  /**
   * Data should come in the format of an object containing
   * title - a string that shows the basic use of the data
   * metadata - an object of key-values pairs for information like status codes and headers
   * content - an object containing the response content to display to the user
   */
  const [data, setData] = useState([
    {title: "Request #1", result: "Request successful!"},
    {title: "Request #2", result: "Request worked! This is lots more information to make the text wrap around oh look a bird"}
  ]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>OpenMirage</h1>
      </header>
      <div className="content-container">
        <div className="summary-container">
          <ul>
            {data.map(function(item) {
              return <li key={item.key}>{item.title}</li>;
            })}
          </ul>
        </div>
        <div className="cards-container">
          {data.map(function(item) {
            return <Block key={item.key} title={item.title} content={item.result}/>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
