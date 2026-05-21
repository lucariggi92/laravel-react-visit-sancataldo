import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HungryPage() {
  const [wantsToEat, setWantsToEat] = useState(null); // null, true o false
  const navigate = useNavigate();

  function handleNext() {
    if (wantsToEat === null) return;

    if (wantsToEat === false) {
      // Se NO: azzeriamo il cibo nel sessionStorage e andiamo dritti al tempo
      sessionStorage.setItem("hungry", "false");
      sessionStorage.setItem("food", ""); //svuoto pere sicurezza nel caso in cui l'utente dovesse tornare indietro
      navigate("/loading");
    } else {
      // Se SÌ: andiamo alla seconda pagina per scegliere il tipo di cibo
      sessionStorage.setItem("hungry", "true")
      navigate("/food");
    }
  }

  return (
    <div className="form-page-container">
      <div className="container">

        {/* HEADER con barra di progresso */}
        <div className="form-header">
          <button className="btn-back" onClick={() => navigate("/categories")}>‹</button>
          <div className="progress-bar-wrapper">
            <div className="progress-bar-fill" style={{ width: "80%" }}></div>
          </div>
        </div>

        {/* Domanda Booleana */}
        <h1 className="form-question">"Ti va qualcosa da mangiare?"</h1>

        <div className="d-flex flex-column gap-3 max-w-sm mx-auto mt-4">
          <button
            type="button"
            className={`form-option py-3 ${wantsToEat === true ? "selected" : ""}`}
            onClick={() => setWantsToEat(true)}
          >
            👍 SÌ, ho un po' di fame
          </button>
          
          <button
            type="button"
            className={`form-option py-3 ${wantsToEat === false ? "selected" : ""}`}
            onClick={() => setWantsToEat(false)}
          >
            👎 NO, a posto così
          </button>
        </div>

        {/* BOTTONE PROSEGUI */}
        <div className="mt-5">
          <button
            className="btn-prosegui"
            onClick={handleNext}
            disabled={wantsToEat === null}
          >
            Prosegui
          </button>
        </div>

      </div>
    </div>
  );
}