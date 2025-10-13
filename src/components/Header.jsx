import { useNavigate } from "react-router-dom";
import logo from "../assets/streamify-logo.png";

export default function Header() {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <header className="streamify-header">
      <img src={logo} alt="Streamify logo" className="streamify-logo" />
      <div className="cart-icon-container" onClick={handleCartClick}>
        <span className="cart-icon">🛒</span>
      </div>
    </header>
  );
}