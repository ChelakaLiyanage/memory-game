import GamePageProvider from "../../providers/GamePageProvider";

import CardGame from "../../components/gamePage/cardGame/CardGame";
import MathGame from "../../components/gamePage/mathGame/MathGame";
import GameTimer from "../../components/gamePage/gameTimer/GameTimer";

const GamePage = () => {
  return (
    <GamePageProvider>
      <div>
        <CardGame />
        <MathGame />
        <GameTimer />
      </div>
    </GamePageProvider>
  );
};

export default GamePage;
