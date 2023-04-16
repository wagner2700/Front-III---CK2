import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [dentistaNome, setDentistaNome] = useState("");
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    // Pega do Storage
    const response = localStorage.getItem("@DataToken");
    setName(response);
  }, []);

  function removeUserStorage() {
    localStorage.removeItem("@DataToken");
    localStorage.removeItem("@DataTipo");
  }

  // função para manter status pós carregar apgina / Local Storage
  function saveData(data) {
    setName(data);
    //Salva no Storage
    localStorage.setItem("@DataToken", data);
  }

  function saveDataDentista(nomeDentista) {
    setDentistaNome(nomeDentista);
  }

  function saveTipoApi(tipo) {
    localStorage.setItem("@DataTipo", tipo);
  }

  function toggleTheme() {
    setDarkTheme(!darkTheme);
  }

  return (
    <AuthContext.Provider
      value={{
        name,
        saveData,
        removeUserStorage,
        saveTipoApi,
        saveDataDentista,
        darkTheme,
        toggleTheme,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
