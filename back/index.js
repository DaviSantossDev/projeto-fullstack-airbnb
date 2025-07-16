import "dotenv/config"; // importando dotenv para usar variaveis de ambiente
import express from "express";
import UserRoutes from "./domains/users/routers.js"; // importando as rotas de usuários

const app = express();
app.use(express.json()); // middleware para analisar o corpo das requisições como JSON
const { PORT } = process.env; // passando env para a variavel PORT
app.use('/users', UserRoutes); // definindo a rota base para os usuários


app.listen(PORT, () => {
  // iniciando o servidor na porta definida
  console.log(`Server running on http://localhost:${PORT}`);
});
