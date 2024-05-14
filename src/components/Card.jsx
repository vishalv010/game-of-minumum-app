import { FaHeart } from "react-icons/fa";
import { ImClubs, ImSpades } from "react-icons/im";
import { FaDiamond } from "react-icons/fa6";

export const Card = ({card, type, onCardClick}) => {
    let cardType;
    switch(card.suit) {
        case 'Hearts':
            cardType = <FaHeart />
            break;
        case 'Spades':
            cardType = <ImSpades />
            break;
        case 'Clubs':
            cardType = <ImClubs />
            break;
        default:
            cardType = <FaDiamond/>
    }
    return (
      <div
        key={`${card.rank}_${card.suit}`}
        style={{
          border: '1px solid black',
          borderRadius: '5px',
          padding: '5px',
          margin: '5px',
          backgroundColor: 'white',
          color: card.color,
          width: '50px',
          height: '100px',
          textAlign: 'center',
          display: 'inline-block',
          cursor: type === 'player' ? 'pointer': ''
        }}
        onClick={() => type==='player' && onCardClick(card)}
      >
        <div>{card.rank}</div>
        <div>{cardType}</div>
      </div>
    );
}