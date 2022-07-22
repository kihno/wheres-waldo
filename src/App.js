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

function App() {
  const [images, setImage] = useState([]);
  const [view, setView] = useState('home');
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

      setImage(allImages);
  }, []);

  const startGame = (e) => {
    const name = e.target.name;
    setView(name);
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

  return (
    <div className="App">
      <Header handleClick={navigateHome} />

      {(() => {
        switch (view) {
          case 'home':
            return <Home images={images}  handleClick={startGame} />
          case 'level one':
            return <Level image={images[0]} handleClick={getCoordinates} />
          case 'level two':
            return <Level image={images[1]} handleClick={getCoordinates} />
          case 'level three':
            return <Level image={images[2]} handleClick={getCoordinates} />
          case 'level four':
            return <Level image={images[3]} handleClick={getCoordinates} />
        }
      })()}

      {/* <Routes>
        <Route path='/'>
          <Home images={images}  handleClick={startGame} />
        </Route>
        <Route path='/level'>
          <Level />
        </Route>
      </Routes>
      <Footer /> */}
    </div>
  );
}

export default App;
