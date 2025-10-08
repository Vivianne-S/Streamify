import PaymentCard from "./PaymentCard";

export default function CheckoutForm() {
  return (
    <section className="checkout-form">
      <div className="checkout-inner">
        <div className="customer-form">
          <h3>Kunduppgifter</h3>
          <div className="form-grid">
            <input type="text" placeholder="Förnamn" />
            <input type="text" placeholder="Efternamn" />
            <input type="text" placeholder="Adress" />
            <input type="text" placeholder="Stad" />
            <input type="text" placeholder="Land" defaultValue="Sverige" />
            <input type="email" placeholder="E-post" />
          </div>
        </div>

        <div className="checkout-details">
          <PaymentCard />
          <div className="checkout-summary">
            <p>
              <span>TOTAL:</span>
              <span>14.97 $</span>
            </p>
            <button className="checkout-btn">CHECKOUT</button>
          </div>
        </div>
      </div>
    </section>
  );
}
