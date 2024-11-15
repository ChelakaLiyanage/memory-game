import { useGamePageContext } from "../../providers/GamePageProvider";

import { formatTime } from "../../utils/utils";

const GameTimer = () => {
  const { gameTimer } = useGamePageContext();

  return <p> Time : {formatTime(gameTimer)} </p>;
};

export default GameTimer;
