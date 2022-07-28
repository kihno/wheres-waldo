import React from 'react';

const Header = (props) => {
    const { handleHomeClick, handleLeaderboardClick } = props;

    return(
        <div id="header">
            <h1 id="logo" onClick={handleHomeClick}>Where's Waldo?</h1>
            <p onClick={handleLeaderboardClick}>Leaderboard</p>
        </div>
    )
}

export default Header;