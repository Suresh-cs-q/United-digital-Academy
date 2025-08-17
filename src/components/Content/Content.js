import React from 'react';
import './Content.css';
import content from './content.json';

const Content = () => {
  return (
    <section className="content-section">
      <h1>{content.title}</h1>
      <p>{content.paragraph}</p>
    </section>
  );
};

export default Content;
