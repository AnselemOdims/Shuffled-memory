import styled from 'styled-components';

const Container = styled.div`
  border: solid 2px blue;
  position: relative;
  cursor: pointer;
  border-radius: 5px;

  > div {
    > img:nth-of-type(1) {
      position: absolute;
      transform: rotateY(90deg);
      transition: transform ease-out 0.5s 0.1s;
    }

    &.flipped {
      > img:nth-of-type(1) {
      transform: rotateY(0deg);
      transition: transform ease-out 0.5s 0.1s;
    }
    }
  } 
`;

const Card = ({ card, handleClick, flipped }) => {
  return ( 
    <Container>
      <div className={flipped ? 'flipped' : ''}>
        <img src={card.src} alt="front image"/>
        <img src="/img/cover.png" alt="back image" onClick={() => handleClick(card)} />
      </div>
    </Container>
   );
}
 
export default Card;