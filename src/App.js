import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Level from './components/Level';
import Footer from './components/Footer';
import levelOne from './images/level-one.jpg';
import levelTwo from './images/level-two.jpg';
import levelThree from './images/level-three.jpg';
import levelFour from './images/level-four.jpg';
import waldoIcon from './images/waldo.png';

function App() {
  const [images, setImage] = useState([]);
  const [view, setView] = useState('home');
  const [characters, setCharacters] = useState([]);
  const [clock, setClock] = useState({min: '00', sec: '00'});

  const navigate = useNavigate();

  useEffect(() => {
      const allImages = [
        {
          name: 'level one',
          url: levelOne,
          path: '/level-one'
        },
        {
          name: 'level two',
          url: levelTwo,
          path: '/level-two'
        },
        {
          name: 'level three',
          url: levelThree,
          path: '/level-three'
        },
        {
          name: 'level four',
          url: levelFour,
          path: '/level-four'
        },
      ]

      const waldo = [{
        name: 'waldo',
        url: waldoIcon,
        id: 0
      }]

      setImage(allImages);
      setCharacters(waldo);
      resetTimer();
  }, []);

  const startGame = (e) => {
    const name = e.target.name;
    setView(name);
    setTimer();
  }
  
  const navigateHome = () => {
    navigate('/');
    setView('home');
  }

  const getCoordinates = (e) => {
    const clickX = e.clientX;
    const clickY = e.clientY;

    console.log(clickX);
    console.log(clickY);
  }

  let timerInterval;
  let second;
  let minute;

  const setTimer = () => {
    second = 0;
    minute = 0;
    timerInterval = setInterval(() => {
      let m = minute < 10 ? "0" + minute : minute;
      let s = second < 10 ? "0" + second : second;
      setClock({sec: s, min: m});
      second++;
      if (second === 60) {
        second = 0;
        minute++;
      }
    }, 1000)
  }

  const resetTimer = () => {
    clearInterval(setTimer);
    second = 0;
    minute = 0;
    // setClock({sec: '00', min: '00'});
  }

  return (
    <div className="App">
      <Header handleClick={navigateHome} />

      {(() => {
        switch (view) {
          case 'home':
            return <Home images={images}  handleClick={startGame} />
          case 'level one':
            return <Level image={images[0]} characters={characters} clock={clock} setClock={setClock} handleClick={getCoordinates} />
          case 'level two':
            return <Level image={images[1]} characters={characters} clock={clock} setClock={setClock} handleClick={getCoordinates} />
          case 'level three':
            return <Level image={images[2]} characters={characters} clock={clock} setClock={setClock} handleClick={getCoordinates} />
          case 'level four':
            return <Level image={images[3]} characters={characters} clock={clock} setClock={setClock} handleClick={getCoordinates} />
        }
      })()}

      {/* <Routes>
        <Route path='/'>
          <Home images={images}  handleClick={startGame} />
        </Route>
        <Route path='/level'>
          <Level />
        </Route>
      </Routes>*/}

      <Footer /> 
    </div>
  );
}

export default App;
