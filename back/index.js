const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json()); 
app.use(cors());

const db = require("./models");

//Rotas
const pessoaRota = require('./routes/pessoa_fisica');
app.use("/pessoas", pessoaRota);
const usersRota = require('./routes/Users');
app.use("/auth", usersRota);


/* db.sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
        console.log("Rodando na porta 3001!");
    });
}) */
    
