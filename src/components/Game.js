import React, { useState } from "react";
import { calculateWinner } from "../helpers";
import Board from "./Board";
import Header from "./Header";
import "../App.css";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xScore, setxScore] = useState(0);
  const [oScore, setoScore] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [draw, setDraw] = useState(false);
  let winner = calculateWinner(board);

  const handleClick = (i) => {
    let boardCopy = [...board];

    if (winner || boardCopy[i]) return;
    boardCopy[i] = "X";
    winner = calculateWinner(boardCopy);

    if (winner && winner === "X") {
      setxScore(xScore + 1);
      setBoard(boardCopy);
      return;
    }

    /////////////////////////////////////////////////////////
    // IMPLEMENT A PROPER RANDOMIZED SYSTEM, DONT FORGET! //
    ///////////////////////////////////////////////////////

    let rand = Math.round(Math.random() * 8);
    let count = 0;
    while (boardCopy[rand] != null) {
      count++;
      if (count > 8) break;
      rand = Math.round(Math.random() * 8);
    }

    if (count <= 8) boardCopy[rand] = "O";
    winner = calculateWinner(boardCopy);

    if (winner && winner === "O") setoScore(oScore + 1);
    else {
      for (let i = 0; i < boardCopy.length; i++) {
        if (boardCopy[i] === null) {
          setDraw(false);
          break;
        } else {
          setDraw(true);
        }
      }
    }
    setBoard(boardCopy);
  };

  const renderMoves = () => (
    <button onClick={restart} className="clear-button">
      CLEAR
    </button>
  );

  function restart() {
    setBoard(Array(9).fill(null));
    setDraw(false);
    winner = null;
  }

  const resetGame = () => (
    <button onClick={reset} className="reset-button">
      RESTART
    </button>
  );

  function reset() {
    setBoard(Array(9).fill(null));
    setDraw(false);
    winner = null;
    setxScore(0);
    setoScore(0);
  }

  return (
    <div>
      <Header />
      <Board squares={board} onClick={handleClick} />
      <div className="scores-container">
        <div className="scores">
          <span className="score">You : {xScore}</span>
          <span className="score">Bot : {oScore}</span>
        </div>
      </div>
      <div className="player">
        <p>
          {draw
            ? "Draw"
            : winner
            ? "Winner: " + winner
            : `Player ${xIsNext ? "X" : "O"}'s turn`}
        </p>
        <div>
          {renderMoves()}
          {resetGame()}
        </div>
      </div>
    </div>
  );
};

export default Game;
