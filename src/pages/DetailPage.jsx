import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DetailsPage() {
  const { id } = useParams(); // Recupera l'id della tappa dall'URL
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Recuperiamo l'URL base delle API dal file .env di Vite
    const apiUrl = import.meta.env.VITE_API_URL;

    // Chiamata all'endpoint di Laravel: /api/contents/{id}
    fetch(`${apiUrl}/contents/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Tappa non trovata");
        return res.json();
      })
      .then((response) => {
        // Salva i dati della singola tappa comprensiva di category e moods
        setContent(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Errore nel recupero della tappa dello show:", err);
        setLoading(false);
      });
  }, [id]);

  // Schermata di caricamento durante la fetch
  if (loading) {
    return (
      <div className="form-page-container d-flex justify-content-center align-items-center">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Caricamento dettagli...</span>
        </div>
      </div>
    );
  }

  // Se la tappa non esiste o la fetch fallisce
  if (!content) {
    return (
      <div className="form-page-container text-center text-white p-5">
        <h1>Ops! Tappa non trovata 🏛️</h1>
        <button className="btn-prosegui mt-4" onClick={() => navigate(-1)}>
          Torna all'itinerario
        </button>
      </div>
    );
  }

  return (
    <div className="form-page-container">
      <div className="container p-4">
        
        {/* Pulsante per tornare indietro alla ResultPage senza perdere la timeline */}
        <button 
          className="btn-back mb-4 text-white-50 border-0 bg-transparent"
          onClick={() => navigate(-1)}
        >
          <span className="text-info">➔</span> Torna all'itinerario
        </button>

        {/* Card dello Show del Contenuto */}
        <div className="card-detail bg-dark border border-secondary rounded-4 overflow-hidden shadow-lg">

          <div className="p-4 p-md-5 text-white">
            
            {/* Categoria e Tempo di Visita */}
            <div className="d-flex justify-content-between align-items-start mb-3">
              <span className="badge bg-info text-dark text-uppercase tracking-wider">
                {content.category?.name || "Attrazione"}
              </span>
              <span className="fs-5 text-white-50">
                ⏱️ {content.time_needed_visiting} min
              </span>
            </div>

            {/* Titolo Principale */}
            <h1 className="display-4 fw-bold mb-4" style={{ color: "#36cbd9" }}>
              {content.title}
            </h1>

            {/* Se è una tappa Ristoro, mostra il tipo di cibo */}
            {content.food_type && (
              <div className="alert bg-black border-warning text-warning mb-4 d-inline-block">
                🍽️ Opzione Ristoro: <span className="text-capitalize"><strong>{content.food_type}</strong></span>
              </div>
            )}

            {/* Descrizione Completa presa da DB */}
            <div className="description-box mb-5">
              <h4 className="text-white-50 small text-uppercase mb-3">Descrizione della tappa</h4>
              <p className="fs-5 lh-lg text-white-75">
                {content.description || "Nessuna descrizione disponibile per questa attrazione."}
              </p>
            </div>

            <hr className="border-secondary mb-5" />

            {/* Ciclo dei Mood associati (Relazione Many-to-Many con la tabella pivot) */}
            <div className="mood-section">
              <h4 className="text-white-50 small text-uppercase mb-3">Mood perfetti per questo luogo</h4>
              <div className="d-flex gap-2 flex-wrap">
                {content.moods?.length > 0 ? (
                  content.moods.map((mood) => (
                    <span key={mood.id} className="badge bg-dark border border-info text-info px-3 py-2 rounded-3 fs-6">
                      ✨ {mood.name}
                    </span>
                  ))
                ) : (
                  <span className="text-white-50">Nessun mood specifico associato.</span>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Pulsante di fondo per spingere ad andare avanti */}
        <div className="text-center mt-5">
            <button className="btn-prosegui" onClick={() => navigate(-1)}>
                Ho visitato questo posto, proseguiamo!
            </button>
        </div>
      </div>
    </div>
  );
}