import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { useLeaderboardContext } from "../../providers/LeaderboardProvider";

const LeaderboardFilter = () => {
  const { leaderboardFilter, setLeaderboardFilter } = useLeaderboardContext();

  return (
    <div>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={leaderboardFilter}
        onChange={(e) => setLeaderboardFilter(e.target.value)}
        sx={{
          m: 1,
          minWidth: 150,
          color: "white",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#bdbdbd",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#bdbdbd",
          },
        }}
      >
        <MenuItem value="easy">Easy</MenuItem>
        <MenuItem value="normal">Normal</MenuItem>
        <MenuItem value="hard">Hard</MenuItem>
      </Select>
    </div>
  );
};

export default LeaderboardFilter;
