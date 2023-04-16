import { useEffect, useState } from "react";
import ScheduleFormModal from "./ScheduleFormModal";
import styles from "./DetailCard.module.css";
import { useLocation } from "react-router-dom";
import api from "../services/api";





const DetailCard = () => {
  const { state } = useLocation();
  const { matricula } = state || {};
  const [nomeDentista, setNomeDentista] = useState("")
  const [sobreNomeDentista,setSobreNomeDentista]= useState("")
  const [usuarioDentista , setUsuarioDentista] = useState("")
  


  
  const url = "/dentista?matricula="+ matricula
  async function getDentistaMatricula(matricula){
    try{
      console.log(url)

      const response = await api.get(url)
      setNomeDentista(response.data.nome)
      setSobreNomeDentista(response.data.sobrenome)
      setUsuarioDentista(response.data.usuario.username)

      
    }catch{
      console.log("error")
    }
  
  }
   
   useEffect((matricula) => {
    //Nesse useEffect, você vai fazer um fetch na api passando o 
    //id do dentista que está vindo do react-router e carregar os dados em algum estado
    //const response = api.get("/dentista?matricula="+ {matricula})
   
    getDentistaMatricula()
    
    
     
  }, []);


  return (
    //As instruções que estão com {''} precisam ser 
    //substituídas com as informações que vem da api
    <>
      <h1>{matricula}</h1>
      <h1>Detail about Dentist {nomeDentista} </h1>
      <section className="card col-sm-12 col-lg-6 container">
        {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
        <div
          className={`card-body row`}
        >
          <div className="col-sm-12 col-lg-6">
            <img
              className="card-img-top"
              src="/images/doctor.jpg"
              alt="doctor placeholder"
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <ul className="list-group">
              <li className="list-group-item">Nome: {nomeDentista}</li>
              <li className="list-group-item">
                Sobrenome: {sobreNomeDentista}
              </li>
              <li className="list-group-item">
                Usuário: {usuarioDentista}
              </li>
            </ul>
            <div className="text-center">
              {/* //Na linha seguinte deverá ser feito um teste se a aplicação
              // está em dark mode e deverá utilizado o css correto */}
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={`btn btn-light ${styles.button
                  }`}
              >
                Marcar consulta
              </button>
            </div>
          </div>
        </div>
      </section>
      <ScheduleFormModal />
    </>
  );
};

export default DetailCard;
