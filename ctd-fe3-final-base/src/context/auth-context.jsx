import { createContext, useState } from "react"


export const AuthContext = createContext({});


const AuthProvider = ({children})=>{

    const [ name , setName] = useState("")
    // função para manter status pós carregar apgina / Local Storage
    function saveData(data){
        setName(data)    
    }


    return  <AuthContext.Provider value={{name  , saveData}}>
             {children}
            </AuthContext.Provider>
    
}

export default AuthProvider ; 