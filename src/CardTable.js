import React, { useState, useEffect } from "react";
import DisplayCard from "./DisplayCard";
import axios from "axios";

const BASE_URL = "http://deckofcardsapi.com/api/deck/";

/**this calls the Deck of Cards API to get a deck of cards and display them one
 * at a time on the table
 *
 * props: none
 *
 * state:
 *  deck of cards:
 *  card: {  "image": "http://deckofcardsapi.com/static/img/KH.png",
            "value": "KING",
            "suit": "HEARTS",
            "code": "KH" }
 *
 * App -> CardTable -> DisplayCard
 */

function CardTable() {
  const [deckOfCardsId, setDeckOfCardsId] = useState({ deckId: null, isLoading: true });
  const [card, setCard] = useState({ card: null, isCard: false, cardsRemain: 52 });

  useEffect(function fetchDeckOfCardsWhenMounted() {
    async function fetchDeckOfCards() {
      const deckResult = await axios.get(`${BASE_URL}new/shuffle/?deck_count=1`);

      setDeckOfCardsId({
        deckId: deckResult.data.deck_id,
        isLoading: false
      });
    }
    fetchDeckOfCards();
  }, []);

  async function fetchCard() {
    const newCard = await axios.get(`${BASE_URL}${deckOfCardsId.deckId}/draw/?count=1`);
    setCard({
      card: newCard.data.cards[0],
      isCard: true,
      cardsRemain: newCard.data.remaining,
    });
  }

  if (deckOfCardsId.isLoading) return <p>Shuffling Deck...</p>;

  return (
    <div className="CardTable">
      {card.cardsRemain > 0
        ? <button onClick={fetchCard}>Gimme a Card</button>
        : <p>No cards remaining</p>}
      {card.isCard && <DisplayCard card={card.card} />}
    </div>

  );
}

export default CardTable;