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
  const [hidden, setHidden] = useState('none');

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
  }, []);

  const startGame = (e) => {
    const name = e.target.name;
    setView(name);
  }
  
  const navigateHome = () => {
    navigate('/');
    setView('home');
    console.log(gameTime);
  }

  const getCoordinates = (e) => {
    const clickX = e.clientX;
    const clickY = e.clientY;

    
  }

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left - 10;
    const clickY = e.clientY - rect.top - 10;

    setHidden('flex');
    setLeft(clickX);
    setTop(clickY);
  }

  return (
    <div className="App">
      <Header handleClick={navigateHome} />

      {(() => {
        switch (view) {
          case 'home':
            return <Home images={images}  handleClick={startGame} />
          case 'level one':
            return <Level image={images[0]} characters={characters} gameTime={gameTime} setGameTime={setGameTime} hidden={hidden} topY={topY} leftX={leftX} handleClick={handleImageClick} />
          case 'level two':
            return <Level image={images[1]} characters={characters} gameTime={gameTime} setGameTime={setGameTime} handleClick={handleImageClick} />
          case 'level three':
            return <Level image={images[2]} characters={characters} gameTime={gameTime} setGameTime={setGameTime} handleClick={handleImageClick} />
          case 'level four':
            return <Level image={images[3]} characters={characters} gameTime={gameTime} setGameTime={setGameTime} handleClick={handleImageClick} />
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
