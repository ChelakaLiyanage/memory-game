import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { getLeaderboardData } from "../apis/leaderboard";

export const LeaderboardContext = createContext();

const LeaderboardProvider = (props) => {
  const location = useLocation();

  const { difficulty } = location.state || { difficulty: "easy" };
  const { children } = props;

  const [leaderboardFilter, setLeaderboardFilter] = useState(difficulty);
  const [leaderboardData, setLeaderboardData] = useState([]);

  const fetchLeaderboardData = async (difficulty) => {
    const data = await getLeaderboardData(difficulty);

    setLeaderboardData(data);
  };

  useEffect(() => {
    fetchLeaderboardData(leaderboardFilter);
  }, [leaderboardFilter]);

  const values = useMemo(
    () => ({ leaderboardFilter, setLeaderboardFilter, leaderboardData }),
    [leaderboardFilter, setLeaderboardFilter, leaderboardData]
  );

  return (
    <LeaderboardContext.Provider value={values}>
      {children}
    </LeaderboardContext.Provider>
  );
};

export const useLeaderboardContext = () => {
  return useContext(LeaderboardContext);
};

export default LeaderboardProvider;
