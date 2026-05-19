import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  
  // useNavigate ci permette di cambiare pagina programmaticamente
  // quando l'utente clicca il pulsante, lo mandio a /form/mood
  const navigate = useNavigate();

  return (

    <div className="home-container">



      {/* titolo */}
      <div className="text-center my-auto">
        <div className="home-subtitle">Non sai</div>

        <div className="home-title">cosa fare oggi?</div>

    
          {/* Pulsante  onClick naviga alla prima pagina del form (/form/mood) */}
        <div className="d-flex justify-content-center">

          <button
            className="btn-sblocca"
            onClick={() => navigate("/mood")}
          >
            Sblocca<br />la città
          </button>

        </div> 
      </div>
     </div>
  );
}