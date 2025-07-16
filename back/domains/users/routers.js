import { Router } from "express";
import { connectMongoDB } from "../../config/db.js"; // importando a função de conexão com o MongoDB por que precisamos conectar ao banco de dados antes de iniciar o servidor
import { User } from "./model.js" // importando o modelo de usuário para interagir com a coleção de usuários no MongoDB
import bycrypt from "bcryptjs"; // importando bcrypt para criptografar senhas de usuários

const router = Router();
const bycryptSalt = bycrypt.genSaltSync(); // gerando um salt para criptografia de senhas


router.get("/", async (req, res) => {
  connectMongoDB(); // chamando a função para conectar ao MongoDB

  try {
    const users = await User.find(); // buscando todos os usuários do banco de dados
    res.json(users); // enviando a lista de usuários como resposta
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    return res
      .status(404)
      .json({ error: "Erro ao conectar ao banco de dados" });
  }
});

router.post("/", async (req, res) => {
  connectMongoDB(); // chamando a função para conectar ao MongoDB

  const { name, email, password } = req.body; // extraindo os dados do corpo da requisição
  const criptografando = await bycrypt.hashSync(password, bycryptSalt); // criptografando a senha do usuário

  try {
    const newUser = new User({
      name,
      email,
      password:  criptografando // criando uma nova instância do modelo User com os dados fornecidos
    }); // criando uma nova instância do modelo User

    res.json(newUser); // enviando uma resposta de sucesso
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

export default router; // exportando o roteador para ser usado no servidor principal