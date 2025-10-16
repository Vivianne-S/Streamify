import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CartList from "../components/CartList";
import CheckoutForm from "../components/CheckoutForm";
import "../style/CartPage.css";

export default function CartPage() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="cart-page">
      <Header />
      <button className="back-button" onClick={handleBackClick}>
        ←
      </button>
      <div className="cart-layout">
        <CartList />
       <CheckoutForm/>
      </div>
    </div>
  );
}
