import Card from "../Components/Card"

const Home = () => {

  {/*const [dentista , setDentista] = useState([])

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
  }, []);*/}

  return (
    <>
      <h1 className="home">Home</h1>
      <div className="card-grid container">
        <Card />
      </div>
    </>
  );
};

export default Home;
