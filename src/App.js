import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Level from './components/Level';
import Footer from './components/Footer';
import levelOne from './images/levelone.jpeg';
import levelTwo from './images/leveltwo.jpeg';
import levelThree from './images/levelthree.jpeg';
import levelFour from './images/levelfour.jpeg';

function App() {
  const [images, setImage] = useState([]);

  useEffect(() => {
      const allImages = [
        {
          name: 'image one',
          url: levelOne,
        },
        {
          name: 'image two',
          url: levelTwo,
        },
        {
          name: 'image three',
          url: levelThree,
        },
        {
          name: 'image four',
          url: levelFour,
        },
      ]

      setImage(allImages);
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home images={images} />} />
        <Route path='/levelone' element={<Level />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
