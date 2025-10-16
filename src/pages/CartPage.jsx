import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CartList from "../components/CartList";
import CheckoutForm from "../components/CheckoutForm";
import backIcon from "../assets/backicone.png";
import "../style/CartPage.css";

export default function CartPage() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="cart-page">
      <Header />
      <img 
        src={backIcon} 
        alt="Back" 
        className="back-icon-clickable"
        onClick={handleBackClick}
      />
      <div className="cart-layout">
        <CartList />
       <CheckoutForm/>
      </div>
    </div>
  );
}
