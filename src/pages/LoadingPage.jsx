import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Messaggi che scorrono durante il loading
const LOADING_MESSAGES = [
  { text: "Analizziamo le tue preferenze...", emoji: "🧠" },
  { text: "Stiamo costruendo la tua giornata perfetta...", emoji: "✨" },
  { text: "Cerchiamo le attrazioni più belle...", emoji: "🏛️" },
  { text: "Selezioniamo i posti da non perdere...", emoji: "📍" },
  { text: "Quasi pronto... San Cataldo ti aspetta!", emoji: "🌿" },
];

export default function LoadingPage() {

  const navigate = useNavigate();

  // Tiene traccia del messaggio attualmente mostrato
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {

    const mood = sessionStorage.getItem("mood");
    const category = sessionStorage.getItem("category");
    const food = sessionStorage.getItem("food");
    const time = sessionStorage.getItem("time");

    // Cambia messaggio ogni 3 secondi
    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev < LOADING_MESSAGES.length - 1) return prev + 1;
        return prev;
      });
    }, 3000);

    // Chiama l'API Laravel
    fetch("http://127.0.0.1:8000/api/itineraries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood, category, food, time })
    })
    .then(res => res.json())
    .then(data => {
      sessionStorage.setItem("itinerary", JSON.stringify(data));
    })
    .catch(err => {
      console.error("Errore API:", err);
    });

    // Naviga a /result dopo 15 secondi fissi
    const navigationTimer = setTimeout(() => {
      navigate("/result");
    }, 15000);

    return () => {
      clearInterval(messageTimer);
      clearTimeout(navigationTimer);
    };

  }, []);






  
  return (
    <div className="loading-container">

      {/* Spinner rotante */}
      <div className="loading-spinner"></div>

      {/* Emoji dinamica */}
      <div className="loading-emoji">
        {LOADING_MESSAGES[messageIndex].emoji}
      </div>

      {/* Messaggio dinamico */}
      <h1 className="loading-title">
        {LOADING_MESSAGES[messageIndex].text}
      </h1>

      {/* Pallini di progresso */}
      <div className="loading-dots">
        {LOADING_MESSAGES.map((_, i) => (
          <div
            key={i}
            className={`loading-dot ${i === messageIndex ? "active" : ""}`}
          ></div>
        ))}
      </div>

      <p className="loading-subtitle">San Cataldo ti aspetta 🌿</p>

    </div>
  );
}