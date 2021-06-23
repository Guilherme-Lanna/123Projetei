import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPencilAlt} from 'react-icons/fa';
import axios from "axios";

function Pessoa() {
  let { CPF_PK } = useParams();
  const [objetoPessoa, setObjetoPessoa] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/pessoas/porCPF/${CPF_PK}`)
      .then((response) => {
        setObjetoPessoa(response.data);
      });
  });

  const editPessoa = (option) => {
    if (option === "CPF_PK") {
      let novoCpf = prompt("Digite o novo CPF: ");
      axios.put("http://localhost:3001/pessoas/cpf", {
        novoCpf: novoCpf,
        CPF_PK: CPF_PK,
      });
      setObjetoPessoa({ ...objetoPessoa, CPF_PK: novoCpf });
    } else if (option === "nome_pessoa") {
      let novoNome = prompt("Digite o novo Nome: ");
      axios.put("http://localhost:3001/pessoas/nome", {
        novoNome: novoNome,
        CPF_PK: CPF_PK,
      });
      setObjetoPessoa({ ...objetoPessoa, nome_pessoa: novoNome });
    } else if (option === "telefone_pessoa") {
      let novoTelefone = prompt("Digite o novo Telefone: ");
      axios.put("http://localhost:3001/pessoas/telefone", {
        novoTelefone: novoTelefone,
        CPF_PK: CPF_PK,
      });
      setObjetoPessoa({ ...objetoPessoa, telefone_pessoa: novoTelefone });
    } else if (option === "dt_nasc_pessoa") {
      let novaDataNasc = prompt("Digite o novo Telefone: ");
      axios.put("http://localhost:3001/pessoas/dtnasc", {
        novaDataNasc: novaDataNasc,
        CPF_PK: CPF_PK,
      });
      setObjetoPessoa({ ...objetoPessoa, dt_nasc_pessoa: novaDataNasc });
    }
  };

  return (
    <div className="paginaPessoa">
      <table className="pessoa " width="100%">
          <thead>
            <tr>
              <th scope="col">CPF</th>
              <th scope="col">Nome</th>
              <th scope="col">Telefone</th>
              <th scope="col">Data Nascimento</th>
            </tr>
          </thead>
        <tbody>
          <td>
            {objetoPessoa.CPF_PK}
            {/* <button
            onClick={() => {
              editPessoa("CPF_PK");
            }}
          >
            Editar CPF
          </button> */}
          </td>
          <td>
            {objetoPessoa.nome_pessoa}
            <button
              onClick={() => {
                editPessoa("nome_pessoa");
              }}
            >
              <FaPencilAlt size={15}/>
            </button>
          </td>
          <td>
            {objetoPessoa.telefone_pessoa}
            <button
              onClick={() => {
                editPessoa("telefone_pessoa");
              }}
            >
              <FaPencilAlt size={15}/>
            </button>
          </td>
          <td>
            {objetoPessoa.dt_nasc_pessoa}
            <button
              onClick={() => {
                editPessoa("dt_nasc_pessoa");
              }}
            >
              <FaPencilAlt size={15} />
            </button>
          </td>
        </tbody>
      </table>
    </div>
  );
}

export default Pessoa;
