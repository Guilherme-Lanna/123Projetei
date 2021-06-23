const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require('bcrypt');
const {sign}= require('jsonwebtoken')
const {validacaoToken} = require("../autenticacao/Auth");

router.post("/", async (req, res) => {
    const {username, senha} = req.body;
    bcrypt.hash(senha, 15). then((hash)=>{
        Users.create({
            username: username,
            senha: hash,
        })
        res.json("CERTO");
    })
});

router.post("/login", async (req, res) => {
    const {username, senha} = req.body; 
    const user = await Users.findOne({where: {username: username}})

    if(!user) res.json({error: "O usuário não existe!!"});

    bcrypt.compare(senha, user.senha).then((match)=>{
        if (!match) res.json({error: "A senha está incorreta!!"})

        const token = sign({username: user.username, id:user.id}, "chavedeacesso");

        res.json(token)
    })
});

router.get('/auth',validacaoToken, (req, res)=>{
    res.json(req.user)
})

module.exports = router;
