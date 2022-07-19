import React from "react";

/** This displays one card
 *
 * props: card : {
            "image": "http://deckofcardsapi.com/static/img/KH.png",
            "value": "KING",
            "suit": "HEARTS",
            "code": "KH"
        },
 *
 * state: none
 *
 * CardTable -> DisplayCard
 */

function DisplayCard({ card }) {
  return (
    <div key={card.code} className="DisplayCard">
      <img src={card.image} alt={`${card.value} of ${card.suit}`} />
    </div>
  );
}

export default DisplayCard;