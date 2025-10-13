import logo from "../assets/streamify-logo.png";

export default function Header() {
  return (
    <header className="streamify-header">
      <img src={logo} alt="Streamify logo" className="streamify-logo" />
    </header>
  );
}