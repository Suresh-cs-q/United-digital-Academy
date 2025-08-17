import React, { useState } from 'react';
import './Form.css';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formUrl = 'https://docs.google.com/forms/u/1/d/e/1FAIpQLScVS1Xi_97Jl3T-QNhc5HYpsq0e3zIv5q77bSgoQizP83uN_Q/formResponse';
    const formData = new FormData();
    formData.append('entry.1495439277', name);
    formData.append('entry.300411990', email);

    fetch(formUrl, {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
    }).then(() => {
      setName('');
      setEmail('');
      setSubmitted(true);
    }).catch((error) => {
      console.error('Error submitting form:', error);
    });
  };

  return (
    <>
      {submitted && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Submission Received</h3>
            <p>Thank you for your interest. We will get back to you with your login details in 24 hours once we verify that you have signed up with our referral key.</p>
            <button onClick={() => setSubmitted(false)}>Close</button>
          </div>
        </div>
      )}
      <div className="instructions-container">
        <h3>Before You Begin</h3>
        <p className="instructions-intro">
          Before filling out the "Join the Academy" form, please make sure you sign up with our trading partner, Daman Markets, using our referral link.
        </p>
        <div className="steps-container">
          <h4>To receive free access to our courses:</h4>
          <ol className="steps-list">
            <li>Sign up on Daman Markets with our referral key.</li>
            <li>Make the minimum deposit required.</li>
            <li>Return to this website and complete the form using the same name and email address you used for your Daman Markets account.</li>
            <li>Your course access will be activated within 24 hours.</li>
          </ol>
        </div>
        <div className="links-container">
          <a 
            href="https://portal.damanmarkets.com/links/go/793" 
            target="_blank" 
            rel="noopener noreferrer"
            className="referral-link"
          >
            <span className="link-icon">🚀</span>
            Sign Up with Daman Markets (Referral Link)
          </a>
          <a 
            href="https://www.u-d.academy/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="website-link"
          >
            <span className="link-icon">🌐</span>
            Visit Our Main Website
          </a>
        </div>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Join the Academy</h2>
          <p>Fill out the form below to get started.</p>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="entry.1495439277"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., John Doe"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="entry.300411990"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., you@example.com"
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Form;
