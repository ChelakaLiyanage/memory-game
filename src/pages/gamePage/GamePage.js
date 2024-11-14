import { useEffect, useState, useCallback } from "react";

import { useLocation } from "react-router-dom";

import GamePageProvider from "../../providers/GamePageProvider";

import CardGame from "../../components/CardGame/CardGame";
import MathGame from "../../components/MathGame/MathGame";

import { getQuestion } from "../../apis/gamePage";

const GamePage = () => {
  const location = useLocation();
  const { difficulty } = location.state || { difficulty: "normal" };

  const [isQuestionLoading, setIsQuestionLoading] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const [userAnswer, setUserAnswer] = useState(0);
  const [userAnswerMessage, setUserAnswerMessage] = useState("");

  const [gameTimer, setGameTimer] = useState(
    difficulty === "hard" ? 30 : difficulty === "normal" ? 15 : 90
  );
  const [isGameTimerRunning, setIsGameTimerRunning] = useState(true);

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

  const handleUserAnswerSubmit = () => {
    if (userAnswer) {
      if (parseInt(userAnswer) === questionData.solution) {
        setQuestionData(null);
        // shuffleCards();
        setUserAnswerMessage("");
        // resetTimer();
      } else {
        setUserAnswerMessage("Your Answer is incorrect");
      }
    } else {
      setUserAnswerMessage("Please Enter a valid answer");
    }
  };

  // const countUnmatchedCards = useCallback(async () => {
  //   if (turns <= 0) {
  //     alert("Out of turns! Game Over.");
  //     return;
  //   } else {
  //     const unmatchedCards = cards.filter((card) => !card.matched);
  //     console.log(unmatchedCards);
  //     if (unmatchedCards.length > 0) {
  //       return;
  //     } else {
  //       await fetchQuestionData();
  //     }
  //   }
  // }, [cards]);

  const resetTimer = () => {
    setGameTimer(0);
    setIsGameTimerRunning(true);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // useEffect(() => {
  //   countUnmatchedCards();
  // }, [countUnmatchedCards]);

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

  return (
    <GamePageProvider>
      <div>
        {!questionData ? (
          <CardGame />
        ) : (
          <>
            {isQuestionLoading ? (
              "Loading..."
            ) : (
              <MathGame
                questionData={questionData}
                setUserAnswer={setUserAnswer}
                handleUserAnswerSubmit={handleUserAnswerSubmit}
                userAnswerMessage={userAnswerMessage}
              />
            )}
          </>
        )}
        <p> Time : {formatTime(gameTimer)} </p>
      </div>
    </GamePageProvider>
  );
};

export default GamePage;
