import { useState } from 'react';
import './App.css';

const magicCards = [
  {src: '/img/cover.png'},
  {src: '/img/helmet-1.png'},
  {src: '/img/potion-1.png'},
  {src: '/img/ring-1.png'},
  {src: '/img/scroll-1.png'},
  {src: '/img/shield-1.png'},
  {src: '/img/sword-1.png'},
]
const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const shuffle = () => {
    const shuffledArr = [...magicCards, ...magicCards]
      .sort(()=> Math.random() - 0.5)
      .map(card=> ({...card, id: Math.random()}))
    setCards(shuffledArr);
    setTurns(0);
  }

  return (
    <div className="App">
      <h1>Shuffle Cards</h1>
      <button onClick={() => shuffle()}>Shuffle</button>
      <ul style={{display: 'flex', flexWrap: 'wrap'}}>
        {cards.map(card=> (
          <li key={card.id}><img src={card.src} /></li>
        ))}
      </ul>
    </div>
  );
}

export default App;
