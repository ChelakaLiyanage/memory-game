import GamePageProvider from "../../providers/GamePageProvider";

import CardGame from "../../components/cardGame/CardGame";
import MathGame from "../../components/mathGame/MathGame";
import GameTimer from "../../components/gameTimer/GameTimer";

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
