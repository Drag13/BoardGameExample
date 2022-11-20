import { useState } from "react";
import { rnd } from "./utils/math";
import { createMatrix, Matrix, setMatrixValue } from "./utils/matrix";
import "./App.css";

const MATRIX_SIZE = +import.meta.env.VITE_FIELD_SIZE ?? 3;

const GameStatus = {
  NotStarted: "not-started",
  Revealed: "revealed",
  Guessing: "guessing",
  Lost: "lost",
  Won: "won",
  SmallWon: "small-won",
};

type GameState = {
  gameBoard: Matrix<{ value: string; revealed: boolean }>;
  status: typeof GameStatus[keyof typeof GameStatus];
  letter: string;
};

const LETTERS_POOL = ["A", "B"];

const getRandomLetter = (pool: string[]) => pool[rnd(pool.length)];

function App() {
  // TODO: add minimum one letter
  const [gameState, setGameState] = useState<GameState>({
    gameBoard: createMatrix(MATRIX_SIZE, () => ({
      value: getRandomLetter(LETTERS_POOL),
      revealed: false,
    })),
    status: GameStatus.NotStarted,
    letter: "",
  });

  const { gameBoard, status, letter } = gameState;

  const startGame = () => {
    const newGameState = {
      gameBoard: createMatrix(MATRIX_SIZE, () => ({
        value: getRandomLetter(LETTERS_POOL),
        revealed: false,
      })),
      status: "revealed" as const,
      letter: getRandomLetter(LETTERS_POOL),
    };

    setGameState(newGameState);

    setTimeout(() => {
      setGameState({ ...newGameState, status: "guessing" });
    }, 3000);
  };

  const tryGuess = (value: string, line: number, column: number) => {
    const isLetterGuessed = value === letter;

    if (!isLetterGuessed) {
      setGameState({ ...gameState, status: "lost" });
      return;
    }

    const newGameBoard = setMatrixValue(
      gameBoard,
      {
        revealed: true,
        value,
      },
      line,
      column
    );

    const isAllLettersRevealed = newGameBoard.every((line) =>
      line.every((cell) => {
        if (cell.value === letter) {
          return cell.revealed;
        }

        return true;
      })
    );

    if (isAllLettersRevealed) {
      setGameState({ status: "won", gameBoard: newGameBoard, letter });
      return;
    }

    setGameState({ status: "small-won", gameBoard: newGameBoard, letter });
  };

  const boardDisabled =
    status === GameStatus.NotStarted ||
    status === "revealed" ||
    status === "lost" ||
    status === "won";

  const isBoardRevealed =
    status === "revealed" || status === "lost" || status === "won";

  return (
    <div className="App">
      <h1>{letter ? `Guess the letter ${letter}` : "Press start"}</h1>
      <h2>
        {status === "lost" ? "Loooser" : ""}
        {status === "won" ? "WIIINER" : ""}
        {status === "small-won" ? "Go on my fellow" : ""}
      </h2>
      {gameBoard.map((line, lineIndex) => (
        <div key={lineIndex}>
          {line.map((cell, columnIndex) => (
            <button
              disabled={boardDisabled}
              onClick={() => tryGuess(cell.value, lineIndex, columnIndex)}
              type="button"
              className="cell"
              key={`${lineIndex}_${columnIndex}`}
            >
              {isBoardRevealed || cell.revealed ? cell.value : "?"}
            </button>
          ))}
        </div>
      ))}
      <button type="button" onClick={startGame}>
        {status === "won" || status === "lost" ? "restart" : "start"}
      </button>
    </div>
  );
}

export default App;
