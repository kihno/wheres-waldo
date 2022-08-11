import React from 'react';

const Legend = (props) => {
    const { characters, isFound } = props;

    return(
        <div id="legend">
            {characters.map(char => {
                return <div className="character" key={char.id}>
                            <img className={isFound[char.name] ? "charImg found" : "charImg"} src={char.url} alt={char.name}></img>
                            <span className="charName">{char.name}</span>
                        </div>
            })}
        </div>
    )
}

export default Legend;