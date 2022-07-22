import React from 'react';

const Legend = (props) => {
    const { characters } = props;

    return(
        <div id="legend">
            <h2>Legend</h2>
            {characters.map(char => {
                return <div className="character" key={char.id}>
                            <img className="charImg" src={char.url}></img>
                            <span className="charName">{char.name}</span>
                        </div>
            })}
        </div>
    )
}

export default Legend;