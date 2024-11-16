import { useGamePageContext } from "../../../providers/GamePageProvider";

import { formatTime } from "../../../utils/utils";

const GameTimer = () => {
  const { gameTimer, isGameTimerRunning } = useGamePageContext();

  if (!isGameTimerRunning) {
    return null;
  }

  return <p> Time : {formatTime(gameTimer)} </p>;
};

export default GameTimer;
