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
    if (winner === "X") setxScore(xScore + 1);
    setBoard(boardCopy);
    if (winner) return;

    let rand = Math.round(Math.random() * 8);
    let count = 0;
    while (boardCopy[rand] != null) {
      count++;
      if (count > 8) {
        break;
      }
      rand = Math.round(Math.random() * 8);
    }

    if (count <= 8) {
      boardCopy[rand] = "O";
    }
    winner = calculateWinner(boardCopy);
    if (winner === "O") setoScore(oScore + 1);
    setBoard(boardCopy);

    if (!winner) {
      let empty = 0;
      for (let i = 0; i < board.length; i++) {
        if (boardCopy[i] === null) empty++;
      }
      if (empty === 0) {
        setDraw(true);
        return;
      }
    }
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
          <span className="score">X : {xScore}</span>
          <span className="score">O : {oScore}</span>
        </div>
      </div>
      <div className="player">
        <p>
          {draw
            ? "Draw"
            : winner
            ? "Winner: " + winner
            : "You are: " + (xIsNext ? "X" : "O")}
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
