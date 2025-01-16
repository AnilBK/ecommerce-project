import React from 'react';
import './App.css';

import MugItem from './components/Mug';
import DiaryRenderer from './components/Diary';
import Calendar from './components/Calendar';
import AddCustomProduct from './components/AdminSystem';

function App() {
  return (
    <div className="App">
      <h1>Design a Mug</h1>
      <MugItem />

      <h1>Design a Notebook</h1>
      <DiaryRenderer />

      <h1>Design a Calendar</h1>
      <Calendar />

      <h1>Admin System</h1>
      <AddCustomProduct />
      
      <br></br>
    </div>
  );
}

export default App;
