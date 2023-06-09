import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [words, setWords] = useState([]);
  const [word, setWord] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        /* mettre les données JSON ici si nécessaire */
      }),
    })
      .then((response) => response.json())
      .then((data) => setWords(data.words))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (words.length > 0) {
      setWord(words[Math.floor(Math.random() * words.length)]);
    }
  }, [words]);

  const handleGuess = (guess) => {
    if (gameOver) return;
    if (guesses.includes(guess)) return;

    if (word.includes(guess)) {
      setGuesses([...guesses, guess]);
    } else {
      setIncorrectGuesses(incorrectGuesses + 1);
    }
  };

  useEffect(() => {
    if (incorrectGuesses > 5) {
      setGameOver(true);
      setWon(false);
    }

    if (word.split("").every((letter) => guesses.includes(letter))) {
      setGameOver(true);
      setWon(true);
    }
  }, [incorrectGuesses, guesses, word]);

  const resetGame = () => {
    setWord(words[Math.floor(Math.random() * words.length)]);
    setGuesses([]);
    setIncorrectGuesses(0);
    setGameOver(false);
    setWon(false);
  };

  return (
    <div>
      <h1>Hangman</h1>
      {gameOver ? (
        <div>
          {won ? "You won!" : "You lost!"}
          <button onClick={() => resetGame()}>Play again!</button>
        </div>
      ) : (
        <div>
          <p className="incorrect">Incorrect guesses: {incorrectGuesses}</p>
          <p className="guess">
            {word
              .split("")
              .map((letter) => (guesses.includes(letter) ? letter : "_"))}
          </p>
          <p className="buttons">
            {"abcdefghijklmopqrstuvwxyz".split("").map((letter) => (
              <button key={letter} onClick={() => handleGuess(letter)}>
                {letter}
              </button>
            ))}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
