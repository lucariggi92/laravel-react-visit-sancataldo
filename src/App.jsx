import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import MoodPage from "./pages/MoodPage";
import CategoriesPage from "./pages/CategoriesPage";
import FoodPage from "./pages/FoodPage";
import TimePage from "./pages/TimePage";
import LoadingPage from "./pages/LoadingPage";
import ResultPage from "./pages/ResultPage";
import HungryPage from "./pages/HungryPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Il Layout avvolge tutte le pagine pubbliche */}
        <Route path="/" element={<AppLayout />}>

          <Route index element={<HomePage />} />
          
       {/* Step del form — ogni domanda è una pagina separata */}
          <Route path="/mood" element={<MoodPage />} /> 
          <Route path="/categories" element={<CategoriesPage />} />
           <Route path="/hungry" element={<HungryPage />} />
          <Route path="/food" element={<FoodPage />} /> 
          <Route path="/time" element={<TimePage />} /> 
              <Route path="/loading" element={<LoadingPage />} /> 
       

          {/* Pagina finale con l'itinerario generato */}
          <Route path="/result" element={<ResultPage />} /> 
       
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}