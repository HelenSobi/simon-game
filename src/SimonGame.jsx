import { useState, useEffect } from 'react';

const SimonGame = () => {
  const [level, setLevel] = useState(0);
  const [started, setStarted] = useState(false);
  const [text, setText] = useState("Press A Key or Tap to Start");
  const [gamePattern, setGamePattern]=useState([]);
  const [userPattern, setUserPattern]=useState([])
  const colors=["green","red","yellow","blue"];

  useEffect(()=>{
    const handleStart = ()=>{
      if(!started){
        setStarted(true);
        nextSequence();
      }
    }
    window.addEventListener("keydown", handleStart);
    window.addEventListener("touchstart", handleStart); // For mobile devices

    return () => {
      window.removeEventListener("keydown", handleStart);
      window.removeEventListener("touchstart", handleStart);
    };
  }, [started, level]);

  useEffect(()=>{
    if(userPattern.length>0){
      checkAnswer(userPattern.length-1);
    }

  },[userPattern])

  const nextSequence=()=>{
    setUserPattern([]);
    setLevel((prevLevel) => {
      const newLevel = prevLevel + 1;
      setText(`LEVEL ${newLevel}`);
      return newLevel;
    });
    const randomColor=colors[Math.floor(Math.random()*colors.length)];
    setGamePattern((prevPattern)=>{
      return [...prevPattern,randomColor];
    })
    addClass(randomColor);
  }
  const checkAnswer =(userlevel)=>{
    if(gamePattern[userlevel] === userPattern[userlevel]){
      if(gamePattern.length === userPattern.length){
        setTimeout(()=>{
          nextSequence();
        },1000)
      }
    }
      else{
        setText(`Game Over, Press Any Key or Tap to Restart`);
        addClassGameover("game-over");
        playSound("wrong");
        startOver();
      }
  }
  const startOver=()=>{
    setGamePattern([]);
    setUserPattern([]);
    setLevel(0);
    setStarted(false);
  }
  const handleButtonClick = (currPattern) =>{
    addClass(currPattern);
    playSound(currPattern);
    setUserPattern((prevPattern)=>{
      return [...prevPattern,currPattern];
    })
    
  }
  const addClass = (color) =>{
    document.getElementById(color).classList.add("pressed");
    playSound(color);
    setTimeout(()=>{
      document.getElementById(color).classList.remove("pressed");
    },100)
  }
  const playSound = (color) =>{
    const audio=new Audio(`./sounds/${color}.mp3`);
    audio.play();
  }
  const addClassGameover = (over) =>{
    document.body.classList.add(over);
    playSound(over);
    setTimeout(()=>{
      document.body.classList.remove(over);
    },100)
  }
  return (
    <>
    <section>
    <div>
      <h1 id="level-title">{text}</h1>
      <div className="container">
       
          <div type="button" id="green" className="btn green" onClick={() => handleButtonClick("green")}></div>
          <div type="button" id="red" className="btn red" onClick={() => handleButtonClick("red")}></div>
 
          <div type="button" id="yellow" className="btn yellow" onClick={() => handleButtonClick("yellow")}></div>
          <div type="button" id="blue" className="btn blue" onClick={() => handleButtonClick("blue")}></div>
       
      </div>
      </div>
      </section>
    </>
  );
};

export default SimonGame;
