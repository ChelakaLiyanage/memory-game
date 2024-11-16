import { useNavigate } from "react-router-dom";

import LeaderboardProvider from "../../providers/LeaderboardProvider";

import LeaderboardTable from "../../components/leaderboard/LeaderboardTable";
import LeaderboardFilter from "../../components/leaderboard/LeaderboardFilter";

import { routeHelper } from "../../helpers/routeHelper";

const Leaderboard = () => {
  const navigate = useNavigate();
  return (
    <LeaderboardProvider>
      <div>
        <h1>Leaderboard</h1>
        <button onClick={() => navigate(routeHelper.MAINPAGE.PATH)}>
          Home
        </button>
        <LeaderboardFilter />
        <LeaderboardTable />
      </div>
    </LeaderboardProvider>
  );
};

export default Leaderboard;
