import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { BiTrash} from 'react-icons/bi';

function Home() {
  const [listaDePessoas, setlistaDePessoas] = useState([]);

  let history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:3001/pessoas", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setlistaDePessoas(response.data);
        }
      });
  }, []);

  const deletarPessoa = (CPF_PK) => {
    axios
    .delete(`http://localhost:3001/pessoas/${CPF_PK}`)
    .then(() => {
      window.location.reload(); 
      alert("DELETADO COM SUCESSO");
    });
  };

  const editarPessoa = (option) => {
    if(option === "CPF_PK"){
      let edit = prompt("Digite um novo nome: ")
    }else{

    }
  }

  return (
    <div className="pessoa">
      <div>
        <table className="pessoa " width="100%">
          <thead>
            <tr>
              <th scope="col">CPF</th>
              <th scope="col">Nome</th>
              <th scope="col">Telefone</th>
              <th scope="col">Data Nascimento</th>
              <th scope="col">Funções</th>
            </tr>
          </thead>
          <tbody>
            {listaDePessoas.map((value, key) => (
              <tr key={key.CPF_PK}>
                <th scope="row">{value.CPF_PK}</th>
                <td>{value.nome_pessoa}</td>
                <td>{value.telefone_pessoa}</td>
                <td>{value.dt_nasc_pessoa}</td>
                <td>
                  <button
                    onClick={() => {
                      history.push(`/pessoa/${value.CPF_PK}`);
                    }}
                  >
                    Vizualizar
                  </button>
                  <button 
                    onClick={() => {
                      deletarPessoa(value.CPF_PK);
                    }}
                  >
                    <BiTrash size={20}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
