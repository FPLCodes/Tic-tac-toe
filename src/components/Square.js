import React from "react";
import "../App.css";

function Square({ value, onClick }) {
  if (value == "X") {
    return (
      <div className="xBG">
        <div className="X"></div>
      </div>
    );
  }
  return (
    <button className="box" onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;
