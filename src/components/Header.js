import React from 'react';
import logo from '../images/ww-logo.svg';

const Header = (props) => {
    const { handleHomeClick, handleLeaderboardClick } = props;

    return(
        <div id="header">
            <img id="logo" src={logo} alt="Where's Waldo?" onClick={handleHomeClick}></img>
            <ul id="links">
                <li className="link" onClick={handleHomeClick}>Home</li>
                <li className="link" onClick={handleLeaderboardClick}>Leaderboard</li>
            </ul>
        </div>
    )
}

export default Header;