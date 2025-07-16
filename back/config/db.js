import "dotenv/config"; // importando dotenv para usar variaveis de ambiente
import mongoose from "mongoose"; // importando mongoose para conectar ao MongoDB

const {MongoDb} = process.env; // passando env para a variavel MongoDb

 export const connectMongoDB = async () => { // função para conectar ao MongoDB e exportar
try { 
 await mongoose.connect(MongoDb);  
console.log("MongoDB conectada com sucesso!");
} catch (error) {
console.error("MongoDB falhou ao conectar:", error);
}
}