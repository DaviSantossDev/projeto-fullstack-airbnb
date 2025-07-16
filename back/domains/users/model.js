import mongoose from "mongoose"; // importando mongoose para definir o esquema do usuário para o MongoDB

const userSchema = new mongoose.Schema({ // Definindo o esquema do usuário porque o mongoose precisa de um esquema para criar um modelo
  name: {   type: String, required: true }, 
  email: { type: String, required: true, unique: true },    
  password: { type: String, required: true }, 
})

export const User = mongoose.model("User", userSchema); // Exportando o modelo do usuário por que o mongoose precisa de um modelo para interagir com o banco de dados