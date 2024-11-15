import GamePageProvider from "../../providers/GamePageProvider";

import CardGame from "../../components/CardGame/CardGame";
import MathGame from "../../components/MathGame/MathGame";
import GameTimer from "../../components/GameTimer/GameTimer";

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
