import { useState } from "react";
import "./Card.css";

const Card = ({ name, image }) => {
  const [angle, setAngle] = useState(Math.random() * 90 - 45);
  const [xPos, setXPos] = useState(Math.random() * 40 - 20);
  const [yPos, setYPos] = useState(Math.random() * 40 - 20);

  const transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;

  return (
    <img
      style={{ transform }}
      className="Card"
      alt={name}
      src={image}
      onClick={() => {
        setAngle(Math.random() * 90 - 45);
        setXPos(Math.random() * 40 - 20);
        setYPos(Math.random() * 40 - 20);
      }}
    />
  );
};

export default Card;
