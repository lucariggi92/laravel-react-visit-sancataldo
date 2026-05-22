import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
console.log("ID ricevuto dall'URL di React:", id); // <--- CONTROLLA QUESTO IN CONSOLE
  console.log("URL completo chiamato:", `${apiUrl}/contents/${id}`);
    // Chiamata all'endpoint: /api/contents/{id}
    fetch(`${apiUrl}/contents/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Tappa non trovata");
        return res.json();
      })
      .then((response) => {
  console.log("Risposta API completa:", response); // <--- AGGIUNGI QUESTO PER VEDERE COSA ARRIVA IN CONSOLE
  
  if (response && response.data) {
    setContent(response.data);
  } else {
    setContent(response);
  }
  setLoading(false);
})
      .catch((err) => {
        console.error("Errore nel recupero della tappa dallo show:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="form-page-container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Caricamento dettagli...</span>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="form-page-container text-center text-white p-5 d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <h1>Ops! Tappa non trovata 🏛️</h1>
        <button className="btn-prosegui mt-4" onClick={() => navigate(-1)}>
          Torna all'itinerario
        </button>
      </div>
    );
  }

  return (
    <div className="form-page-container">
      
      {/* IMMAGINE DI COPERTINA (Se presente nel DB) */}
      {content.image && (
        <div style={{ width: "100%", height: "250px", overflow: "hidden" }}>
          <img
            src={`${import.meta.env.VITE_API_URL.replace('/api', '')}/storage/${content.image}`}
            alt={content.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}

      <div className="container p-4" style={{ maxWidth: "650px" }}>
        
        {/* PULSANTE INDIETRO */}
        <button 
          className="btn-back mb-4 text-white-50 border-0 bg-transparent p-0 d-flex align-items-center gap-2"
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        >
          <span className="text-info" style={{ fontSize: "1.2rem" }}>←</span> Torna all'itinerario
        </button>

        {/* CARD INFORMAZIONI SEMPLICE */}
        <div className="card bg-dark border-secondary rounded-4 overflow-hidden shadow-lg p-4 p-md-5 text-white">
          
          {/* CATEGORIA E TEMPO IN ALTO */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <span 
              className="badge rounded-pill px-3 py-2 text-uppercase small fw-bold"
              style={{
                backgroundColor: content.category?.color || "#36cbd9",
                color: "#fff",
                fontSize: "0.75rem"
              }}
            >
              {content.category?.name || "Attrazione"}
            </span>
            <span className="fs-6 text-white-50 fw-semibold">
              ⏱️ {content.time_needed_visiting} min
            </span>
          </div>

          {/* TITOLO */}
          <h1 className="h2 fw-bold mb-4" style={{ color: "#36cbd9" }}>
            {content.title}
          </h1>

          {/* DESCRIZIONE (Mostrata tutta, senza tagli) */}
          <div className="mb-5">
            <p className="fs-5 lh-base text-white-75" style={{ whiteSpace: "pre-line" }}>
              {content.description || "Nessuna descrizione disponibile per questa tappa."}
            </p>
          </div>

          {/* SEZIONE MOOD (Mostrati in fondo come tag puliti) */}
          {content.moods && content.moods.length > 0 && (
            <div className="border-top border-secondary border-opacity-50 pt-4">
              <h4 className="text-white-50 small text-uppercase tracking-wider mb-3" style={{ fontSize: "0.75rem" }}>
                Ideale per un mood:
              </h4>
              <div className="d-flex gap-2 flex-wrap">
                {content.moods.map((mood) => (
                  <span key={mood.id} className="badge bg-dark border border-info text-info px-3 py-2 rounded-3 fs-6 font-monospace">
                    ✨ {mood.name}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* PULSANTE PROSEGUI */}
        <div className="text-center mt-4">
          <button className="btn-prosegui" onClick={() => navigate(-1)}>
            Ho visitato questo posto, proseguiamo!
          </button>
        </div>

      </div>
    </div>
  );
}