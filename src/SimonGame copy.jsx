import { useState, useEffect } from 'react';

const SimonGame = () => {
  const [level, setLevel] = useState(0);
  const [started, setStarted] = useState(false);
  const [text, setText] = useState("Press A Key to Start");
  const [gamePattern, setGamePattern] = useState([]);
  const [userPattern, setUserPattern] = useState([]);
  const colors = ["green", "red", "yellow", "blue"];

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!started) {
        setStarted(true);
        nextSequence();
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [started]);

  useEffect(() => {
    if (userPattern.length > 0) {
      checkAnswer(userPattern.length - 1);
    }
  }, [userPattern]);

  const nextSequence = () => {
    setUserPattern([]);
    setLevel((prevLevel) => {
      const newLevel = prevLevel + 1;
      setText(`LEVEL ${newLevel}`);
      return newLevel;
    });
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setGamePattern((prevPattern) => [...prevPattern, randomColor]);
    animatePress(randomColor);
  };

  const checkAnswer = (currentLevel) => {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
      if (userPattern.length === gamePattern.length) {
        setTimeout(() => {
          nextSequence();
        }, 1000);
      }
    } else {
      setText("Game Over, Press Any Key to Restart");
      playSound("wrong");
      startOver();
    }
  };

  const startOver = () => {
    setLevel(0);
    setGamePattern([]);
    setStarted(false);
  };

  const handleButtonClick = (color) => {
    setUserPattern((prevPattern) => [...prevPattern, color]);
    animatePress(color);
    playSound(color);
  };

  const animatePress = (color) => {
    const button = document.getElementById(color);
    button.classList.add("pressed");
    setTimeout(() => {
      button.classList.remove("pressed");
    }, 100);
  };

  const playSound = (name) => {
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
  };

  return (
    <>
      <h1 id="level-title">{text}</h1>
      <div className="container">
        <div className="row">
          <div type="button" id="green" className="btn green" onClick={() => handleButtonClick("green")}></div>
          <div type="button" id="red" className="btn red" onClick={() => handleButtonClick("red")}></div>
        </div>

        <div className="row">
          <div type="button" id="yellow" className="btn yellow" onClick={() => handleButtonClick("yellow")}></div>
          <div type="button" id="blue" className="btn blue" onClick={() => handleButtonClick("blue")}></div>
        </div>
      </div>
    </>
  );
};

export default SimonGame;
