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

  //l'array delle dipendenze è vuoto quidni avvio al montaggio dei componenti della pagina
  useEffect(() => {

    //leggo i valori salvati in session storage nelle pagine precedenti
    const mood = sessionStorage.getItem("mood");
    const category = sessionStorage.getItem("category");
    const food = sessionStorage.getItem("food");
    const time = sessionStorage.getItem("time");

    // Avvio un timer dei messaggi che cambiano ogni 3 secondi
    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => {
        //lo stoppa dopo aver mostrato tutti i loading_messages dell'array
        if (prev < LOADING_MESSAGES.length - 1) {
          return prev + 1;
        }else{
          return prev;
        }
      });
    }, 3000);

    // funzione del browser con cui invio i valori salvati dalla sessionStorage a Laravel in formato JSON dato che HTTP trasporta testo
    fetch("http://127.0.0.1:8000/api/itineraries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood, category, food, time })//me lo trasforma in  stringa'{"mood":"curioso","category":"Arte & Architettura"}'
    })
    .then(res => res.json())// quando Laravel risponde, apri la risposta
    .then(data => {
      sessionStorage.setItem("itinerary", JSON.stringify(data)); //ora che hai i dati, salvali nel sessionStorage
    })
    .catch(err => {
      console.error("Errore API:", err);
    });


    // passa alla pagina Result Page a /result dopo 15 secondi fissi
    const navigationTimer = setTimeout(() => {
      navigate("/result");
    }, 15000);

    return () => {
      clearInterval(messageTimer); // reset  timer dei messaggi
      clearTimeout(navigationTimer); // reset  timer di navigazione
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