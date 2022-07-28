import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import './toggleSwitch.css';
import Header from './components/Header';
import Home from './components/Home';
import Level from './components/Level';
import Footer from './components/Footer';
import levelOne from './images/level-one.jpg';
import levelTwo from './images/level-two.jpg';
import levelThree from './images/level-three.jpg';
import levelFour from './images/level-four.jpg';
import waldoIcon from './images/waldo.png';
import odlawIcon from './images/odlaw.png';
import wizardIcon from './images/wizard.png';
import wendaIcon from './images/wenda.png';

function App() {
  const [levelData, setData] = useState([]);
  const [view, setView] = useState('home');
  const [characters, setCharacters] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [isFound, setIsFound] = useState({});
  const [gameTime, setGameTime] = useState({});
  const [topY, setTop] = useState(0);
  const [leftX, setLeft] = useState(0);
  const [selectHide, setSelectHide] = useState('none');
  const [messageHide, setMessageHide] = useState('none');
  const [message, setMessage] = useState('');
  const [clickedLocation, setLocation] = useState([]);
  const [currentLevel, setCurrentLevel] = useState({});
  const [checkbox, setCheckbox] = useState(false);

  const navigate = useNavigate();

  const waldo = [{
    name: 'waldo',
    url: waldoIcon,
    id: 0,
  }]

  const allCharacters = [
    {
      name: 'waldo',
      url: waldoIcon,
      id: 0,
    },
    {
      name: 'odlaw',
      url: odlawIcon,
      id: 1,
    },
    {
      name: 'wizard',
      url: wizardIcon,
      id: 2,
    },
    {
      name: 'wenda',
      url: wendaIcon,
      id: 3,
    }
  ]

  useEffect(() => {
      const allData = [
        {
          name: 'level one',
          location: {
            waldo: [61,38],
            odlaw: [10, 36],
            wizard: [27, 36],
            wenda: [77, 41],
          },
          url: levelOne,
          path: '/level-one'
        },
        {
          name: 'level two',
          location: {
            waldo: [85,73],
            odlaw: [31, 65],
            wizard: [6, 76],
            wenda: [48, 42],
          },
          url: levelTwo,
          path: '/level-two'
        },
        {
          name: 'level three',
          location: {
            waldo: [27, 35],
            odlaw: [59, 65],
            wizard: [61, 87],
            wenda: [25, 73],
          },
          url: levelThree,
          path: '/level-three'
        },
        {
          name: 'level four',
          location: {
            waldo: [40, 63],
            odlaw: [7, 69],
            wizard: [78, 58],
            wenda: [29, 52],
          },
          url: levelFour,
          path: '/level-four'
        },
      ]

      setData(allData);
      setCharacters(waldo);

  }, []);

  useEffect(() => {
    checkGameOver();
  }, [isFound]);

  useEffect(() => {
    characters.map(char => {
      setIsFound(prev => ({...prev, [char.name]: false}));
    });
  }, [characters]);

  const startGame = (e) => {
    const name = e.target.name;
    setView(name);

    const [selectedLevel] = levelData.filter(level => level.name === name);
    setCurrentLevel(selectedLevel);
    
 
    characters.map(char => {
      setIsFound(isFound => ({...isFound, [char.name]: false}));
    });

    setGameOver(false);
    setMessageHide('none');
    setSelectHide('none');
  }
  
  const navigateHome = () => {
    navigate('/');
    setView('home');
  }

  const toggleMode = () => {
    if (characters.length === 1) {
      setCharacters(allCharacters);
      setCheckbox(true);
    } else {
      setCharacters(waldo);
      setCheckbox(false);
    }
  }

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clickX = parseInt((e.pageX - rect.left) / e.target.offsetWidth * 100);
    const clickY = parseInt((e.clientY - rect.top) / e.target.offsetHeight * 100);

    setLocation([clickX, clickY]);

    setMessageHide('none');
    setSelectHide('flex');
    setLeft(`${clickX}%`);
    setTop(`${clickY}%`);
  }

  const handleSelect = (e) => {
    const charName = e.target.textContent;
    if (clickedLocation[0] > currentLevel.location[charName][0] - 3 && clickedLocation[0] < currentLevel.location[charName][0] + 3
      && clickedLocation[1] > currentLevel.location[charName][1] - 3 && clickedLocation[1] < currentLevel.location[charName][1] + 3) {
        setIsFound({...isFound, [charName]: true});
        setMessageHide('block');
        setMessage(`You found ${charName[0].toUpperCase() + charName.substring(1)}!`);
        setSelectHide('none');
    } else {
      setMessageHide('block');
      setMessage(`Sorry, ${charName[0].toUpperCase() + charName.substring(1)} isn't there. Try again.`);
      setSelectHide('none');
    }
  }

  const checkGameOver = () => {
    if (Object.values(isFound).every(value => value === true)) {
      setGameOver(true);
    }
  }

  return (
    <div className="App">
      <Header handleClick={navigateHome} />

      {(() => {
        switch (view) {
          case 'home':
            return <Home levelData={levelData}  handleClick={startGame} toggleMode={toggleMode} checkbox={checkbox} />
          case 'level one':
            return <Level levelData={levelData[0]} characters={characters} gameTime={gameTime} setGameTime={setGameTime} selectHide={selectHide} messageHide={messageHide} topY={topY} leftX={leftX} message={message} handleSelect={handleSelect} handleClick={handleImageClick} isFound={isFound} gameOver={gameOver} navigateHome={navigateHome} />
          case 'level two':
            return <Level levelData={levelData[1]} characters={characters} gameTime={gameTime} setGameTime={setGameTime} selectHide={selectHide} messageHide={messageHide} topY={topY} leftX={leftX} message={message} handleSelect={handleSelect} handleClick={handleImageClick} isFound={isFound} gameOver={gameOver} navigateHome={navigateHome} />
          case 'level three':
            return <Level levelData={levelData[2]} characters={characters} gameTime={gameTime} setGameTime={setGameTime} selectHide={selectHide} messageHide={messageHide} topY={topY} leftX={leftX} message={message} handleSelect={handleSelect} handleClick={handleImageClick} isFound={isFound} gameOver={gameOver} navigateHome={navigateHome} />
          case 'level four':
            return <Level levelData={levelData[3]} characters={characters} gameTime={gameTime} setGameTime={setGameTime} selectHide={selectHide} messageHide={messageHide} topY={topY} leftX={leftX} message={message} handleSelect={handleSelect} handleClick={handleImageClick} isFound={isFound} gameOver={gameOver} navigateHome={navigateHome} />
          default:
            return <Home levelData={levelData}  handleClick={startGame} />
        }
      })()}

      {/* <Routes>
        <Route path='/'>
          <Home levelData={levelData}  handleClick={startGame} />
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
