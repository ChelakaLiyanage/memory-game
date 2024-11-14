import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { routeHelper } from "../../helpers/routeHelper";

const MainPage = () => {
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState("normal");

  const startGame = () => {
    navigate(routeHelper.GAMEPAGE.PATH, { state: { difficulty } });
  };

  return (
    <div>
      <h1>Memory Game</h1>
      <div>
        <label>Select difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="normal">Normal</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button onClick={startGame}>New Game</button>
      <button>How To Play</button>
      <button>Leaderboards</button>
    </div>
  );
};

export default MainPage;
