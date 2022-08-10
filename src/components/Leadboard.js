import React, { useEffect } from "react";
import db from '../utils/firebase';
import { collection, getDocs, query, orderBy, setDoc, doc } from 'firebase/firestore';


const Leaderboard = (props) => {
    const { leaderboard, setLeaderboard } = props;

    useEffect(() => {
        getLeaderboard();
    }, []);

    const getLeaderboard = async() => {
        const querySnapshot = await getDocs(query(collection(db, 'leaderboard')));
        const updateBoard = {};
        querySnapshot.forEach((doc) => {
            updateBoard[doc.id] = doc.data();
        });

        setLeaderboard(updateBoard);
    }


    return (
        <div id="leaderboard">
            <div id="waldoLeaderboard">
                <h2>Waldo Leaderboard</h2>
                <div className="levels">
                    <div id='waldoLevelOne'>
                        <h3>Level One</h3>
                        {[...leaderboard.waldoMode.levelOne]
                            .sort((a, b) => { if (a.time.min === b.time.min) { return a.time.sec - b.time.sec} return a.time.min - b.time.min})
                            .map(entry => {
                                return <div className="entry" key={entry.id}>
                                        <div className="gameName">{entry.name}</div>
                                        <div className="gameTime">{entry.time.min + ":" + entry.time.sec}</div>
                                    </div>
                            })
                        }
                    </div>
                    <div id='waldoLevelTwo'>
                        <h3>Level Two</h3>
                        {[...leaderboard.waldoMode.levelTwo]
                            .sort((a, b) => { if (a.time.min === b.time.min) { return a.time.sec - b.time.sec} return a.time.min - b.time.min})
                            .map(entry => {
                                return <div className="entry" key={entry.id}>
                                        <div className="gameName">{entry.name}</div>
                                        <div className="gameTime">{entry.time.min + ":" + entry.time.sec}</div>
                                    </div>
                            })
                        }
                    </div>
                    <div id='waldoLevelThree'>
                        <h3>Level Three</h3>
                        {[...leaderboard.waldoMode.levelThree]
                            .sort((a, b) => { if (a.time.min === b.time.min) { return a.time.sec - b.time.sec} return a.time.min - b.time.min})
                            .map(entry => {
                                return <div className="entry" key={entry.id}>
                                        <div className="gameName">{entry.name}</div>
                                        <div className="gameTime">{entry.time.min + ":" + entry.time.sec}</div>
                                    </div>
                            })
                        }
                    </div>
                    <div id='waldoLevelFour'>
                        <h3>Level Four</h3>
                        {[...leaderboard.waldoMode.levelFour]
                            .sort((a, b) => { if (a.time.min === b.time.min) { return a.time.sec - b.time.sec} return a.time.min - b.time.min})
                            .map(entry => {
                                return <div className="entry" key={entry.id}>
                                        <div className="gameName">{entry.name}</div>
                                        <div className="gameTime">{entry.time.min + ":" + entry.time.sec}</div>
                                    </div>
                            })
                        }
                    </div>
                </div>
            </div>
            <div id="challengeLeaderboard">
                <h2>Challenge Leaderboard</h2>
                <div className="levels">
                    <div id='challengeLevelOne'>
                        <h3>Level One</h3>
                        {[...leaderboard.challengeMode.levelOne]
                            .sort((a, b) => { if (a.time.min === b.time.min) { return a.time.sec - b.time.sec} return a.time.min - b.time.min})
                            .map(entry => {
                                return <div className="entry" key={entry.id}>
                                        <div className="gameName">{entry.name}</div>
                                        <div className="gameTime">{entry.time.min + ":" + entry.time.sec}</div>
                                    </div>
                            })
                        }
                    </div>
                    <div id='challengeLevelTwo'>
                        <h3>Level Two</h3>
                        {[...leaderboard.challengeMode.levelOne]
                            .sort((a, b) => { if (a.time.min === b.time.min) { return a.time.sec - b.time.sec} return a.time.min - b.time.min})
                            .map(entry => {
                                return <div className="entry" key={entry.id}>
                                        <div className="gameName">{entry.name}</div>
                                        <div className="gameTime">{entry.time.min + ":" + entry.time.sec}</div>
                                    </div>
                            })
                        }
                    </div>
                    <div id='challengeLevelThree'>
                        <h3>Level Three</h3>
                        {[...leaderboard.challengeMode.levelOne]
                            .sort((a, b) => { if (a.time.min === b.time.min) { return a.time.sec - b.time.sec} return a.time.min - b.time.min})
                            .map(entry => {
                                return <div className="entry" key={entry.id}>
                                        <div className="gameName">{entry.name}</div>
                                        <div className="gameTime">{entry.time.min + ":" + entry.time.sec}</div>
                                    </div>
                            })
                        }
                    </div>
                    <div id='challengeLevelFour'>
                        <h3>Level Four</h3>
                        {[...leaderboard.challengeMode.levelOne]
                            .sort((a, b) => { if (a.time.min === b.time.min) { return a.time.sec - b.time.sec} return a.time.min - b.time.min})
                            .map(entry => {
                                return <div className="entry" key={entry.id}>
                                        <div className="gameName">{entry.name}</div>
                                        <div className="gameTime">{entry.time.min + ":" + entry.time.sec}</div>
                                    </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Leaderboard;