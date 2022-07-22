import React from 'react';
import { useLocation } from 'react-router-dom';
import Legend from './Legend';
import Timer from './Timer';

const Level = (props) => {
    const { image, handleClick, characters, gameTime, setGameTime } = props;
    
    const startTimer = () => {

    }

    return (
        <div id="gameContainer">
            <Legend characters={characters} />
            <Timer gameTime={gameTime} setGameTime={setGameTime} />
            <div id="gameboard">
                <img id="gameImage" src={image.url} onClick={handleClick}></img>
            </div>
        </div>
    )
}

export default Level;