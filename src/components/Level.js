import React from 'react';
import Legend from './Legend';
import Timer from './Timer';

const Level = (props) => {
    const { image, handleClick, characters, gameTime, setGameTime, hidden, topY, leftX } = props;

    return (
        <div id="gameContainer">
            <Legend characters={characters} />
            <Timer gameTime={gameTime} setGameTime={setGameTime} />
            <div id="gameboard">
                <div id="tag" style={{display: hidden, top:topY, left:leftX}}>
                    <div id="targetBox"></div>
                    <ul id="characterList">
                        {characters.map(char => {
                            return <li className="characterTag" key={char.id}>{char.name}</li>
                        })}
                    </ul>
                </div>
                <img id="gameImage" src={image.url} onClick={handleClick} alt={image.name}>
                </img>
            </div>
        </div>
    )
}

export default Level;