const MathGame = (props) => {
  const {
    questionData,
    setUserAnswer,
    handleUserAnswerSubmit,
    userAnswerMessage,
  } = props;

  return (
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
  );
};

export default MathGame;
