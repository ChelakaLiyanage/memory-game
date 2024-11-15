import { useGamePageContext } from "../../providers/GamePageProvider";

const MathGame = (props) => {
  const {
    questionData,
    setUserAnswer,
    handleUserAnswerSubmit,
    userAnswerMessage,
    isGameLoading,
    gameMode,
  } = useGamePageContext();

  if (gameMode !== "math") {
    return null;
  }

  return (
    <>
      {isGameLoading && "Loading"}
      {!isGameLoading && questionData && (
        <>
          <img src={questionData.question} alt="question_img" />
          Answer{" "}
          <input
            type="number"
            onChange={(event) => setUserAnswer(event.target.value)}
          />
          <button onClick={handleUserAnswerSubmit}>Submit</button>
          {userAnswerMessage}
        </>
      )}
    </>
  );
};

export default MathGame;
