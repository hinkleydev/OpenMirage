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
  const [data, setData] = useState([ {
    id: 1,
    title: "This is a piece of data",
    metadata: { "status" : 200 },
    content: {"response_time" : "33ms"}
  } ]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>OpenMirage</h1>
      </header>
      <div>
        {data.map(function(item) {
          return <Block id={item.key} title={item.title} metadata={item.metadata} content={item.content} />
        })}
      </div>
    </div>
  );
}

export default App;
