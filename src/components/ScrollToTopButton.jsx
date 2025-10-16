import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react"; // snygg ikon, passar Streamify
import "../style/ScrollToTopButton.css";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) setVisible(true);
      else setVisible(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button className="scroll-to-top" onClick={scrollToTop}>
      <ArrowUp size={22} />
    </button>
  );
}