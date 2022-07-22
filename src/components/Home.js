import React from 'react';

const Home = (props) => {
    const {images, handleClick} = props;

    return(
        <div id="start">
            <div id="grid">
                {images.map(image => {
                    return <div className="imgContainer" key={images.indexOf(image)}>
                                <img className="previewImg" onClick={handleClick} name={image.name} src={image.url}></img>
                            </div>
                })}
            </div>
        </div>
    )
}

export default Home;