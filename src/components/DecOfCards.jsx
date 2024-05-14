import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { suits, cardRanks } from "../constants";

const DeckOfCards = () => {
  const [deck, setDeck] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [remainingCards, setRemainingCards] = useState([]);
  const [option1, setOption1] = useState([]);
  const [option2, setOption2] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const initializeDeck = () => {
      setGameOver(false);
      const newDeck = [];
      for (const suit of suits) {
        for (const rank of cardRanks) {
          const color =
            suit === "Hearts" || suit === "Diamonds" ? "red" : "black";
          newDeck.push({ rank, suit, color });
        }
      }
      setDeck(newDeck);
      setRemainingCards(newDeck);
    };
    initializeDeck();
  }, []);


  const dealCards = () => {
    setGameOver(false);
    const newPlayerCards = [];
    const updatedRemainingCards = [...deck];
    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(
        Math.random() * updatedRemainingCards.length
      );
      newPlayerCards.push(updatedRemainingCards[randomIndex]);
      // Remove the dealt card from the remaining cards
      updatedRemainingCards.splice(randomIndex, 1);
    }
    setRemainingCards(updatedRemainingCards);
    setPlayerCards(newPlayerCards);
    setOption1([]);
    setOption2([]);
  };

  const handleCardClick = (card) => {
    const sameCards = playerCards.filter((el) => el.rank === card.rank);
    setOption1(sameCards);
    const ranks = new Set(cardRanks);
    const consecutiveCards = new Set();

    for (const card of playerCards) {
      const rank = card.rank;
      if (ranks.has(rank)) {
        consecutiveCards.add(card);
      }
    }

    // Convert ranks to integers for easier comparison
    const rankValues = {
      Ace: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      10: 10,
      Jack: 11,
      Queen: 12,
      King: 13,
    };

    // Sort the ranks
    const sortedRanks = [...consecutiveCards];
    const x = [card];
    sortedRanks.sort((a, b) => rankValues[a.rank] - rankValues[b.rank]);
    const index = sortedRanks.findIndex(
      (el) => el.rank === card.rank && el.suit === card.suit
    );
    let l = sortedRanks[index];
    for (let i = index; i >= 0; i--) {
      if (rankValues[l.rank] - rankValues[sortedRanks[i].rank] === 1) {
        x.push(sortedRanks[i]);
        l = sortedRanks[i];
      }
    }
    let r = sortedRanks[index];
    for (let j = index; j < sortedRanks.length; j++) {
      if (rankValues[sortedRanks[j].rank] - rankValues[r.rank] === 1) {
        x.push(sortedRanks[j]);
        r = sortedRanks[j];
      }
    }
    setOption2(x);
  };

  const renderDeck = (cards, type) => {
    return (
      <div>
        {cards.map((card, index) => {
          return (
            <div key={index} style={{ display: "inline-block" }}>
              <Card card={card} type={type} onCardClick={handleCardClick} />
            </div>
          );
        })}
      </div>
    );
  };

  const addLastCardtoPlayerCards = () => {
    let lastElement;
    if (remainingCards.length >= 1) {
      setRemainingCards((rem) => {
        const newOne = [...rem];
        lastElement = newOne.pop();
        return newOne;
      });
      setPlayerCards((prev) => {
        const newCards = [...prev];
        newCards.push(lastElement);
        return newCards;
      });
      setOption1([]);
      setOption2([]);
    } else {
      setGameOver(true);
      setOption1([]);
      setOption2([]);
    }
  };

  const handleOptionSelect = (option) => {
    if (option === "option1") {
      setPlayerCards((prev) => {
        let newCopy = [...prev];
        for (let i of option1) {
          newCopy = newCopy.filter((el) => el.rank !== i.rank);
        }
        return newCopy;
      });
      
      addLastCardtoPlayerCards();
    } else {
      setPlayerCards((prev) => {
        let newCopy = [...prev];
        for (let i of option2) {
          const elementIndex = newCopy.findIndex(
            (el) => el.rank === i.rank && el.suit === i.suit
          );
          newCopy.splice(elementIndex, 1);
        }
        return newCopy;
      });
      addLastCardtoPlayerCards();
    }  
  };

  const optionStyle = {
    border: "1px solid black",
    borderRadius: "2px",
    width: "40%",
    cursor: "pointer",
  };

  return (
    <div>
      <h2>Remaining Cards:</h2>
      <div>{renderDeck(remainingCards, "remaining")}</div>
      <button onClick={dealCards}>Deal Cards</button>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {option1.length > 0 && (
          <div
            style={optionStyle}
            onClick={() => handleOptionSelect("option1")}
          >
            <h2>Option 1</h2>
            {renderDeck(option1, "option1")}
          </div>
        )}
        {option2.length > 0 && (
          <div
            style={optionStyle}
            onClick={() => handleOptionSelect("option2")}
          >
            <h2>Option 2</h2>
            {renderDeck(option2, "option2")}
          </div>
        )}
      </div>
      {gameOver ? (
        <p>Please click on Deal Cards Button to start</p>
      ) : (
        <>
          {" "}
          <h2>Player's Cards:</h2>
          <div>{renderDeck(playerCards, "player")}</div>
        </>
      )}
    </div>
  );
};

export default DeckOfCards;
