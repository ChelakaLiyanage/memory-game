import React from "react";
import { useNavigate } from "react-router-dom";

import { routeHelper } from "../../helpers/routeHelper";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(routeHelper.GAMEPAGE.PATH)}>
        New Game
      </button>
      <button>How To Play</button>
      <button>Leaderboards</button>
    </div>
  );
};

export default MainPage;
