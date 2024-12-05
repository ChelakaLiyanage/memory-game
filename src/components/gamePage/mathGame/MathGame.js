import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

import { useGamePageContext } from "../../../providers/GamePageProvider";

const MathGame = () => {
  const {
    questionData,
    userAnswer,
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
          <div
            style={{
              width: "750px",
              height: "400px",
              alignContent: "center",
            }}
          >
            <img src={questionData.question} alt="question_img" />
          </div>
          Answer{" "}
          <TextField
            sx={{ m: 1 }}
            id="outlined-basic"
            label="Answer"
            variant="outlined"
            type="number"
            value={userAnswer}
            onChange={(event) => setUserAnswer(event.target.value)}
          />
          <Button variant="outlined" onClick={handleUserAnswerSubmit}>
            Submit
          </Button>
          {userAnswerMessage}
        </>
      )}
    </>
  );
};

export default MathGame;
