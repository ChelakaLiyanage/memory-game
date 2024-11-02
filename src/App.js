import { useState } from "react";
import "./App.css";

const cardImages = [
  { src: "/img/BunnyHat.png" },
  { src: "/img/Coin.png" },
  { src: "/img/MagicBall.png" },
  { src: "/img/Scroll.png" },
  { src: "/img/Shield.png" },
  { src: "/img/Sword.png" },
];
function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    console.log(cards, turns);
  };

  return (
    <div className="App">
      <h1> Memory Game </h1>
      <button onClick={shuffleCards}>New game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <div>
              <img className="front" src={card.src} alt="card-front" />
              <img className="back" src="/img/Cover.png" alt="card-back" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
