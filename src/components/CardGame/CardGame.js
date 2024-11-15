import { useGamePageContext } from "../../providers/GamePageProvider";

import SingleCard from "../singleCard/SingleCard";

const CardGame = () => {
  const {
    cards,
    turns,
    choiceOne,
    choiceTwo,
    disabled,
    handleChoice,
    handleQuitGame,
    gameMode,
  } = useGamePageContext();

  if (gameMode !== "card") {
    return null;
  }

  return (
    <>
      <h1> Memory Game </h1>
      <button onClick={handleQuitGame}>Quit Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p> Turns : {turns} </p>
    </>
  );
};

export default CardGame;
