import axios from "axios"

const api = axios.create({
    baseURL:"http://dhodonto.ctdprojetos.com.br/" ,
   //baseURL :"http://dhodonto.ctdprojetos.com.br/dentista?matricula=288519d3-1353-40ef-96b3-949d9faea4ee" 
})



export default api 

