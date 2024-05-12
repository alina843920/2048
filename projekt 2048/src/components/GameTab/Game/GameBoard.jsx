import { useState, useEffect, useRef } from "react";
import "./GameBoard.scss";
import gameBoards from "../../../data/gameBoards.json";

function GameBoard() {
  const [boardIndex, setBoardIndex] = useState(0);
  const [board, setBoard] = useState(gameBoards.boards[boardIndex]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const gameBoardRef = useRef();

  useEffect(() => {
    initializeBoard();
  }, [boardIndex]);

  const initializeBoard = () => {
    setBoard(gameBoards.boards[boardIndex]);
    setScore(0);
  };

  const addNewRandomNumber = (newBoard) => {
    let emptyCells = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (newBoard[i][j] === 0) {
          emptyCells.push({ x: i, y: j });
        }
      }
    }
    if (emptyCells.length > 0) {
      const { x, y } =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      newBoard[x][y] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  const handleKeyDown = (event) => {
    const direction = event.key.replace("Arrow", "").toLowerCase();
    if (["up", "down", "left", "right"].includes(direction)) {
      event.preventDefault();
      const newBoard = moveBoard(board, direction);
      if (!areBoardsEqual(board, newBoard)) {
        addNewRandomNumber(newBoard);
        setBoard(newBoard);
      }
    }
  };

  const moveBoard = (currentBoard, direction) => {
    let newBoard = [...currentBoard];
    if (direction === "up" || direction === "down") {
      newBoard = transposeBoard(newBoard);
    }
    if (direction === "down" || direction === "right") {
      newBoard = newBoard.map((row) => row.reverse());
    }
    newBoard = newBoard.map((row) => moveRow(row));
    if (direction === "down" || direction === "right") {
      newBoard = newBoard.map((row) => row.reverse());
    }
    if (direction === "up" || direction === "down") {
      newBoard = transposeBoard(newBoard);
    }
    return newBoard;
  };

  const transposeBoard = (currentBoard) => {
    return currentBoard[0].map((_, i) => currentBoard.map((row) => row[i]));
  };

  const moveRow = (row) => {
    const newRow = row.filter((value) => value !== 0);
    for (let i = newRow.length - 1; i > 0; i--) {
      if (newRow[i] === newRow[i - 1]) {
        newRow[i] *= 2;
        setScore(score + newRow[i]);
        newRow.splice(i - 1, 1);
      }
    }
    while (newRow.length < 4) {
      newRow.unshift(0);
    }
    return newRow;
  };

  const areBoardsEqual = (board1, board2) => {
    return JSON.stringify(board1) === JSON.stringify(board2);
  };

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score, bestScore]);

  useEffect(() => {
    gameBoardRef.current.focus();
  }, []);

  const handleNewGame = () => {
    const newIndex = Math.floor(Math.random() * gameBoards.boards.length);
    setBoardIndex(newIndex);
  };

  return (
    <div
      className="game-board"
      ref={gameBoardRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="score-info">
        <div>Wynik: {score}</div>
        <div>Najlepszy Wynik: {bestScore}</div>
      </div>
      <div className="board-container">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell cell-${cell}`}
            >
              {cell !== 0 && cell}
            </div>
          ))
        )}
      </div>
      <button onClick={handleNewGame}>Nowa Gra</button>
    </div>
  );
}

export default GameBoard;
