import React from 'react';
import './App.css';

import MugItem from './components/Mug';
import DiaryRenderer from './components/Diary';

function App() {
  return (
    <div className="App">
      <h1>Design a Mug</h1>
      <MugItem />

      <h1>Design a Notebook</h1>
      <DiaryRenderer />
    </div>
  );
}

export default App;
