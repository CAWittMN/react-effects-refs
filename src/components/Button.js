import "./Button.css";

const Button = ({ onClick, text, color = "white" }) => (
  <button
    onClick={onClick}
    className="Button"
    style={{ backgroundColor: color }}
  >
    {text}
  </button>
);

export default Button;
