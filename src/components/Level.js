import React, {useState} from 'react';
import Legend from './Legend';
import Timer from './Timer';
import target from '../images/target.png';

const Level = (props) => {
    const { levelData, handleClick, characters, gameTime, setGameTime, topY, leftX, handleSelect, message, selectHide, messageHide, targetHide } = props;

    return (
        <div id="gameContainer">
            <Legend characters={characters} />
            <Timer gameTime={gameTime} setGameTime={setGameTime} />
            <div id="gameboard">
                <div id="message" style={{display: messageHide}}>{message}</div>
                <div id="tag" style={{display: selectHide, top:topY, left:leftX}}>
                    <div id="targetBox"></div>
                    <ul id="characterList">
                        {characters.map(char => {
                            return <li className="characterTag" key={char.id} onClick={handleSelect}>{char.name}</li>
                        })}
                    </ul>
                </div>
                { characters.map(char => {
                    const charX = `${levelData.location[char.name][0]}%`;
                    const charY = `${levelData.location[char.name][1]}%`;
                    return <img className={"target " + char.name} src={target} alt="X" key={char.id}
                            style={{left: charX, top: charY, display: targetHide[char.name]}}></img>
                })}
                <img id="gameImage" src={levelData.url} onClick={handleClick} alt={levelData.name}>
                </img>
            </div>
        </div>
    )
}

export default Level;