import { useState, useEffect } from 'react';

const SimonGame = () => {
  const [level, setLevel] = useState(1);
  const [started, setStarted] = useState(false);
  const [text, setText] = useState("Press A Key to Start");
  const [gamePattern, setGamePattern]=useState([]);
  const [userPattern, setUserPattern]=useState([])
  const colors=["green","red","yellow","blue"];

  useEffect(()=>{
    const handleKeyPress = ()=>{
      if(!started){
        setText(`Level ${level}`);
        setStarted(true);
        nextSequence();
      }
    }
    window.addEventListener("keydown",handleKeyPress);
    return () =>{
      window.removeEventListener("keydown",handleKeyPress);
    }
  },[started]);

  useEffect(()=>{
    if(userPattern.length>0){
      checkAnswer(userPattern.length-1);
    }

  },[userPattern])

  const nextSequence=()=>{
    setUserPattern([]);
    const randomColor=colors[Math.floor(Math.random()*colors.length)];
    setGamePattern((prevPattern)=>{
      return [...prevPattern,randomColor];
    })
    addClass(randomColor);
  }
  const checkAnswer =(userlevel)=>{
    if(gamePattern[userlevel] === userPattern[userlevel]){
      if(gamePattern.length === userPattern.length){
        setLevel((prevLevel)=>{
          const levelInc=prevLevel+1;
          setText(`Level ${levelInc}`);
          return prevLevel+1;
        })
        setTimeout(()=>{
          nextSequence();
        },1000)
      }
    }
      else{
        setText(`Game Over, Press Any Key to Restart`);
        addClassGameover("game-over");
        playSound("wrong");
        startOver();
      }
  }
  const startOver=()=>{
    setGamePattern([]);
    setUserPattern([]);
    setLevel(0);

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
