import React from 'react';

const Home = (props) => {
    const {levelData, handleClick, toggleMode, checkbox, waldoMode, challengeMode } = props;

    return(
        <div id="start">
            <div id="toggleMode">
                <span className="mode" onClick={waldoMode}>Waldo Mode</span>
                <label className="switch">
                    <input type="checkbox" checked={checkbox} onChange={toggleMode}></input>
                    <span className="slider round"></span>
                </label>
                <span className="mode" onClick={challengeMode}>Challenge Mode</span>
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