import React from 'react';
import './App.css';

import MugViewer from './components/Mug/Viewer';
import DiaryRenderer from './components/Diary';

function App() {
  return (
    <div className="App">
      <h1>Design a Mug</h1>
      <MugViewer />

      <h1>Design a Notebook</h1>
      <DiaryRenderer />
    </div>
  );
}

export default App;
