import { useLeaderboardContext } from "../../providers/LeaderboardProvider";

const LeaderboardFilter = () => {
  const { leaderboardFilter, setLeaderboardFilter } = useLeaderboardContext();

  return (
    <div>
      <select
        value={leaderboardFilter}
        onChange={(e) => setLeaderboardFilter(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="normal">Normal</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
};

export default LeaderboardFilter;
