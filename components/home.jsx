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

  useEffect(() => {
    if (teamTwoInningsEnd) {
      if (teamOneRun > teamTwoRun) {
        setWinner(1);
      } else if (teamOneRun < teamTwoRun) {
        setWinner(2);
      } else if (teamOneRun === teamTwoRun) {
        setMatchTie(1);
      }
    }
  }, [teamTwoInningsEnd, teamOneRun, teamTwoRun]);

  function resetInnings() {
    setRun(0);
    setOver(0);
    setWicket(0);
    setBallInOneOver(0);
    setRunInOneOver([]);
  }

  function updateOver() {
    setOver(over + 1);
    setBallInOneOver(0);
    setRunInOneOver([]);
  }

  function updateMatch() {
    setRun(0);
    setWicket(0);
    setOver(0);
    setBallInOneOver(0);
    setRunInOneOver([]);
    setTeamOneRun(0);
    setTeamOneWicket(0);
    setTeamOneOver(0);
    setTeamOneBallInOneOver(0);
    setTeamOneInningsEnd(false);
    setTeamTwoRun(0);
    setTeamTwoWicket(0);
    setTeamTwoOver(0);
    setTeamTwoBallInOneOver(0);
    setTeamTwoInningsEnd(false);
    setWinner(0);
    setMatchTie(0);
  }

  function updateRun(pb) {
    if (ballInOneOver === 6) {
      return;
    } else if (pb === "Dot Ball") {
      if (over === MAX_OVERS - 1 && ballInOneOver === 5 && !teamOneInningsEnd) {
        setTeamOneRun(run);
        setTeamOneOver(over + 1);
        setTeamOneWicket(wicket);
        setTeamOneBallInOneOver(0);
        resetInnings();
        setTeamOneInningsEnd(true);
      } else if (over === MAX_OVERS - 1 && ballInOneOver === 5) {
        setTeamTwoRun(run);
        setTeamTwoOver(over);
        setTeamTwoWicket(wicket);
        setTeamTwoBallInOneOver(ballInOneOver);
        setTeamTwoInningsEnd(true);
        resetInnings();
      } else {
        setRunInOneOver([...runInOneOver, "*"]);
        setBallInOneOver(ballInOneOver + 1);
      }
    } else if (pb === "Wicket") {
      if (
        (over === MAX_OVERS - 1 && ballInOneOver === 5 && !teamOneInningsEnd) ||
        (wicket === 9 && !teamOneInningsEnd)
      ) {
        setTeamOneRun(run);
        setTeamOneOver(over);
        if (wicket === 9) {
          setTeamOneWicket(wicket + 1);
        } else {
          setTeamOneWicket(wicket);
        }
        setTeamOneBallInOneOver(ballInOneOver + 1);
        setTeamOneInningsEnd(true);
        resetInnings();
      } else if (
        (over === MAX_OVERS - 1 && ballInOneOver === 5) ||
        wicket === 9
      ) {
        setTeamTwoRun(run);
        setTeamTwoOver(over);
        if (wicket === 9) {
          setTeamTwoWicket(wicket + 1);
        } else {
          setTeamTwoWicket(wicket);
        }
        setTeamTwoBallInOneOver(ballInOneOver + 1);
        setTeamTwoInningsEnd(true);
        resetInnings();
      } else {
        setRunInOneOver([...runInOneOver, "W"]);
        setWicket(wicket + 1);
        setBallInOneOver(ballInOneOver + 1);
      }
    } else if (pb === "Wide Ball") {
      if (teamOneRun === run) {
        setTeamTwoRun(run + 1);
        setTeamTwoWicket(wicket);
        setTeamTwoOver(over);
        setTeamTwoBallInOneOver(ballInOneOver);
        setTeamTwoInningsEnd(false);
      }
      setRunInOneOver([...runInOneOver, "WB"]);
      setRun(run + 1);
    } else if (pb === "No Ball") {
      if (teamOneRun === run) {
        setTeamTwoRun(run + 1);
        setTeamTwoWicket(wicket);
        setTeamTwoOver(over);
        setTeamTwoBallInOneOver(ballInOneOver);
        setTeamTwoInningsEnd(false);
      }
      setRunInOneOver([...runInOneOver, "NB"]);
      setRun(run + 1);
    } else if (teamOneInningsEnd && teamOneRun < run + pb) {
      setTeamTwoRun(run + pb);
      setTeamTwoWicket(wicket);
      setTeamTwoOver(over);
      setTeamTwoBallInOneOver(ballInOneOver);
      setTeamTwoInningsEnd(true);
    } else {
      setRunInOneOver([...runInOneOver, pb]);
      setRun(pb + run);
      setBallInOneOver(ballInOneOver + 1);
    }
    if (over === MAX_OVERS - 1 && ballInOneOver === 5 && !teamOneInningsEnd) {
      setTeamOneRun(run);
      setTeamOneOver(over + 1);
      setTeamOneWicket(wicket);
      setTeamOneBallInOneOver(0);
      setTeamOneInningsEnd(true);
      resetInnings();
    } else if (over === MAX_OVERS - 1 && ballInOneOver === 5) {
      setTeamTwoRun(run);
      setTeamTwoOver(over + 1);
      setTeamTwoWicket(wicket);
      setTeamTwoBallInOneOver(0);
      setTeamTwoInningsEnd(true);
      resetInnings();
    }
  }

  return (
    <div className="flex justify-center items-center px-4">
      <div className="flex flex-col gap-4 border shadow-2xl rounded-md p-4 font-bold">
        <div className="flex flex-col gap-5 justify-around">
          <div className="flex flex-wrap gap-4 justify-center">
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
            <div className="flex justify-center">
              {winner === 1
                ? `Team 1 Won by ${teamOneRun - teamTwoRun} runs`
                : `Team 2 Won by ${10 - teamTwoWicket} wickets`}
            </div>
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
