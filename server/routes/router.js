const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");
const bcrypt = require('bcrypt');

router.post("/teacher", async (req, res) => {
  const { nome, link, wpp, bio, materiaSelecionada, custo, diasSelecionado, horarioEntrada, horarioSaida, password, email } = req.body;

  if (!nome || !link || !wpp || !bio || !materiaSelecionada || !custo || !diasSelecionado || !horarioEntrada || !horarioSaida || !password || !email) {
    return res.status(400).send("Por favor, preencha todos os campos");
  }

  try {
    const preuser = await users.findOne({ email: email });

    if (preuser) {
      return res.status(400).send("Este usuário já está registrado");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const adduser = new users({
        nome, link, wpp, bio, materiaSelecionada, custo, diasSelecionado, horarioEntrada, horarioSaida, password: hashedPassword, email
      });

      await adduser.save();
      return res.status(201).json(adduser);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

// Rota de login de professor
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await users.findOne({ email: email });

    if (!user) {
      return res.status(404).send("Usuário não encontrado");
    }

    if (await bcrypt.compare(password, user.password)) {
      res.status(200).json({
        message: "Login bem-sucedido",
        _id: user._id,  // Inclua o ID do usuário na resposta
      });
    } else {
      res.status(401).send("Credenciais inválidas");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Rota para obter o perfil de um usuário por ID
router.get("/profile/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await users.findById(userId);

    if (!user) {
      return res.status(404).send("Usuário não encontrado");
    }

    res.status(200).json({
      nome: user.nome,
      email: user.email,
      wpp: user.wpp,
      link: user.link,
      bio: user.bio,
      horarioEntrada: user.horarioEntrada,
      horarioSaida: user.horarioSaida,
      materiaSelecionada: user.materiaSelecionada,
      diasSelecionado: user.diasSelecionado,
      custo: user.custo
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Rota para atualizar a senha de um usuário
router.put("/profile/:id/update-password", async (req, res) => {
  try {
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;
    const user = await users.findById(userId);

    if (!user) {
      return res.status(404).send("Usuário não encontrado");
    }

    // Verifique se a senha atual fornecida corresponde à senha no banco de dados
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return res.status(400).send("Senha atual incorreta");
    }

    // Hash da nova senha
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    // Atualize a senha no banco de dados
    user.password = newHashedPassword;
    await user.save();

    res.status(200).send("Senha atualizada com sucesso");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Rota para editar um usuário por ID (sem alterar a senha)
router.put("/profile/:id/edit", async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      nome,
      link,
      wpp,
      bio,
      materiaSelecionada,
      custo,
      diasSelecionado,
      horarioEntrada,
      horarioSaida,
      email
    } = req.body;

    const user = await users.findById(userId);
    if (!user) {
      return res.status(404).send("Usuário não encontrado");
    }

    if (nome) user.nome = nome;
    if (link) user.link = link;
    if (wpp) user.wpp = wpp;
    if (bio) user.bio = bio;
    if (materiaSelecionada) user.materiaSelecionada = materiaSelecionada;
    if (custo) user.custo = custo;
    if (diasSelecionado) user.diasSelecionado = diasSelecionado;
    if (horarioEntrada) user.horarioEntrada = horarioEntrada;
    if (horarioSaida) user.horarioSaida = horarioSaida;

    if (email && email !== user.email) {
      const existingUser = await users.findOne({ email });
      if (existingUser) {
        return res.status(400).send("Este email já está em uso");
      }
      user.email = email;
    }
    await user.save();

    res.status(200).json({
      message: "Usuário editado com sucesso",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Rota para deletar um usuário por ID
router.delete("/profile/:id/delete", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await users.findById(userId);
   
    if (!user) {
      return res.status(404).send("Usuário não encontrado");
    }
    await users.deleteOne({_id: user._id});
    res.status(200).send("Usuário deletado com sucesso");
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});

// Rota para obter todos os usuários
router.get("/teacherlist", async (req, res) => {
  try {
    const allUsers = await users.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});




module.exports = router;


