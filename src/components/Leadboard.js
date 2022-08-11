import React, { useEffect } from "react";
import db from '../utils/firebase';
import { collection, getDocs, query, orderBy, setDoc, doc } from 'firebase/firestore';


const Leaderboard = (props) => {
    const { leaderboard, setLeaderboard } = props;

    useEffect(() => {
        getLeaderboard();
        window.scrollTo(0,0);
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
                        <ol className="leaderList">
                            {[...leaderboard.waldoMode.levelOne]
                                .sort((a, b) => { if (a.time.min === b.time.min) { return a.time.sec - b.time.sec} return a.time.min - b.time.min})
                                .map(entry => {
                                    return <li className="entry" key={entry.id}>{entry.time.min + ":" + entry.time.sec + "  -  " + entry.name}</li>
                                })
                            }
                        </ol>
                    </div>
                    <div id='waldoLevelTwo'>
                        <h3>Level Two</h3>
                        <ol className="leaderList">
                            {[...leaderboard.waldoMode.levelTwo]
                                .sort((a, b) => { if (a.time.min === b.time.min) { return a.time.sec - b.time.sec} return a.time.min - b.time.min})
                                .map(entry => {
                                    return <li className="entry" key={entry.id}>{entry.time.min + ":" + entry.time.sec + "  -  " + entry.name}</li>
                                })
                            }
                        </ol>
                    </div>
                    <div id='waldoLevelThree'>
                        <h3>Level Three</h3>
                        <ol className="leaderList">
                            {[...leaderboard.waldoMode.levelThree]
                                .sort((a, b) => { if (a.time.min === b.time.min) { return a.time.sec - b.time.sec} return a.time.min - b.time.min})
                                .map(entry => {
                                    return <li className="entry" key={entry.id}>{entry.time.min + ":" + entry.time.sec + "  -  " + entry.name}</li>
                                })
                            }
                        </ol>
                    </div>
                    <div id='waldoLevelFour'>
                        <h3>Level Four</h3>
                        <ol className="leaderList">
                            {[...leaderboard.waldoMode.levelFour]
                                .sort((a, b) => { if (a.time.min === b.time.min) { return a.time.sec - b.time.sec} return a.time.min - b.time.min})
                                .map(entry => {
                                    return <li className="entry" key={entry.id}>{entry.time.min + ":" + entry.time.sec + "  -  " + entry.name}</li>
                                })
                            }
                        </ol>
                    </div>
                </div>
            </div>
            <div id="challengeLeaderboard">
                <h2>Challenge Leaderboard</h2>
                <div className="levels">
                    <div id='challengeLevelOne'>
                        <h3>Level One</h3>
                        <ol className="leaderList">
                            {[...leaderboard.challengeMode.levelOne]
                                .sort((a, b) => { if (a.time.min === b.time.min) { return a.time.sec - b.time.sec} return a.time.min - b.time.min})
                                .map(entry => {
                                    return <li className="entry" key={entry.id}>{entry.time.min + ":" + entry.time.sec + "  -  " + entry.name}</li>
                                })
                            }
                        </ol>
                    </div>
                    <div id='challengeLevelTwo'>
                        <h3>Level Two</h3>
                        <ol className="leaderList">
                            {[...leaderboard.challengeMode.levelTwo]
                                .sort((a, b) => { if (a.time.min === b.time.min) { return a.time.sec - b.time.sec} return a.time.min - b.time.min})
                                .map(entry => {
                                    return <li className="entry" key={entry.id}>{entry.time.min + ":" + entry.time.sec + "  -  " + entry.name}</li>
                                })
                            }
                        </ol>
                    </div>
                    <div id='challengeLevelThree'>
                        <h3>Level Three</h3>
                        <ol className="leaderList">
                            {[...leaderboard.challengeMode.levelThree]
                                .sort((a, b) => { if (a.time.min === b.time.min) { return a.time.sec - b.time.sec} return a.time.min - b.time.min})
                                .map(entry => {
                                    return <li className="entry" key={entry.id}>{entry.time.min + ":" + entry.time.sec + "  -  " + entry.name}</li>
                                })
                            }
                        </ol>
                    </div>
                    <div id='challengeLevelFour'>
                        <h3>Level Four</h3>
                        <ol className="leaderList">
                            {[...leaderboard.challengeMode.levelFour]
                                .sort((a, b) => { if (a.time.min === b.time.min) { return a.time.sec - b.time.sec} return a.time.min - b.time.min})
                                .map(entry => {
                                    return <li className="entry" key={entry.id}>{entry.time.min + ":" + entry.time.sec + "  -  " + entry.name}</li>
                                })
                            }
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Leaderboard;