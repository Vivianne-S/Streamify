import Header from "../components/Header";
import CartList from "../components/CartList";
import CheckoutForm from "../components/CheckoutForm";
import "../CartPage.css";

export default function CartPage() {
  return (
    <div className="cart-page">
      <Header />
      <div className="cart-layout">
        <CartList />
       <CheckoutForm/>
      </div>
    </div>
  );
}
