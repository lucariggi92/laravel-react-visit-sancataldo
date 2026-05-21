
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Le opzioni di mood disponibili
const TIME_OPTIONS = [
  { value: 60, label: "1 ora", icon: "🕐", description: "Una passeggiata veloce" },
  { value: 120, label: "2 ore", icon: "🕑", description: "Esplora qualcosa di bello" },
  { value: 240, label: "Mezza giornata", icon: "🕓", description: "Scopri la città con calma" },
  { value: 480, label: "Tutto il giorno", icon: "🌅", description: "Immergiti completamente" },
];

export default function TimePage() {
  
  // Stato che tiene traccia dell'opzione selezionata (null = nessuna)
  const [selected, setSelected] = useState(null);
  
  // useNavigate per andare al prossimo step
  const navigate = useNavigate();

  // Funzione quando clicco prosegui
  // salva il valore del "mood" nel sessionStorage e va al prossimo step
   function handleNext() {
    if (!selected) return;
    sessionStorage.setItem("time", selected);
    navigate("/categories");
    }

  return (
    <div className="form-page-container">
        <div className="container">

      {/* HEADER: freccia indietro con barra di progresso */}
      <div className="form-header">
        <button className="btn-back" onClick={() => navigate("/mood")}>‹</button>
        <div className="progress-bar-wrapper">
          <div className="progress-bar-fill" style={{ width: "40%" }}></div>
        </div>
      </div>



      {/* Domanda*/}
      <h1 className="form-question">Quanto tempo hai?</h1>





      {/* Opzioni: ogni opzione è un bottone selezionabile */}
      <div className="form-options">
        {TIME_OPTIONS.map((option) => (
          <button
            key={option.value}
            className={`form-option ${selected === option.value ? "selected" : ""}`}
            onClick={() => setSelected(option.value)}>{option.label}</button>
        ))}
      </div>






      {/* BOTTONE PROSEGUI — fisso in basso, disabilitato se nessuna opzione selezionata */}
      <div className="mt-5">
        <button
          className="btn-prosegui"
          onClick={handleNext}
          disabled={!selected}
        >
          Prosegui
        </button>
      </div>

</div>
    </div>
  );
}