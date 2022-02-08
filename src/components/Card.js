import styled from 'styled-components';

const Container = styled.div`
  border: solid 5px red;
  position: relative;

  > div {
    > img:nth-of-type(1) {
      position: absolute;
      transform: rotateY(90deg);
    }

    &.flipped {
      > img:nth-of-type(1) {
      transform: rotateY(0deg);
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