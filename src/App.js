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
  const [gameOver, setGameOver] = useState(false);
  const [gameTime, setGameTime] = useState({});
  const [topY, setTop] = useState(0);
  const [leftX, setLeft] = useState(0);
  const [selectHide, setSelectHide] = useState('none');
  const [messageHide, setMessageHide] = useState('none');
  const [message, setMessage] = useState('');
  const [clickedLocation, setLocation] = useState([]);
  const [currentLevel, setCurrentLevel] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
      const allImages = [
        {
          name: 'level one',
          location: {
            waldo: [61,38],
            odlaw: [10, 36],
            wizard: [27, 36]
          },
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
        id: 0,
        location: {
          levelOne: [61,38]
        }
      }]

      setImage(allImages);
      setCharacters(waldo);
  }, []);

  const startGame = (e) => {
    const name = e.target.name;
    setView(name);

    const [selectedLevel] = images.filter(level => level.name === name);
    setCurrentLevel(selectedLevel);
  }
  
  const navigateHome = () => {
    navigate('/');
    setView('home');
    console.log(gameTime);
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
    console.log(currentLevel.location[charName]);
    if (clickedLocation[0] > currentLevel.location[charName][0] - 3 && clickedLocation[0] < currentLevel.location[charName][0] + 3
        && clickedLocation[1] > currentLevel.location[charName][1] - 3 && clickedLocation[1] < currentLevel.location[charName][1] + 3) {
          console.log('you found waldo')
    } else {
      setMessageHide('block');
      setMessage(`Sorry, ${charName[0].toUpperCase() + charName.substring(1)} isn't there. Try again.`)
      setSelectHide('none');
    }
  }

  return (
    <div className="App">
      <Header handleClick={navigateHome} />

      {(() => {
        switch (view) {
          case 'home':
            return <Home images={images}  handleClick={startGame} />
          case 'level one':
            return <Level image={images[0]} characters={characters} gameTime={gameTime} setGameTime={setGameTime} selectHide={selectHide} messageHide={messageHide} topY={topY} leftX={leftX} message={message} handleSelect={handleSelect} handleClick={handleImageClick} />
          case 'level two':
            return <Level image={images[1]} characters={characters} gameTime={gameTime} setGameTime={setGameTime} handleClick={handleImageClick} />
          case 'level three':
            return <Level image={images[2]} characters={characters} gameTime={gameTime} setGameTime={setGameTime} handleClick={handleImageClick} />
          case 'level four':
            return <Level image={images[3]} characters={characters} gameTime={gameTime} setGameTime={setGameTime} handleClick={handleImageClick} />
          default:
            return <Home images={images}  handleClick={startGame} />
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
