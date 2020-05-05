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
  const [mode, setMode] = useState("2");
  const [draw, setDraw] = useState(false);
  let winner = calculateWinner(board);

  const handleClick = (i) => {
    let boardCopy = [...board];

    if (winner || boardCopy[i]) return;
    if (xIsNext) boardCopy[i] = "X";
    else boardCopy[i] = "O";
    winner = calculateWinner(boardCopy);

    if (winner && winner === "X") {
      setxScore(xScore + 1);
      setBoard(boardCopy);
      return;
    }

    if (mode === "Bot") {
      let rand = Math.round(Math.random() * 8);
      let count = 0;
      while (boardCopy[rand] != null) {
        count++;
        if (count > 8) break;
        rand = Math.round(Math.random() * 8);
      }

      if (count <= 8) boardCopy[rand] = "O";
    } else setXisNext(!xIsNext);

    winner = calculateWinner(boardCopy);

    if (winner && winner === "O") setoScore(oScore + 1);
    else
      for (let i = 0; i < boardCopy.length; i++) {
        if (boardCopy[i] === null) {
          setDraw(false);
          break;
        } else setDraw(true);
      }
    setBoard(boardCopy);
  };

  const renderMoves = () => (
    <button onClick={clear} className="clear-button">
      CLEAR
    </button>
  );

  function clear() {
    setBoard(Array(9).fill(null));
    setDraw(false);
    winner = null;
    setXisNext(true);
  }

  const resetGame = () => (
    <button onClick={reset} className="reset-button">
      RESTART
    </button>
  );

  function reset() {
    clear();
    setxScore(0);
    setoScore(0);
  }

  return (
    <div>
      <Header />
      <div className="mode">
        <select
          className="options"
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
            reset();
          }}
        >
          <option value="2">2 Players</option>
          <option value="Bot">Computer</option>
        </select>
      </div>
      <Board squares={board} onClick={handleClick} />
      <div className="scores-container">
        <div className="scores">
          <span className="score">
            {mode === "Bot" ? `You : ${xScore}` : `Player 1: ${xScore}`}
          </span>
          <span className="score">
            {mode === "Bot" ? `Bot : ${oScore}` : `Player 2: ${oScore}`}
          </span>
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
