import React, { useState, useEffect } from "react";
import "./App.css";

const Square = ({ value, onClick, isWinningSquare }) => {
  return (
    <button
      className={`square ${value ? value.toLowerCase() : ""} ${isWinningSquare ? "winning-square" : ""}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningSquares, setWinningSquares] = useState([]);

  useEffect(() => {
    if (winner) {
      document.body.style.background = winner === "X" ? "#ff6f91" : "#6b6aff";
    } else {
      document.body.style.background = "linear-gradient(135deg, #ff9a9e, #fad0c4)";
    }
  }, [winner]);

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);

    const { winner: newWinner, line } = calculateWinner(newSquares);
    if (newWinner) {
      setWinner(newWinner);
      setWinningSquares(line);
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningSquares([]);
    document.body.style.background = "linear-gradient(135deg, #ff9a9e, #fad0c4)";
  };

  const renderSquare = (index) => {
    return (
      <Square
        value={squares[index]}
        onClick={() => handleClick(index)}
        isWinningSquare={winningSquares.includes(index)}
      />
    );
  };

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? "X" : "O"}`;

  return (
    <div className={winner ? "end-game" : ""}>
      <div className={`status ${isXNext ? "x-turn" : "o-turn"}`}>{status}</div>
      <div className="board-row">
        {renderSquare(0)} {renderSquare(1)} {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)} {renderSquare(4)} {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)} {renderSquare(7)} {renderSquare(8)}
      </div>
      <button className="reset-button" onClick={resetGame}>Start New Game</button>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return { winner: null, line: [] };
};

const App = () => {
  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <Board />
    </div>
  );
};

export default App;
