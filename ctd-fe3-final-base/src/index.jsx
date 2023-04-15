import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";
import PaginaInicial from "./Routes/PaginaInicial";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/LoginForm"
import AuthProvider from "./context/auth-context";



const root = ReactDOM.createRoot(document.getElementById("root"));
//Lembre-se de configurar suas rotas e seu contexto aqui
root.render(
  <React.StrictMode>
        {/*<Navbar />
        <Home />
        <Footer />*/}
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={ <PaginaInicial />} />
      </Routes>
     </BrowserRouter>
    </AuthProvider>

   
  </React.StrictMode>
  
);
