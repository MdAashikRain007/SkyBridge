let IS_PROD = true;
const server = IS_PROD ?
      "http://localhost:8080" :
      
     "https://apnacollegebackend.onrender.com" 


export default server;