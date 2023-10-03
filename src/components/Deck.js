import { useState, useEffect, useRef } from "react";
import Card from "./Card";
import Button from "./Button";
import "./Deck.css";
import axios from "axios";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

const Deck = () => {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);
  const [autoDraw, setAutoDraw] = useState(false);
  const timerRef = useRef(null);
  const [hasRemaining, setHasRemaining] = useState(true);

  useEffect(() => {
    async function getData() {
      let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
      setDeck(deck.data);
      setHasRemaining(true);
    }
    getData();
  }, [setDeck]);

  const getNewDeck = async () => {
    setAutoDraw(false);
    setDrawn([]);
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    setDeck(deck.data);
    setHasRemaining(true);
  };

  useEffect(() => {
    async function getCard() {
      const { deck_id } = deck;
      try {
        const cardUrl = `${API_BASE_URL}/${deck_id}/draw/`;
        let cardRes = await axios.get(cardUrl);

        if (cardRes.data.remaining === 0) {
          setHasRemaining(false);
          setAutoDraw(false);
        }

        const card = cardRes.data.cards[0];

        setDrawn((d) => [
          ...d,
          {
            id: card.code,
            name: card.suit + " " + card.value,
            image: card.image,
          },
        ]);
      } catch (err) {
        alert(err);
      }
    }

    if (autoDraw && !timerRef.current) {
      timerRef.current = setInterval(async () => {
        await getCard();
      }, 250);
    }

    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
  });

  const toggleAutoDraw = () => {
    setAutoDraw((auto) => !auto);
  };

  const cards = drawn.map((c) => (
    <Card key={c.id} name={c.name} image={c.image} />
  ));

  return (
    <div className="Deck-area">
      <div className="Deck-buttons">
        {deck && hasRemaining ? (
          <Button
            text={autoDraw ? "Stop Drawing!" : "Start Drawing!"}
            color={autoDraw ? "red" : "green"}
            onClick={toggleAutoDraw}
          ></Button>
        ) : (
          <h1>No cards remaining!</h1>
        )}
        <div className="Deck-buttons">
          <Button onClick={getNewDeck} text="New Deck"></Button>
        </div>
      </div>
      <div className="Deck-cardarea">{cards}</div>
    </div>
  );
};

export default Deck;
