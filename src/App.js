import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Card from './components/Card';

const Container = styled.div`
  text-align: center;
  margin: 0 auto;
  max-width: 65%;
  background: #EFEFEF;

  > div:nth-of-type(1) {
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    background: #7e5588c7;
    padding: 0 50px;
    color: #fff;
    border-radius: 2  px;

    > div:nth-of-type(1) {
      display:flex;
      justify-content: space-between;
      align-items: center;

      > button {
        border: none;
        background: #fff;
        padding: 12px;
        font-family: 'Ubuntu';
        cursor: pointer;
        color: #371E43;
        border-radius: 5px;

        &:hover {
          background: #371E43;
          color: #fff;
        }
      }
    }
  }

  > div:nth-of-type(2) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px 5px;
    margin-top: 20px;
  }
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
  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const shuffle = () => {
    const shuffledArr = [...magicCards, ...magicCards]
      .sort(()=> Math.random() - 0.5)
      .map(card=> ({...card, id: Math.random()}))
    setCards(shuffledArr);
    setRight(0);
    setWrong(0);
  }

  const handleClick = (card) => {
    if(wrong>=10){
      console.log('End game')
    } else {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
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
        setRight(prevState=> prevState + 1 );
        resetChoice();
      }
      else {
        setWrong(prevState=> prevState + 1 );
        setTimeout(() => resetChoice(), 1000)
      }
    }
    return () => clearTimeout(() => {})
  }, [choiceOne, choiceTwo, setWrong])

  return (
    <Container>
      <div>
        <div>
          <h1>Shuffle Cards</h1>
          <p>Correct: {right}</p>
          <p>Wrong: {wrong}</p>
          <button onClick={() => shuffle()}>{ wrong>=10 ? 'Restart Game' : 'New Game'}</button>
        </div>
        <div><p>You only get 10 wrongs before you can restart game</p></div>
      </div>
      <div>
        {cards.map(card => (
          <Card 
            key={card.id} 
            card={card} 
            handleClick={handleClick}
            flipped={ card===choiceOne || card===choiceTwo || card.matched }
          />
        ))}
      </div>
    </Container>
  );
}

export default App;
