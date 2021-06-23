import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";

import { BiLogOut} from 'react-icons/bi';

import Home from "./pages/Home";
import New from "./pages/New";
import Pessoa from "./pages/Pessoa";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import PrivateRoute from "./privateRoute";


function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState(false)
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">

            {!authState ? (
              <>
                <Link to="/login">Logar</Link>
                <Link to="/cadastro">Cadastrar</Link>
              </>
            ) : (
              <>
              <Link to="/">Voltar para Lista</Link>
              <Link to="/Novo">Criar nova pessoa</Link>
              <button className="botaoSaida" onClick={logout}><BiLogOut/> Sair</button>
              </>
            )}

          </div>

          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/Novo" component={New} />
            <PrivateRoute exact path="/pessoa/:CPF_PK" component={Pessoa} />

            <Route exact path="/cadastro" component={Cadastro} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
