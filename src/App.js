import './App.css';
import React, { useState } from 'react';

function App() {
  const [time, setTime] = useState( 25 * 60);

  const formatTime = (time) => {
    let minute = Math.floor(time / 60);
    let second = time % 60;
    return (
      (minute < 10 ? '0' + minute : minute) + ':' +
      (second < 10 ? '0' + second : second)
      );
    
  }
  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <h2>Session</h2>
      <h1 class='time'>{formatTime(time)}</h1>
    </div>
  );
}

export default App;
