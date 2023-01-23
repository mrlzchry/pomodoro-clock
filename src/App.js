import './App.css';
import React, { useState } from 'react';
 

function App() {
  const [time, setTime] = useState( 25 * 60);
  const [breakTime, setBreakTime] = useState( 5* 60);
  const [sessionTime, setSessionTime] = useState( 25 * 60);
  const [startTimer, setStartTimer] = useState(false);
  const [onBreak, setOnBreak] = useState(false);

  const changeTime = (amount, type) => {
    if (type === "break") {
      if ((breakTime <= 60 && amount < 0) || (breakTime >= 20*60 && amount > 0)) {
        return;
      }
      setBreakTime((prevTime) => prevTime + amount);
    }
    if (type === "session") {
      if ((sessionTime <=60 && amount < 0) || (sessionTime >= 60*60 && amount > 0)) {
        return;
      }
      setSessionTime((prevTime) => prevTime + amount);
      if (!startTimer) {
        setTime(sessionTime + amount);
      }
    }
  };

  const play = () => {
    let second = 1000; //1000 ms instead of 1 second
    let date = new Date().getTime();
    let newDate = new Date().getTime() + second;
    let onBreakVar = onBreak;
    if (!startTimer) {
      let interval = setInterval(()=>{
        date = new Date().getTime();
        if(date > newDate) {
          setTime((prevTime) => {
            return prevTime - 1;
          });
          newDate += second;
        }
      },30);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }
    
    if (startTimer) {
      clearInterval(localStorage.getItem("interval-id"));
    }

    setStartTimer(!startTimer);
  }

  const reset = () => {
    return (
      setTime(sessionTime)
    );
  }

  const timeFormat = (time) => {
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
      <div className="header">
        <div className="length">
          <Length title={"Break Length"} changeTime={changeTime} type={"break"} time={breakTime} timeFormat={timeFormat}/>
        </div>
        <div className="length">
          <Length title={"Session Length"} changeTime={changeTime} type={"session"} time={sessionTime} timeFormat={timeFormat}/>
        </div>
      </div>
        <div className="session-box">
          <h2 className='session'>Session</h2>
          <h1 class='time'>{timeFormat(time)}</h1>
          <button className="btn-large teal lighten-2" onClick = {play}>
          {startTimer ? (<i className="large material-icons">pause_circle_outline</i>) : (<i className="large material-icons">play_circle_outline</i>) }
          </button>
          <button className="btn-large teal lighten-2" onClick={reset}>
          <i className="large material-icons">replay</i>
          </button>
        </div>
    </div>
  );
}


const Length = ({title, changeTime, type, time, timeFormat}) => {
  return (
    <div>
      <h3>{title}</h3>
      <div className="time-sets">
        <h4 className="break-time">{timeFormat(time)}</h4>
        <button className="btn-small teal lighten-2" onClick={() => changeTime(-60, type)}>
          <i class=" material-icons teal lighten-2">remove_circle</i>
        </button>
        <button className="btn-small teal lighten-2" onClick={() => changeTime(60, type)}>
          <i class=" material-icons teal lighten-2">add_circle</i>
        </button>
      </div>
    </div>
  )
}

export default App;
