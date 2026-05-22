import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResultPage() {
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState(null);

  useEffect(() => {
    const savedItinerary = sessionStorage.getItem("itinerary");

    if (savedItinerary) {
      const fullResponse = JSON.parse(savedItinerary);
      setItinerary(fullResponse.data ? fullResponse.data : fullResponse);
    } else {
      navigate("/");
    }
  }, [navigate]);



  if (!itinerary) {
    return null;
  }


//trasforma da minuti ad ore
  function formatTime(minutes) {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;
    if (remaining === 0) return `${hours}h`;
    return `${hours}h ${remaining}min`;
  }

  return (
    <div className="form-page-container">
      <div className="container p-4 text-white">

        {/* HEADER DELLA PAGINA */}
        <div className="text-center mb-5">
          <span className="fs-5 text-uppercase tracking-wider text-info fw-bold">
            Il tuo itinerario è pronto!
          </span>
          <h1 className="display-5 fw-bold mt-2" style={{ color: "#36cbd9" }}>
            {itinerary.title}
          </h1>
          <p className="fs-5 text-white-50 mt-2 max-w-md mx-auto">
            {itinerary.description}
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
            <span className="badge bg-dark border border-secondary px-3 py-2 rounded-pill fs-6">
              ⏱️ {formatTime(itinerary.time_available)}
            </span>
            <span className="badge bg-dark border border-info text-info px-3 py-2 rounded-pill fs-6 text-capitalize">
              ✨ Mood: {itinerary.mood}
            </span>
          </div>
        </div>

        {/* TIMELINE DELLE TAPPE */}
        <div className="position-relative mx-auto" style={{ maxWidth: "600px" }}>

          {/* Linea verticale della timeline */}
          <div
            className="position-absolute h-100 border-start border-secondary opacity-25"
            style={{ left: "20px", top: "0", zIndex: 0 }}
          ></div>

          <div className="d-flex flex-column gap-4">
            {itinerary.contents?.map((content, index) => (
              <div
                key={content.id}
                className="d-flex align-items-start position-relative"
                style={{ zIndex: 1 }}
              >

                {/* Indicatore numerico della tappa */}
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-dark shadow me-3 flex-shrink-0"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: content.food_type ? "#ffc107" : "#36cbd9"
                  }}
                >
                  {content.food_type ? "🍽️" : index + 1}
                </div>

                {/* Card della Tappa */}
                <div className="card bg-dark border-secondary rounded-4 shadow-sm w-100 overflow-hidden">

                  {/* Immagine di copertina se presente */}
                  {content.image && (
                    <img
                      src={`${import.meta.env.VITE_API_URL.replace('/api', '')}/storage/${content.image}`}
                      alt={content.title}
                      style={{ width: "100%", height: "180px", objectFit: "cover" }}
                    />
                  )}

                  <div className="p-4">
                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
                      <h3 className="h5 fw-bold m-0 text-white">
                        {content.title}
                      </h3>
                      <span className="badge bg-secondary rounded-pill font-monospace">
                        ⏱️ {content.time_needed_visiting} min
                      </span>
                    </div>

                    {/* Badge categoria con colore dinamico */}
                    <span
                      className="badge rounded-pill px-3 py-2 text-uppercase small fw-bold d-inline-block mb-2"
                      style={{
                        backgroundColor: content.category?.color || "#2d3d4a",
                        color: "#fff",
                        fontSize: "0.7rem"
                      }}
                    >
                      {content.category?.name || (content.food_type ? "Ristorazione" : "Attrazione")}
                    </span>

                    {/* Descrizione */}
                    <p className="small text-white-50 m-0">
                      {content.description || "Clicca per scoprire di più su questa fantastica tappa."}
                    </p>
                  </div>

                </div>

              </div>
            ))}
          </div>
        </div>

        {/* BOTTONE RICOMINCIA */}
        <div className="text-center mt-5 pt-4">
          <button
            className="btn btn-outline-secondary rounded-pill px-4 py-2 text-white-50"
            onClick={() => {
              sessionStorage.clear();
              navigate("/");
            }}
          >
            🔄 Crea un nuovo itinerario
          </button>
        </div>

      </div>
    </div>
  );
}