import styles from "./Form.module.css";
import api from "../services/api";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";



const LoginForm = () => {
  const handleSubmit = (e) => {
    //Nesse handlesubmit você deverá usar o preventDefault,
    //enviar os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que faz o login /auth
    //lembre-se que essa rota vai retornar um Bearer Token e o mesmo deve ser salvo
    //no localstorage para ser usado em chamadas futuras
    //Com tudo ocorrendo corretamente, o usuário deve ser redirecionado a página principal,com react-router
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
  };
  //const navigate = useNavigate()}
  const [email , setEmail] = useState("");
  const [password , setpassword] = useState("");
  const {saveData} = useContext(AuthContext)
  const {saveTipoApi} = useContext(AuthContext)

  const navigate = useNavigate()

  async function logar(e){
    e.preventDefault()
    try{
     // await api.post("/auth" , { username: email  , password : password})
      const result = await api.post("/auth" , { username: email  , password : password})
        // Guardando o token por enquanto
        saveData(result.data.token)
        saveTipoApi(result.data.tipo)
        navigate("/home")
    }catch(error){
      alert("Erro")
    }
  }


  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div>
        <li>
          {email} - {password}
        </li>
      </div>
      <div
        className={`text-center card container ${styles.card}`}
      >
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
            <input value={email} onChange={(event)=>setEmail(event.target.value)}
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="login"
              required
            />
            <input value={password} onChange={(event)=>setpassword(event.target.value)}
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              type="password"
              required
            />
            <button className="btn btn-primary"  onClick={logar}>
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
