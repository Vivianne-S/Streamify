import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import "../style/ConfirmationPage.css";

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const { cartItems, customerInfo } = useCart();

  const total = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0).toFixed(2);

  const handleBackClick = () => {
    navigate("/cart");
  };

  return (
    <div className="confirmation-page">
      <Header />
      <div className="confirmation-container">
        <button className="back-button" onClick={handleBackClick}>
          ←
        </button>

        <h1 className="confirmation-title">✓ Order Confirmed!</h1>
        <p className="confirmation-subtitle">
          Thank you for your purchase. Your order has been successfully processed.
        </p>

        <div className="confirmation-content">
          <div className="confirmation-left">
            <div className="confirmation-movies">
              {cartItems.map((movie) => (
                <div className="confirmation-movie-item" key={movie.id}>
                  <span className="confirmation-movie-title">{movie.title}</span>
                  <span className="confirmation-movie-price">{movie.price} $</span>
                </div>
              ))}
            </div>
          </div>

          <div className="confirmation-divider"></div>

          <div className="confirmation-right">
            <div className="confirmation-info">
              <div className="confirmation-info-item">
                <span className="confirmation-label">Namn:</span>
                <span className="confirmation-value">{customerInfo?.name || "N/A"}</span>
              </div>
              <div className="confirmation-info-item">
                <span className="confirmation-label">Faktura adress:</span>
                <span className="confirmation-value">{customerInfo?.address || "N/A"}</span>
              </div>
              <div className="confirmation-info-item">
                <span className="confirmation-label"></span>
                <span className="confirmation-value">
                  {customerInfo?.cardNumber ? `############${customerInfo.cardNumber}` : "N/A"}
                </span>
              </div>
            </div>

            <div className="confirmation-total">
              <span>TOTAL:</span>
              <span>{total} $</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
