import React from 'react';

const Home = (props) => {
    const {levelData, handleClick, toggleMode, checkbox } = props;

    return(
        <div id="start">
            <div id="toggleMode">
                <span className="waldoMode">Waldo Mode</span>
                <label className="switch">
                    <input type="checkbox" onClick={toggleMode} checked={checkbox}></input>
                    <span className="slider round"></span>
                </label>
                <span className="challengeMode">Challenge Mode</span>
            </div>
            
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