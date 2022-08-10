import React from 'react';
import Legend from './Legend';
import Timer from './Timer';
import target from '../images/target.png';
import back from '../images/back-icon.png';

const Level = (props) => {
    const { levelData, handleClick, characters, gameTime, setGameTime, topY, leftX, handleSelect, message, selectHide, messageHide, isFound, gameOver, viewLeaderboard, returnHome, name, handleInput, handleHomeClick } = props;
    
    return(
        <div id="gameContainer">
            <Legend characters={characters} isFound={isFound} />
            {gameOver ? gameTime.min + ":" + gameTime.sec : <Timer gameTime={gameTime} setGameTime={setGameTime} />}
            <div id="gameboard">
                <div id="message" style={{display: messageHide}}>{message}</div>
                <div id="endGame" className={gameOver ? null : "hide"}>
                    <h2 className="endTitle">You Found Waldo!</h2>
                    <div className="endTime">{"Your Time: " + gameTime.min + ":" + gameTime.sec}</div>
                    <p>You made the leaderboard!</p>
                    <label className="timeInputLabel">Enter Your Name:
                        <input type="text" value={name} onChange={handleInput}></input>
                    </label>
                    <button className="leaderboardButton" onClick={viewLeaderboard}>View Leaderboard</button>
                    <button className="endButton" onClick={returnHome}>Keep Playing</button>
                </div>
                <div id="tag" style={{display: selectHide, top:topY, left:leftX}}>
                    <div id="targetBox"></div>
                    <ul id="characterList">
                        {characters.map(char => {
                            return <li className="characterTag" key={char.id} onClick={handleSelect}>{char.name}</li>
                        })}
                    </ul>
                </div>
                {characters.map(char => {
                    const charX = `${levelData.location[char.name][0]}%`;
                    const charY = `${levelData.location[char.name][1]}%`;
                    return <img className={isFound[char.name] ? "target " + char.name : "hide target " + char.name} src={target} alt="X" key={char.id}
                            style={{left: charX, top: charY,}}></img>
                })}
                <img id="gameImage" src={levelData.url} onClick={gameOver ? null : handleClick} alt={levelData.name}></img>
            </div>
            <button id="backButton" onClick={handleHomeClick}>
                <img src={back} alt="Back" className="backIcon"></img>
            </button>
        </div>
    )
}

export default Level;