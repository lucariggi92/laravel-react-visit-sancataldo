
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Le opzioni di mood disponibili
const MOOD_OPTIONS = [
  { value: "curioso", label: "😮 Curioso" },
  { value: "avventuriero", label: "🧗 Avventuriero" },
  { value: "rilassato", label: "😌 Rilassato" },
  
];

export default function MoodPage() {
  
  // Stato che tiene traccia dell'opzione selezionata (null = nessuna)
  const [selected, setSelected] = useState(null);
  
  // useNavigate per andare al prossimo step
  const navigate = useNavigate();

  // Funzione quando clicco prosegui
  // salva il valore del "mood" nel sessionStorage e va al prossimo step
   function handleNext() {
    if (!selected) return;
    sessionStorage.setItem("mood", selected);
    navigate("/time");
    }

  return (
    <div className="form-page-container">
        <div className="container">

      {/* HEADER: freccia indietro con barra di progresso */}
      <div className="form-header">
        <button className="btn-back" onClick={() => navigate("/")}>‹</button>
        <div className="progress-bar-wrapper">
          <div className="progress-bar-fill" style={{ width: "25%" }}></div>
        </div>
      </div>



      {/* Domanda*/}
      <h1 className="form-question">Come ti senti oggi?</h1>





      {/* Opzioni: ogni opzione è un bottone selezionabile */}
      <div className="form-options">
        {MOOD_OPTIONS.map((option) => (
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