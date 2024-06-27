"use client";
import Playbutton from "@/components/playbutton";
import Run from "@/components/run";
import React, { useEffect, useState } from "react";

const MAX_OVERS = 2;

const Home = () => {
  const [runInOneOver, setRunInOneOver] = useState([]);
  const [ballInOneOver, setBallInOneOver] = useState(0);
  const [run, setRun] = useState(0);
  const [wicket, setWicket] = useState(0);
  const [over, setOver] = useState(0);
  // Team One State
  const [teamOneOver, setTeamOneOver] = useState(0);
  const [teamOneBallInOneOver, setTeamOneBallInOneOver] = useState(0);
  const [teamOneRun, setTeamOneRun] = useState(0);
  const [teamOneWicket, setTeamOneWicket] = useState(0);
  // Team Two State
  const [teamTwoOver, setTeamTwoOver] = useState(0);
  const [teamTwoBallInOneOver, setTeamTwoBallInOneOver] = useState(0);
  const [teamTwoRun, setTeamTwoRun] = useState(0);
  const [teamTwoWicket, setTeamTwoWicket] = useState(0);
  //Team Innings End
  const [teamOneInningsEnd, setTeamOneInningsEnd] = useState(false);
  const [teamTwoInningsEnd, setTeamTwoInningsEnd] = useState(false);
  //Winner
  const [winner, setWinner] = useState(0);
  const [matchTie, setMatchTie] = useState(0);
  // Next Match
  const [nextMatch, setNextMatch] = useState(0);

  function updateRun(pb) {
    if (ballInOneOver === 6) {
      return;
    } else if (pb === "Dot Ball") {
      setRunInOneOver([...runInOneOver, "*"]);
      setBallInOneOver(ballInOneOver + 1);
    } else if (pb === "Wide Ball") {
      setRunInOneOver([...runInOneOver, "WB"]);
      setRun(run + 1);
    } else if (pb === "Wicket") {
      setRunInOneOver([...runInOneOver, "W"]);
      setWicket(wicket + 1);
      setBallInOneOver(ballInOneOver + 1);
    } else if (pb === "No Ball") {
      setRunInOneOver([...runInOneOver, "NB"]);
      setRun(run + 1);
    } else {
      setRunInOneOver([...runInOneOver, pb]);
      setRun(pb + run);
      setBallInOneOver(ballInOneOver + 1);
    }
  }

  if (over === MAX_OVERS) {
    setRun(0);
    setWicket(0);
    setOver(0);
    setBallInOneOver(0);
    setRunInOneOver([]);
    setTeamOneRun(run);
    setTeamOneWicket(wicket);
    setTeamOneOver(over);
    setTeamOneBallInOneOver(ballInOneOver);
  }

  if (wicket === 10) {
    setRun(0);
    setWicket(0);
    setOver(0);
    setBallInOneOver(0);
    setRunInOneOver([]);
    setTeamOneRun(run);
    setTeamOneWicket(wicket);
    setTeamOneOver(over);
    setTeamOneBallInOneOver(ballInOneOver);
  }

  function updateOver() {
    if (ballInOneOver === 6) {
      setOver(over + 1);
      setBallInOneOver(0);
      setRunInOneOver([]);
    }
  }

  return (
    <div className="flex justify-center items-center px-4">
      <div className="flex flex-col gap-4 border shadow-2xl rounded-md p-4 font-bold">
        <div className="flex flex-col gap-5 justify-around">
          <div className="flex gap-4 justify-center flex-wrap">
            {runInOneOver.map((item, index) => (
              <Run runwicket={item} key={index} />
            ))}
          </div>
          <div className="flex gap-3 justify-around flex-wrap">
            {[1, 2, 3, 4, 6, "Dot Ball", "Wicket", "No Ball", "Wide Ball"].map(
              (item, index) => (
                <Playbutton pb={item} updateRun={updateRun} key={index} />
              )
            )}
            {ballInOneOver === 6 && (
              <button
                onClick={updateOver}
                className="bg-green-500 rounded-md p-4 text-white hover:bg-green-600"
              >
                Next Over
              </button>
            )}
            {(winner !== 0 || matchTie === 1) && (
              <button
                onClick={updateMatch}
                className="bg-orange-500 rounded-md p-4 text-white hover:bg-orange-600"
              >
                Next Match
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-around">
          {winner === 0 && (
            <div className="flex justify-center">
              Current Score: {run}-{wicket} / {over + "." + ballInOneOver}
            </div>
          )}
          {teamOneInningsEnd && (
            <div className="flex justify-center">
              Team 1 Total Score: {teamOneRun}-{teamOneWicket} /{" "}
              {teamOneOver + "." + teamOneBallInOneOver}
            </div>
          )}
          {teamTwoInningsEnd && (
            <div className="flex justify-center">
              Team 2 Total Score: {teamTwoRun}-{teamTwoWicket} /{" "}
              {teamTwoOver + "." + teamTwoBallInOneOver}
            </div>
          )}
          {winner !== 0 && (
            <div className="flex justify-center">Team {winner} Won</div>
          )}
          {matchTie !== 0 && (
            <div className="flex justify-center">Match Tie</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
