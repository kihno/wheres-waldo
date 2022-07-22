import React from 'react';

const Header = (props) => {
    const { handleClick } = props;

    return(
        <div id="header">
            <h1 id="logo" onClick={handleClick}>Where's Waldo?</h1>
        </div>
    )
}

export default Header;