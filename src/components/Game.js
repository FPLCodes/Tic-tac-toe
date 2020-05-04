import React, { useState } from "react";
import { calculateWinner } from "../helpers";
import Board from "./Board";
import Header from "./Header";
import "../App.css";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const [found, setFound] = useState(false);
  const [draw, setDraw] = useState(false);
  const winner = calculateWinner(board);

  const handleClick = (i) => {
    const boardCopy = [...board];

    if (winner || boardCopy[i]) return;
    boardCopy[i] = "X";
    setBoard(boardCopy);
    if (winner) return;

    for (let i = 0; i < board.length; i++) {
      if (board[i] != null) setDraw(true);
      else {
        setDraw(false);
        break;
      }
    }

    if (draw) return;

    let rand = Math.round(Math.random() * 8);
    let count = 0;
    console.log(rand);

    while (boardCopy[rand] != null) {
      count++;
      console.log("Count: " + count);
      if (count > 8) {
        break;
      }
      rand = Math.round(Math.random() * 8);
      console.log(rand);
    }

    if (count <= 8) {
      boardCopy[rand] = "O";
    }

    setBoard(boardCopy);
    setXisNext(!xIsNext);
    console.log(boardCopy);
  };

  const renderMoves = () => (
    <button
      onClick={() => setBoard(Array(9).fill(null))}
      className="start-button"
    >
      Restart Game
    </button>
  );

  return (
    <div>
      <Board squares={board} onClick={handleClick} />
      <Header />
      <div>
        <div className="player">
          <p>
            {draw
              ? "Draw"
              : winner
              ? "Winner: " + winner
              : "You are: " + (xIsNext ? "X" : "O")}
          </p>
          {renderMoves()}
        </div>
      </div>
    </div>
  );
};

export default Game;
