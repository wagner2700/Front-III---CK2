import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Components/Navbar";
import Home from "./Home";
import Footer from "../Components/Footer";


export default function PaginaInicial(){
    return(
        <div>
            <Navbar />
            <Home />
            <Footer />
        </div>
    )
}