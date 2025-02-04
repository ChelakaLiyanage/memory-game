import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import LeaderboardProvider from "../../providers/LeaderboardProvider";

import LeaderboardTable from "../../components/leaderboard/LeaderboardTable";
import LeaderboardFilter from "../../components/leaderboard/LeaderboardFilter";

import { routeHelper } from "../../helpers/routeHelper";

import "../../css/style.css";

const Leaderboard = () => {
  const navigate = useNavigate();
  return (
    <LeaderboardProvider>
      <div
        style={{
          width: "1000px",
          border: "2px solid #fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: "25px",
          backgroundColor: "rgba(30, 30, 30, 0.4)",
          backdropFilter: "blur(6px)",
        }}
      >
        <h1>Leaderboard</h1>
        <Button
          variant="outlined"
          className="button-white"
          onClick={() => navigate(routeHelper.MAINPAGE.PATH)}
        >
          Home
        </Button>
        <LeaderboardFilter />
        <LeaderboardTable />
      </div>
    </LeaderboardProvider>
  );
};

export default Leaderboard;
