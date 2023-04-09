import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const words = ["apple", "banana", "orange"];
  const [word, setWord] = useState(
    words(Math.floor(Math.random() * words.length))
  );
  const [guesses, setGuesses] = useState;
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const handleGuess = (guess) => {
    if (gameOver) return;
    if (guesses.includes(guess)) return;

    if (word.includes(guess)) {
      setGuesses([...guesses, guess]);
    } else {
      setIncorrectGuesses(incorrectGuesses + 1);
    }

    useEffect(() => {
      if (incorrectGuesses > 5) {
        setGameOver(true);
        setWon(false);
      }

      if (word.split("").every((letter) => guesses.includes(letter))) {
        setGameOver(true);
        setWon(true);
      }
    }, [incorrectGuesses, guesses]);
  };
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
          {won ? 'You won!' : 'You lost!'}
          <button onClick={() => resetGame()}>Play again!</button>
        </div>
      ) : (
        
      )}
    </div>
  );
};

export default App;
