import React from 'react';

const Home = (props) => {
    const {levelData, handleClick} = props;

    return(
        <div id="start">
            <div id="grid">
                {levelData.map(level => {
                    return <div className="imgContainer" key={levelData.indexOf(level)}>
                                <img className="previewImg" onClick={handleClick} name={level.name} src={level.url} alt={level.name}></img>
                            </div>
                })}
            </div>
        </div>
    )
}

export default Home;