const express = require("express");
const router = express.Router();
const { pessoa_fisica } = require("../models");
const { validacaoToken } = require("../autenticacao/Auth");
/* const { default: Pessoa } = require("../../frontCliente/cliente/src/pages/Pessoa"); */

router.get("/", async (req, res) => {
  const listaDePessoas = await pessoa_fisica.findAll();
  res.json(listaDePessoas);
});

router.get("/porCPF/:CPF_PK", async (req, res) => {
  const CPF_PK = req.params.CPF_PK;
  const pessoa = await pessoa_fisica.findByPk(CPF_PK);
  res.json(pessoa);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await pessoa_fisica
    .create(post)
    .then(function (item) {
      res.json(post); //Item gravado
    })
    .catch(function (err) {
      console.log("Essa pessoa ja existe !!" + err); //Erro ao gravar
      res.send(400, "Essa pessoa ja existe !!");
    });
});

/* router.put("/cpf", async (req, res) => {
  const {novoCpf, CPF_PK} = req.body;
  await pessoa_fisica.update({ CPF_PK: novoCpf}, {where: {CPF_PK: CPF_PK}});
  res.json(novoCpf)
   
}); */
router.put("/nome", async (req, res) => {
  const {novoNome, CPF_PK} = req.body;
  await pessoa_fisica.update({ nome_pessoa: novoNome}, {where: {CPF_PK: CPF_PK}});
  res.json(novoNome)
   
});
router.put("/telefone", async (req, res) => {
  const {novoTelefone, CPF_PK} = req.body;
  await pessoa_fisica.update({ telefone_pessoa: novoTelefone}, {where: {CPF_PK: CPF_PK}});
  res.json(novoTelefone)
   
});
router.put("/dtnasc", async (req, res) => {
  const {novaDataNasc, CPF_PK} = req.body;
  await pessoa_fisica.update({ dt_nasc_pessoa: novaDataNasc}, {where: {CPF_PK: CPF_PK}});
  res.json(novaDataNasc)
   
});

/* router.put("/edit/:CPF_PK", function (req, res, next) {
  res.json(req.body.CPF_PK, "Item Atualizado")
    
    .then(function (item) {
      res.json(req.body, "Item Atualizado");
    })
    .catch(function (err) {
      console.log("Falha na Atualização" + err);
    });
});
 */
router.delete("/:cpfPessoa", async (req, res) => {
  const cpfPessoa = req.params.cpfPessoa;
  await pessoa_fisica.destroy({
    where: {
      CPF_PK: cpfPessoa,
    },
  });
  res.json("DELETADO COM SUCESSO");
});

module.exports = router;
