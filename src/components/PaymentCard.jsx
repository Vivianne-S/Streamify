export default function PaymentCard() {
  return (
    <div className="payment-card">
      <h3>Nytt kort</h3>



      <input type="text" placeholder="Kortnummer" defaultValue="4925 0000 0000 0004" />
      <div className="card-row">
        <input type="text" placeholder="MM/ÅÅ" defaultValue="02/25" />
        <input type="text" placeholder="CVC" defaultValue="123" />
      </div>
      <input type="text" placeholder="Kortinnehavarens namn" defaultValue="Snurre Sprätt" />
    </div>
  );
}
