import { useLeaderboardContext } from "../../providers/LeaderboardProvider";

const LeaderboardTable = () => {
  const { leaderboardData } = useLeaderboardContext();

  return (
    <div style={{ width: "100%", justifyContent: "center" }}>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.length > 0 ? (
            leaderboardData.map((leader, index) => (
              <tr key={leader.gameId}>
                <td>{index + 1}</td>
                <td>{leader.userName}</td>
                <td>{leader.score}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td> no data </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
