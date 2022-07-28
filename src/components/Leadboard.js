import React from "react";

const Leaderboard = (props) => {
    const { leaderboard } = props;

    return(
        <div id="leaderboard">
            <div id="waldoLeaderboard">
                <h2>Waldo Leaderboard</h2>
                {leaderboard[0].map(entry => {
                    return <div className="entry" key={entry.id}>
                        <div className="gameTime">{entry.time.min + ":" + entry.time.sec}</div>
                        <div className="gameLevel">{entry.level}</div>
                        <div className="gameName">{entry.name}</div>
                    </div>
                })}
            </div>
            <div id="challengeLeaderboard">
                <h2>Challenge Leaderboard</h2>
                {leaderboard[1].map(entry => {
                    return <div className="entry" key={entry.id}>
                        <div className="gameTime">{entry.time.min + ":" + entry.time.sec}</div>
                        <div className="gameLevel">{entry.level}</div>
                        <div className="gameName">{entry.name}</div>
                    </div>
                })}
            </div>
            
        </div>
    )
}

export default Leaderboard;