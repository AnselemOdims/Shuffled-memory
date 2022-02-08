import { useState, useEffect } from 'react';
import styled from 'styled-components';

import './App.css';
import Card from './components/Card';

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px 5px;
  margin-top: 20px;
`;

const magicCards = [
  {src: '/img/helmet-1.png', matched: false},
  {src: '/img/potion-1.png', matched: false},
  {src: '/img/ring-1.png', matched: false},
  {src: '/img/scroll-1.png', matched: false},
  {src: '/img/shield-1.png', matched: false},
  {src: '/img/sword-1.png', matched: false},
]

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const shuffle = () => {
    const shuffledArr = [...magicCards, ...magicCards]
      .sort(()=> Math.random() - 0.5)
      .map(card=> ({...card, id: Math.random()}))
    setCards(shuffledArr);
    setTurns(0);
  }

  const handleClick = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  const resetChoice = () => {
    setChoiceOne(null);
    setChoiceTwo(null)
  }

  useEffect(() => {
    if(choiceOne && choiceTwo){
      if(choiceOne.src === choiceTwo.src){
        setCards(prevState => (
          prevState.map(card => {
            return card.src === choiceOne.src ? { ...card, matched: true} : card;
          })
        ))
        resetChoice();
      }
      else {
        resetChoice();
      }
    }

  }, [choiceOne, choiceTwo])

  return (
    <div className="App">
      <h1>Shuffle Cards</h1>
      <button onClick={() => shuffle()}>Shuffle</button>
      <List>
        {cards.map(card => (
          <Card 
            key={card.id} 
            card={card} 
            handleClick={handleClick}
            flipped={ card===choiceOne || card===choiceTwo || card.matched }
          />
        ))}
      </List>
    </div>
  );
}

export default App;
