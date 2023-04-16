import { useEffect, useState } from "react";
import styles from "./Card.module.css";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const [dentista , setDentista] = useState([])
  const navigate = useNavigate();

  async  function getDentista(){
    try{
      const response = await api.get("/dentista")
      setDentista(response.data)
      console.log(response.data)
    }catch(error){
      console.log(error)
    }
 }
  useEffect(() => {
    //Nesse useEffect, deverá ser obtido todos os dentistas da API
    //Armazena-los em um estado para posteriormente fazer um map
    //Usando o componente <Card />
    getDentista();
  }, []);

  function dataDentista(matricula){
    alert(matricula)
    navigate("/cadastroDentista", { state: { matricula } } )
  }

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
        <ul>
          {dentista.map((item)=>
          <div className={`card`}
          key={item.matricula}>
            <img
              className="card-img-top"
              src="/images/doctor.jpg"
              alt="doctor placeholder"
            />
            <div className={`card-body ${styles.CardBody}`}>
              {/* Na linha seguinte o link deverá utilizar a matricula, nome e sobrenome do dentista
              que vem da API */}
              <a navigate={`/dentist/MatriculaDoDentista`} onClick={()=>dataDentista(item.matricula)}>
                <h5 className={`card-title ${styles.title}`}>{item.nome} {item.sobrenome}</h5>
              </a>
            </div>
          </div>)}
      </ul>
    </>
  );
};

export default Card;
