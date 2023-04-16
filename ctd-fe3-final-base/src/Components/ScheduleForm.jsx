import { useContext, useEffect, useState } from "react";
import styles from "./ScheduleForm.module.css";
import api from "../services/api";

const ScheduleForm = () => {
  const [dentista,setDentista] = useState([])
  const [paciente , setPaciente] = useState([])
  // Estados abaixo é para testar select para fazer post
  const [selectMedico , setSelectMedico] = useState("")
  const [selectpaciente , setSelectPaciente] = useState("")
  const [objetoMedico , setObjetoMedico] = useState("")
  const [objetoPaciente , setObjetoPaciente] = useState([])
  const [data , setData] = useState("")
 


 

  async  function getDentista(){
    try{
      const response = await api.get("/dentista")
    
      setDentista(response.data)
      const responsePaciente = await api.get("/paciente")
      setPaciente(responsePaciente.data.body)
    }catch(error){
      
      console.log(error)
    }
 }

 
  useEffect(() => {
    //Nesse useEffect, você vai fazer um fetch na api buscando TODOS os dentistas
    //e pacientes e carregar os dados em 2 estados diferentes
    getDentista()
  }, []);

  async function handleSubmit(event){
    event.preventDefault()
    //Nesse handlesubmit você deverá usar o preventDefault,
    //obter os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que marca a consulta
    //lembre-se que essa rota precisa de um Bearer Token para funcionar.
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
    console.log(selectMedico )

    console.log(selectpaciente)

  
    marcarConsulta(selectMedico , selectpaciente)

  };

  async function marcarConsulta(matricula , matriculaPaciente){
    console.log(matricula)
    console.log(matriculaPaciente)
    const token = localStorage.getItem("@DataToken" )
   
   

    try{
      //{dentista.map((item)=>(item.matricula = selectMedico? )} 
      const resultadoMedico = dentista.filter((item)=>item.matricula === matricula )
      const resultadoPaciente = paciente.filter((item)=>item.matricula === matriculaPaciente )

      console.log(resultadoMedico )
      console.log(resultadoPaciente )



      console.log(resultadoMedico[0].nome)
     console.log(resultadoPaciente[0].nome)

      setObjetoMedico(resultadoMedico)
      setObjetoPaciente(resultadoPaciente)
      
      console.log(objetoMedico)

      const response =  api.post("/consulta" , {
        "paciente": {
          "nome":resultadoPaciente[0].nome ,
          "sobrenome": resultadoPaciente[0].sobrenome,
          "matricula": resultadoPaciente[0].matricula,
          "usuario": {
            "username": resultadoPaciente[0].usuario.username
          },
          "endereco": {
            "id": resultadoPaciente[0].endereco.id,
            "logradouro": resultadoPaciente[0].endereco.logradouro,
            "numero": resultadoPaciente[0].endereco.numero,
            "complemento": resultadoPaciente[0].endereco.complemento,
            "bairro": resultadoPaciente[0].endereco.bairro,
            "municipio": resultadoPaciente[0].endereco.municipio,
            "estado":resultadoPaciente[0].endereco.estado,
            "cep": resultadoPaciente[0].endereco.cep,
            "pais": resultadoPaciente[0].endereco.pais,
           
          },
          "dataDeCadastro": resultadoPaciente[0].dataDeCadastro
        },
        "dentista": {
          "nome": objetoMedico[0].nome,
          "sobrenome": objetoMedico[0].sobrenome,
          "matricula": objetoMedico[0].matricula,
          "usuario": {
            "username": resultadoPaciente[0].usuario.username
          }
        },
        "dataHoraAgendamento": data,
        
      },{ headers: {
        'Authorization' : `Bearer ${token}` }
      })
    }catch{
      console.log("Erro marcar consulta")
    }
  }
  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center container}`
        }
      >
        <form onSubmit={handleSubmit} >
        <ul> 
          <div className={`row ${styles.rowSpacing}`}>
            
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentist 
              </label>
              
              <select className="form-select" name="dentist" id="dentist" onChange={(event)=>setSelectMedico(event.target.value)}>
                {/*Aqui deve ser feito um map para listar todos os dentistas*/}
                
                {dentista.map((item)=><option key={item.matricula} value={item.matricula}>
                  {item.nome} {item.sobrenome}
                </option>)}
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Patient
              </label>
              <select className="form-select" name="patient" id="patient"  onClick={(event)=>setSelectPaciente(event.target.value)}>
                {/*Aqui deve ser feito um map para listar todos os pacientes*/}
                {paciente.map((item)=><option key={item.matricula} value={item.matricula}>
                  {item.nome} {item.sobrenome}
                  
                </option>
                
                )}
              </select>
            </div>
          </div>
          </ul>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-12">
              <label htmlFor="appointmentDate" className="form-label">
                Date
              </label>
              <input
                className="form-control"
                id="appointmentDate"
                name="appointmentDate"
                type="datetime-local"
                onChange={(event)=>setData(event.target.value)}
              />
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
            <button
              className={`btn btn-light ${styles.button
                }`}
              type="submit"  
            >
              Schedule
            </button>
          </div>
          
        </form>

        
      </div>
    </>
  );
};

export default ScheduleForm;
