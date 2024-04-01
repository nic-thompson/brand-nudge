import './App.css';
import AppLayout from './pages/AppLayout';
import logo from './brand_nudge_logo.jpg';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Router>
          <AppLayout />
        </Router>
      </header>
    </div>
  );
}

export default App;
