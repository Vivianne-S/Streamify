import Header from "../components/Header";
import CartList from "../components/CartList";
import "../CartPage.css";

export default function CartPage() {
  return (
    <div className="cart-page">
      <Header />
      <div className="cart-layout">
        <CartList />
       
      </div>
    </div>
  );
}
