export default function PaymentCard({ paymentData, setPaymentData }) {
  const handleInputChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="payment-card">
      <h3>Nytt kort</h3>

      <input 
        type="text" 
        name="cardNumber"
        placeholder="Kortnummer" 
        value={paymentData.cardNumber}
        onChange={handleInputChange}
      />
      <div className="card-row">
        <input 
          type="text" 
          name="expiryDate"
          placeholder="MM/ÅÅ" 
          value={paymentData.expiryDate}
          onChange={handleInputChange}
        />
        <input 
          type="text" 
          name="cvc"
          placeholder="CVC" 
          value={paymentData.cvc}
          onChange={handleInputChange}
        />
      </div>
      <input 
        type="text" 
        name="cardholderName"
        placeholder="Kortinnehavarens namn" 
        value={paymentData.cardholderName}
        onChange={handleInputChange}
      />
    </div>
  );
}
