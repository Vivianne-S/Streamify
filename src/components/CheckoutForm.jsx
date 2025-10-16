import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import PaymentCard from "./PaymentCard";

export default function CheckoutForm() {
  const navigate = useNavigate();
  const { saveCustomerInfo } = useCart();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "Sverige",
    email: "",
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    cardholderName: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = () => {
    const customerInfo = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      address: `${formData.address}, ${formData.city}, ${formData.country}`,
      email: formData.email,
      cardNumber: paymentData.cardNumber.replace(/\s/g, "").slice(-4),
    };
    
    saveCustomerInfo(customerInfo);
    navigate("/confirmation");
  };

  return (
    <section className="checkout-form">
      <div className="checkout-inner">
        <div className="customer-form">
          <h3>Kunduppgifter</h3>
          <div className="form-grid">
            <input 
              type="text" 
              name="firstName"
              placeholder="Förnamn" 
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <input 
              type="text" 
              name="lastName"
              placeholder="Efternamn"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <input 
              type="text" 
              name="address"
              placeholder="Adress"
              value={formData.address}
              onChange={handleInputChange}
            />
            <input 
              type="text" 
              name="city"
              placeholder="Stad"
              value={formData.city}
              onChange={handleInputChange}
            />
            <input 
              type="text" 
              name="country"
              placeholder="Land" 
              value={formData.country}
              onChange={handleInputChange}
            />
            <input 
              type="email" 
              name="email"
              placeholder="E-post"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="checkout-details">
          <PaymentCard paymentData={paymentData} setPaymentData={setPaymentData} />
          <div className="checkout-summary">
            <button className="checkout-btn" onClick={handleCheckout}>CHECKOUT</button>
          </div>
        </div>
      </div>
    </section>
  );
}
