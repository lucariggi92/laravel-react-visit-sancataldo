# 🌿 Visit San Cataldo

**Visit San Cataldo** è una web app che genera itinerari turistici personalizzati per la città di San Cataldo (CL), Sicilia. Attraverso un breve percorso guidato, l'utente racconta il proprio stato d'animo, il tempo a disposizione e le proprie preferenze, e riceve un itinerario su misura con tappe, tempi di visita e — se lo desidera — soste enogastronomiche.

Questo repository contiene il **frontend** dell'applicazione, sviluppato in React + Vite. Il backend (API REST) è sviluppato in Laravel e mantenuto in un repository separato.

🔗 Instagram: [@visit_sancataldo](https://www.instagram.com/visit_sancataldo/)
🔗 Facebook: [Visit San Cataldo](https://www.facebook.com/profile.php?id=61579456103577&locale=it_IT)

---

## ✨ Funzionalità

L'app guida l'utente attraverso un percorso a step (wizard), salvando le risposte in `sessionStorage` e inviandole al backend per la generazione dell'itinerario:

1. **Home** – schermata di ingresso ("Sblocca la città")
2. **Mood** – come ti senti oggi (curioso, avventuriero, rilassato)
3. **Tempo disponibile** – da 1 ora a tutta la giornata
4. **Categoria di interesse** – arte & architettura, siti archeologici, natura
5. **Fame** – se l'utente vuole includere una sosta gastronomica
6. **Tipo di pasto** – colazione, aperitivo, pranzo, cena, mordi e fuggi
7. **Loading** – invio dei dati al backend Laravel e generazione dell'itinerario
8. **Risultato** – timeline con le tappe suggerite, immagini, categorie e tempi di visita
9. **Dettaglio tappa** – pagina di approfondimento per ogni luogo/attività dell'itinerario

---

## 🛠️ Stack tecnologico

- **[React 19](https://react.dev/)** – libreria UI
- **[Vite](https://vitejs.dev/)** – build tool e dev server
- **[React Router v7](https://reactrouter.com/)** – routing lato client
- **[Bootstrap 5](https://getbootstrap.com/)** – componenti e utility CSS
- Comunicazione con backend **Laravel** tramite REST API (`fetch`)

---

## 📁 Struttura del progetto

```
src/
├── assets/            # immagini e risorse statiche
├── components/        # componenti riutilizzabili (Header, Footer)
├── layouts/           # layout dell'app (AppLayout con Header/Footer + Outlet)
├── pages/             # una pagina per ogni step del wizard
│   ├── HomePage.jsx
│   ├── MoodPage.jsx
│   ├── TimePage.jsx
│   ├── CategoriesPage.jsx
│   ├── HungryPage.jsx
│   ├── FoodPage.jsx
│   ├── LoadingPage.jsx
│   ├── ResultPage.jsx
│   └── DetailPage.jsx
├── App.jsx            # definizione delle rotte
├── main.jsx           # entry point dell'app
└── index.css / App.css
```

---

## 🚀 Setup e avvio in locale

### Requisiti

- [Node.js](https://nodejs.org/) 18 o superiore
- npm
- Il backend Laravel di Visit San Cataldo in esecuzione (repo separato)

### Installazione

```bash
# clona il repository
git clone https://github.com/<tuo-username>/laravel-react-visit-sancataldo.git
cd laravel-react-visit-sancataldo

# installa le dipendenze
npm install
```

### Configurazione ambiente

Crea un file `.env` nella root del progetto con l'URL delle API del backend Laravel:

```
VITE_API_URL=http://localhost:8000/api
```

> Il valore va adattato in base a dove gira il backend (locale o produzione).

### Avvio in sviluppo

```bash
npm run dev
```

L'app sarà disponibile su `http://localhost:5173`.




## 🔌 Integrazione con il backend

Il frontend comunica con le API Laravel tramite due endpoint principali:

- `POST /itineraries` — invia le preferenze raccolte nel wizard (mood, tempo, categoria, fame, tipo di pasto) e riceve l'itinerario generato
- `GET /contents/{id}` — recupera il dettaglio di una singola tappa

Le immagini delle tappe vengono servite dallo storage pubblico di Laravel (`/storage/...`).

---

## 🗺️ Roadmap

- [ ] Gestione errori più robusta sulle chiamate API (stati di loading/errore visibili all'utente)
- [ ] Persistenza itinerari (es. cronologia o account utente)
- [ ] Condivisione itinerario (link o social share)
- [ ] Versione responsive ottimizzata / PWA
- [ ] Test automatici (component + e2e)
- [ ] Internazionalizzazione (IT/EN)

---

## 👤 Autore

Progetto sviluppato da **Luca Riggi**

---
