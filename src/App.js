import React from 'react';
import './App.css';
import Content from './components/Content/Content';
import Form from './components/Form/Form';
import Chatbot from './components/Chatbot/Chatbot';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>United Digital Academy</h1>
          <p className="header-subtitle">Premium Learning Portal</p>
        </div>
      </header>
      <main>
        <Content />
        <Form />
      </main>
      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; 2025 United Digital Academy. Premium Learning Portal.</p>
        </div>
      </footer>
      <Chatbot />
    </div>
  );
}

export default App;