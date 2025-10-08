export default function ErrorMessage({ message }) {
    return (
      <div className="error-container">
        <p className="error-text">❌ {message}</p>
      </div>
    );
  }