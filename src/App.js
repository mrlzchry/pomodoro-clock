import './App.css';
import React, { useState,useEffect } from 'react';
 
function App() {

  //the useState hooks
  const [time, setTime] = useState(25*60);
  const [breakTime, setBreakTime] = useState(5*60);
  const [sessionTime, setSessionTime] = useState(25*60);
  // const [time, setTime] = useState(5);
  // const [breakTime, setBreakTime] = useState(3);
  // const [sessionTime, setSessionTime] = useState(5);
  const [startTimer, setStartTimer] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [title, setTitle] = useState("Session");

  //function for changing the time for the session and break
  const changeTime = (amount, type) => {
    if (type === "break") {
      if ((breakTime <= 60 && amount < 0) || (breakTime >= 60*60 && amount > 0)) {
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


  // function to start the timer
  const onTimer = () => {
    
    if (!startTimer) {
      let interval = setInterval(() => {
        return (setTime((prevTime) => 
        { 
        // console.log(breakCount);
        console.log(prevTime-1);
        // console.log(onBreak);
        return prevTime - 1;
        }))
      },1000);
      localStorage.clear();
      localStorage.setItem("intervalId", interval);
      
    }
    if (startTimer) {
          clearInterval(localStorage.getItem("intervalId"));
        }

    setStartTimer(!startTimer);
    
  };

  //function to reset the time
  const reset = () => {
    setStartTimer(false);
    setOnBreak(false);
    setSessionTime(25*60);
    setBreakTime(5*60);
    setTitle("Session");
    clearInterval(localStorage.getItem("intervalId"));
    localStorage.clear();
    var audio = document.getElementById("beep");
    audio.currentTime = 0;
    audio.pause();
    return (
      setTime(25*60)
    );
  }

  //function to change the format of time
  const timeFormat = (time) => {
    let minute = Math.floor(time / 60);
    let second = (time % 60);
    if (time < 0) {
      return "00:00"
    }

    return (
      (minute < 10 ? '0' + minute : (second === -1 ? "00" : minute)) + ':' +
      (second < 10 ? '0' + second : (second === -1 ? "00" : second))
      );
    
  }

  //function for format the session and break time
  const sessionFormat = (time) => {
    let minute = Math.floor(time / 60);
    // let second = time % 60;
    return (
      minute
    );
  }
  
    //useEffect to change session to break vice versa
  useEffect(() => {
      
    if (time === -1 && !onBreak) {
      setOnBreak(true);
      setTime(breakTime);
      setTitle("Break");      
    }
  
    else if (time === -1 && onBreak) {
      setOnBreak(false);
      setTime(sessionTime);
      setTitle("Session");
    }

    else if (time === 0) {
      var audio = document.getElementById("beep");
      audio.currentTime = 0;
      audio.play();
    }
          
          
        
    })
 
  return (
    
    //the structure for the main page
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className="header">
        <div className="length">
          <Length title={"Break Length"} changeTime={changeTime} type={"break"} time={breakTime} timeFormat={sessionFormat} label={"break-label"} decrement={"break-decrement"} increment={"break-increment"} length={"break-length"}/>
        </div>
        <div className="length">
          <Length title={"Session Length"} changeTime={changeTime} type={"session"} time={sessionTime} timeFormat={sessionFormat} label={"session-label"} decrement={"session-decrement"} increment={"session-increment"} length={"session-length"}/>
        </div>
      </div>
        <div className="session-box">
          <h2 className='session' id="timer-label">{title}</h2>
          <h1 className='time' id="time-left">{timeFormat(time)}</h1>
          <button className="btn-large teal lighten-2" id="start_stop" onClick = {onTimer}>
          {startTimer ? (<i className="large material-icons">pause_circle_outline</i>) : (<i className="large material-icons">play_circle_outline</i>) }
          </button>
          <button className="btn-large teal lighten-2" id="reset" onClick={reset}>
          <i className="large material-icons">replay</i>
          </button>
          <audio id="beep" src ='https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg'></audio>
        </div>
        <h6>Designed and coded by</h6>
        <h6>Ammarul Anandzachery</h6>
        <h7><a href="https://github.com/mrlzchry/pomodoro-clock/tree/main/src">Source Code</a></h7>
    </div>
  );
}

// component for the break length and session length
const Length = ({title, changeTime, type, time, timeFormat,label,decrement,increment,length}) => {
  return (
    <div>
      <h3 id={label}>{title}</h3>
      <div className="time-sets">
        <h4 className="break-time" id={length}>{timeFormat(time)}</h4>
        <button className="btn-floating btn-small teal lighten-2 waves-effect waves-light" id={decrement} onClick={() => changeTime(-60, type)}>
          <i className=" material-icons teal lighten-2">arrow_drop_down</i>
        </button>
        <button className="btn-floating btn-small waves-effect waves-light teal lighten-2 " id={increment} onClick={() => changeTime(60, type)}>
          <i className=" material-icons teal lighten-2">arrow_drop_up</i>
        </button>
      </div>
    </div>
  )
}

export default App;
