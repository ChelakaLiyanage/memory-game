import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useLocation } from "react-router-dom";

export const GamePageContext = createContext();

const cardImages = [
  { src: "/img/BunnyHat.png", matched: false },
  { src: "/img/Coin.png", matched: false },
  { src: "/img/MagicBall.png", matched: false },
  { src: "/img/Scroll.png", matched: false },
  { src: "/img/Shield.png", matched: false },
  { src: "/img/Sword.png", matched: false },
];

const GamePageProvider = (props) => {
  const location = useLocation();

  const { children } = props;
  const { difficulty } = location.state || { difficulty: "normal" };

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(
    difficulty === "hard" ? 15 : difficulty === "normal" ? 5 : 35
  );
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const [gameTimer, setGameTimer] = useState(
    difficulty === "hard" ? 30 : difficulty === "normal" ? 15 : 90
  );
  const [isGameTimerRunning, setIsGameTimerRunning] = useState(true);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(difficulty === "hard" ? 15 : difficulty === "normal" ? 5 : 35);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns - 1);
    setDisabled(false);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTimer = () => {
    setGameTimer(0);
    setIsGameTimerRunning(true);
  };

  useEffect(() => {
    let interval;
    if (isGameTimerRunning) {
      interval = setInterval(() => {
        setGameTimer((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            alert("Time's up! Game Over.");
            // Handle game over logic here (e.g., navigate back to main menu or reset game)
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isGameTimerRunning]);

  const values = useMemo(
    () => ({
      cards,
      setCards,
      turns,
      choiceOne,
      choiceTwo,
      disabled,
      setDisabled,
      shuffleCards,
      resetTurn,
      handleChoice,
      gameTimer,
      resetTimer,
    }),
    [
      cards,
      turns,
      choiceOne,
      choiceTwo,
      disabled,
      shuffleCards,
      handleChoice,
      gameTimer,
    ]
  );

  return (
    <GamePageContext.Provider value={values}>
      {children}
    </GamePageContext.Provider>
  );
};

export const useGamePageContext = () => {
  return useContext(GamePageContext);
};

export default GamePageProvider;
