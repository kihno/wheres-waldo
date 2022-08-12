import React, { useEffect } from "react";

const Leaderboard = (props) => {
    const { leaderboard } = props;

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    return (
        <div id="leaderboard">
            {Object.keys(leaderboard).map((mode, index) => {
                return (
                    <div id={mode} key={index}>
                        <h2>{mode.replace('-', ' ')}</h2>
                        <div className="levels">
                            {Object.keys(leaderboard[mode]).map((level, index) => {
                                return (
                                    <div className={level} key={index}>
                                        <h3>{level.replace('-', ' ')}</h3>
                                        <ol className="leaderList">
                                            {leaderboard[mode][level].sort((a, b) => { if (a.time.min === b.time.min) { return a.time.sec - b.time.sec} return a.time.min - b.time.min})
                                            .map(entry => {
                                                return <li className="entry" key={entry.id}>{entry.time.min + ":" + entry.time.sec + "  -  " + entry.name}</li>
                                            })}
                                        </ol>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Leaderboard;