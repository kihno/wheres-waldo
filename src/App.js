import React, { useEffect, useState } from 'react';
import db from './utils/firebase';
import { getFirestore, collection, addDoc, getDoc, doc, getDocs, query, orderBy, } from 'firebase/firestore';
import { Routes, Route, useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';
import './App.css';
import './toggleSwitch.css';
import Header from './components/Header';
import Home from './components/Home';
import Level from './components/Level';
import Leaderboard from './components/Leadboard';
import Footer from './components/Footer';

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
  const [name, setName] = useState('');
  const [leaderboard, setLeaderboard] = useState([[], []]);
  const [sessionID, setSessionID] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
      getCharacters('waldoMode');
      getLevelData();

      getID();
  }, []);

  useEffect(() => {
    checkGameOver();
  }, [isFound]);

  useEffect(() => {
    const updateFound = {};
    characters.map(char => {
      updateFound[char.name] = false;
    });
    setIsFound(updateFound)
  }, [characters]);

  const getID = () => {
    if (localStorage.getItem('sessionID') !== null) {
      setSessionID(localStorage.getItem('sessionID'));
      console.log(sessionID);
    } else {
      setSessionID(uniqid());
      localStorage.setItem('sessionID', sessionID);
      console.log(sessionID);
    }
  }

  const getLevelData = async() => {
    const querySnapshot = await getDocs(query(collection(db, 'levels'), orderBy('sort')));
    const allLevels = [];
    querySnapshot.forEach((doc) => {
      allLevels.push(doc.data());
    });
    setData(allLevels);
  }

  const getCharacters = async (mode) => {
    const querySnapshot = await getDocs(query(collection(db, mode), orderBy('sort')));
    const allCharacters = [];
    querySnapshot.forEach((doc) => {
      allCharacters.push(doc.data());
    });
    setCharacters(allCharacters);
  }

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
    // navigate('/');
    setView('home');
  }

  const returnHome = () => {
    addToLeaderboard();
    navigateHome();
  }

  const navigateLeaderboard = () => {
    setView('leaderboard');
  }

  const viewLeaderboard = () => {
    addToLeaderboard();
    navigateLeaderboard();
  }

  const toggleMode = () => {
    if (characters.length === 1) {
      getCharacters('challengeMode');
      setCheckbox(true);
    } else {
      getCharacters('waldoMode');
      setCheckbox(false);
    }
  }

  const waldoMode = () => {
    getCharacters('waldoMode');
    setCheckbox(false);
  }

  const challengeMode = () => {
      getCharacters('challengeMode');
      setCheckbox(true);
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

  const handleNameInput = (e) => {
    const value = e.target.value;

    setName(value);
  }

  const checkGameOver = () => {
    if (Object.values(isFound).every(value => value === true)) {
      setGameOver(true);
    }
  }

  const addToLeaderboard = () => {
    const entry = {
      name: name,
      time: gameTime,
      level: currentLevel.name,
      id: uniqid(),
    }

    if (entry.name === '') {
      entry.name = 'anonymous-' + sessionID;
    }

    let updateBoard = [...leaderboard];

    if (checkbox === false) {
      updateBoard[0].map(leader => {
        if (leader.name === entry.name && !leader.name.includes(sessionID)) {
          entry.name = entry.name + '-' + sessionID;
        }
      });

      updateBoard[0].push(entry);
      setLeaderboard(updateBoard);
    } else {
      updateBoard[1].map(leader => {
        if (leader.name === entry.name && !leader.name.includes(sessionID)) {
          entry.name = entry.name + '-' + sessionID;
        }
      });

      updateBoard[1].push(entry);
      setLeaderboard(updateBoard);
    }
    setName('');
  }

  return (
    <div className="App">
      <Header handleHomeClick={navigateHome} handleLeaderboardClick={navigateLeaderboard} />

      {(() => {
        switch (view) {
          case 'home':
            return <Home levelData={levelData}  handleClick={startGame} toggleMode={toggleMode} checkbox={checkbox} waldoMode={waldoMode} challengeMode={challengeMode} />
          case 'leaderboard':
            return <Leaderboard leaderboard={leaderboard} />
          case 'level one':
            return <Level levelData={levelData[0]} characters={characters} gameTime={gameTime} setGameTime={setGameTime} selectHide={selectHide} messageHide={messageHide} topY={topY} leftX={leftX} message={message} handleSelect={handleSelect} handleClick={handleImageClick} isFound={isFound} gameOver={gameOver} returnHome={returnHome} name={name} handleInput={handleNameInput} viewLeaderboard={viewLeaderboard} />
          case 'level two':
            return <Level levelData={levelData[1]} characters={characters} gameTime={gameTime} setGameTime={setGameTime} selectHide={selectHide} messageHide={messageHide} topY={topY} leftX={leftX} message={message} handleSelect={handleSelect} handleClick={handleImageClick} isFound={isFound} gameOver={gameOver} returnHome={returnHome} name={name} handleInput={handleNameInput} viewLeaderboard={viewLeaderboard} />
          case 'level three':
            return <Level levelData={levelData[2]} characters={characters} gameTime={gameTime} setGameTime={setGameTime} selectHide={selectHide} messageHide={messageHide} topY={topY} leftX={leftX} message={message} handleSelect={handleSelect} handleClick={handleImageClick} isFound={isFound} gameOver={gameOver} returnHome={returnHome} name={name} handleInput={handleNameInput} viewLeaderboard={viewLeaderboard} />
          case 'level four':
            return <Level levelData={levelData[3]} characters={characters} gameTime={gameTime} setGameTime={setGameTime} selectHide={selectHide} messageHide={messageHide} topY={topY} leftX={leftX} message={message} handleSelect={handleSelect} handleClick={handleImageClick} isFound={isFound} gameOver={gameOver} returnHome={returnHome} name={name} handleInput={handleNameInput} viewLeaderboard={viewLeaderboard} />
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
