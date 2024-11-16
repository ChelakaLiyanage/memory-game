import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthenticationContext } from "../../providers/AuthenticationProvider";

import { routeHelper } from "../../helpers/routeHelper";

const MainPage = () => {
  const navigate = useNavigate();
  const { logOut } = useAuthenticationContext();
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
      <button onClick={logOut}>Sign Out</button>
    </div>
  );
};

export default MainPage;
