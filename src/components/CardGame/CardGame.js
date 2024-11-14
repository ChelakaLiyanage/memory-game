import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useGamePageContext } from "../../providers/GamePageProvider";

import SingleCard from "../SingleCard/SingleCard";

import { routeHelper } from "../../helpers/routeHelper";

const cardImages = [
  { src: "/img/BunnyHat.png", matched: false },
  { src: "/img/Coin.png", matched: false },
  { src: "/img/MagicBall.png", matched: false },
  { src: "/img/Scroll.png", matched: false },
  { src: "/img/Shield.png", matched: false },
  { src: "/img/Sword.png", matched: false },
];

const CardGame = (props) => {
  const navigate = useNavigate();
  const {
    cards,
    setCards,
    turns,
    choiceOne,
    choiceTwo,
    disabled,
    setDisabled,
    shuffleCards,
    resetTurn,
    handleChoice,
    resetTimer,
  } = useGamePageContext();

  useEffect(() => {
    shuffleCards();
  }, []);

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
    if (turns == 0) {
      alert("You are out of turns. Game Over!");
      navigate(routeHelper.MAINPAGE.PATH);
    }
  }, [turns]);

  return (
    <>
      <h1> Memory Game </h1>
      <button
        onClick={() => {
          shuffleCards();
          resetTimer();
        }}
      >
        New game
      </button>
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
