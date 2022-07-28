import React, { useEffect, useState } from 'react';
import Legend from './Legend';
import Timer from './Timer';
import target from '../images/target.png';

const Level = (props) => {
    const { levelData, handleClick, characters, gameTime, setGameTime, topY, leftX, handleSelect, message, selectHide, messageHide, isFound, gameOver, navigateHome } = props;
    
    return (
        <div id="gameContainer">
            <Legend characters={characters} isFound={isFound} />
            {gameOver ? gameTime.min + ":" + gameTime.sec : <Timer gameTime={gameTime} setGameTime={setGameTime} />}
            <div id="gameboard">
                <div id="message" style={{display: messageHide}}>{message}</div>
                <div id="endGame" className={gameOver ? null : "hide"}>
                    <h2 className="endTitle">You Found Waldo!</h2>
                    <div className="endTime">{gameTime.min + ":" + gameTime.sec}</div>
                    <button className="endButton" onClick={navigateHome}>Play Again?</button>
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
        </div>
    )
}

export default Level;