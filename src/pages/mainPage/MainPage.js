import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import { useAuthenticationContext } from "../../providers/AuthenticationProvider";

import { routeHelper } from "../../helpers/routeHelper";

import "../../css/style.css";

const MainPage = () => {
  const navigate = useNavigate();
  const { logOut } = useAuthenticationContext();
  const [difficulty, setDifficulty] = useState("normal");

  const startGame = () => {
    navigate(routeHelper.GAMEPAGE.PATH, { state: { difficulty } });
  };

  return (
    <div className="mainPage-container">
      <h1>Memory Game</h1>
      <div>
        <label>Select difficulty</label>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          sx={{
            m: 2,
            minWidth: 150,
            color: "white",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ffffff", // Outline color
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#bdbdbd", // Hover border color
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#bdbdbd", // Focused border color
            },
          }}
        >
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </Select>
      </div>
      <Button variant="outlined" className="button-white" onClick={startGame}>
        New Game
      </Button>
      <Button
        variant="outlined"
        className="button-white"
        onClick={() => navigate(routeHelper.LEADERBOARD.PATH)}
      >
        Leaderboards
      </Button>
      <Button variant="outlined" className="button-white" onClick={logOut}>
        Sign Out
      </Button>
    </div>
  );
};

export default MainPage;
