import logo from './logo.svg';
import './App.css';
import ParentOne from './components/one/parentOne'
import ParentTwo from './components/two/parentTwo'
import ParentThree from './components/three/parentThree'
import ParentFour from './components/four/ParentFour'
import ParentFive from './components/five/ParentFive'
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <ParentFour/>
    </div>
  );
}

export default App;
