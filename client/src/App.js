import './App.css';
import AppLayout from './pages/AppLayout';
import logo from './brand_nudge_logo.jpg';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
