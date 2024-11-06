import { useEffect, useState, useCallback } from "react";

import SingleCard from "../../components/SingleCard/SingleCard";

const cardImages = [
  { src: "/img/BunnyHat.png", matched: false },
  { src: "/img/Coin.png", matched: false },
  { src: "/img/MagicBall.png", matched: false },
  { src: "/img/Scroll.png", matched: false },
  { src: "/img/Shield.png", matched: false },
  { src: "/img/Sword.png", matched: false },
];

const GamePage = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  const countUnmatchedCards = useCallback(() => {
    if (turns !== 0) {
      const unmatchedCards = cards.filter((card) => !card.matched);
      if (unmatchedCards.length === 0) {
        console.log("No unmatched cards");
      }
    }
  }, [cards, turns]);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    countUnmatchedCards();
  }, [countUnmatchedCards]);

  return (
    <div>
      <h1> Memory Game </h1>
      <button onClick={shuffleCards}>New game</button>
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
    </div>
  );
};

export default GamePage;
