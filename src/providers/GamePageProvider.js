import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { routeHelper } from "../helpers/routeHelper";

import { getQuestion } from "../apis/gamePage";

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
  const navigate = useNavigate();

  const { children } = props;
  const { difficulty } = location.state || { difficulty: "normal" };

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(
    difficulty === "hard" ? 15 : difficulty === "normal" ? 25 : 35
  );
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameMode, setGameMode] = useState("card");

  const [gameTimer, setGameTimer] = useState(
    difficulty === "hard" ? 30 : difficulty === "normal" ? 60 : 90
  );
  const [isGameTimerRunning, setIsGameTimerRunning] = useState(true);

  const [isQuestionLoading, setIsQuestionLoading] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const [userAnswer, setUserAnswer] = useState(0);
  const [userAnswerMessage, setUserAnswerMessage] = useState("");

  const fetchQuestionData = async () => {
    try {
      setIsQuestionLoading(true);
      const response = await getQuestion();
      setQuestionData(response.data);
    } catch (error) {
      //error scenario
    } finally {
      setIsQuestionLoading(false);
    }
  };

  const handleUserAnswerSubmit = useCallback(() => {
    if (userAnswer) {
      if (parseInt(userAnswer) === questionData.solution) {
        setQuestionData(null);
        setUserAnswerMessage("");
      } else {
        setUserAnswerMessage("Your Answer is incorrect");
      }
    } else {
      setUserAnswerMessage("Please Enter a valid answer");
    }
  }, [questionData, userAnswer]);

  const shuffleCards = useCallback(() => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(difficulty === "hard" ? 15 : difficulty === "normal" ? 25 : 35);
  }, [difficulty]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns - 1);
    setDisabled(false);
  };

  const handleChoice = useCallback(
    (card) => {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    },
    [choiceOne]
  );

  const resetTimer = () => {
    setGameTimer(0);
    setIsGameTimerRunning(true);
  };

  const handleQuitGame = useCallback(() => {
    navigate(routeHelper.MAINPAGE.PATH);
  }, [navigate]);

  const countUnmatchedCards = useCallback(async () => {
    console.log({ cards });
    if (turns > 0 && cards.length > 0) {
      const unmatchedCards = cards.filter((card) => !card.matched);
      console.log(unmatchedCards);
      if (unmatchedCards.length > 0) {
        return;
      } else {
        setGameMode("math");
        await fetchQuestionData();
      }
    }
  }, [cards, turns]);

  useEffect(() => {
    shuffleCards();
  }, [shuffleCards]);

  useEffect(() => {
    countUnmatchedCards();
  }, [countUnmatchedCards, cards]);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (turns === 0) {
      alert("You are out of turns. Game Over!");
      navigate(routeHelper.MAINPAGE.PATH);
    }
  }, [turns, navigate]);

  useEffect(() => {
    let interval;
    if (isGameTimerRunning) {
      interval = setInterval(() => {
        setGameTimer((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            alert("Time's up! Game Over.");
            navigate(routeHelper.MAINPAGE.PATH);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isGameTimerRunning, navigate]);

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
      handleQuitGame,
      gameMode,
      questionData,
      setUserAnswer,
      handleUserAnswerSubmit,
      userAnswerMessage,
      isQuestionLoading,
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
      handleQuitGame,
      gameMode,
      questionData,
      setUserAnswer,
      handleUserAnswerSubmit,
      userAnswerMessage,
      isQuestionLoading,
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
