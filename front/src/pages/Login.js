import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {AuthContext} from "../helpers/AuthContext";


function Login() {
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const { setAuthState } = useContext(AuthContext);


  let history = useHistory();

  const login = () => {
    const data = { username: username, senha: senha };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if(response.data.error){
        alert(response.data.error);
      } else {
        localStorage.setItem("token", response.data)
        setAuthState(true)
        
        history.push("/");
      }
    });
  };
  return (
    <div className="loginContainer">
      <label>Nome de Usuário:</label>
      <input
        type="text"
        placeholder="Nome de usuário"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <br></br>
      <label>Senha:</label>
      <input
        placeholder="Senha"
        type="password"
        onChange={(event) => {
          setSenha(event.target.value);
        }}
      />

      <button onClick={login}> Entrar</button>
    </div>
  );
}

export default Login;
