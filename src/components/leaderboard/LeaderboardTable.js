import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useLeaderboardContext } from "../../providers/LeaderboardProvider";

const LeaderboardTable = () => {
  const { leaderboardData } = useLeaderboardContext();

  return (
    <div style={{ width: "100%", justifyContent: "center" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Rank</TableCell>
              <TableCell align="center">Player Name</TableCell>
              <TableCell align="center">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboardData.length > 0 ? (
              leaderboardData.map((leader, index) => (
                <TableRow key={leader.gameId}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{leader.userName}</TableCell>
                  <TableCell align="center">{leader.score}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center"> no data </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LeaderboardTable;
