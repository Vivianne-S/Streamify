import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../style/ConfirmationPage.css";

export default function ConfirmationPage() {
  const navigate = useNavigate();

  const movies = [
    {
      title: "Filmen om Bob",
      price: "4.99",
    },
    {
      title: "The Conjuring 15",
      price: "4.99",
    },
    {
      title: "Hoppditihoop",
      price: "4.99",
    },
  ];

  const customerInfo = {
    name: "Namn",
    address: "Adress",
    cardNumber: "############7234",
  };

  const total = "14.97";

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

  

        <div className="confirmation-content">
          <div className="confirmation-left">
            <div className="confirmation-movies">
              {movies.map((movie, index) => (
                <div className="confirmation-movie-item" key={index}>
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
                <span className="confirmation-value">{customerInfo.name}</span>
              </div>
              <div className="confirmation-info-item">
                <span className="confirmation-label">Faktura adress:</span>
                <span className="confirmation-value">{customerInfo.address}</span>
              </div>
              <div className="confirmation-info-item">
                <span className="confirmation-label"></span>
                <span className="confirmation-value">{customerInfo.cardNumber}</span>
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
