import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Cadastro() {
  const valoresIniciais = {
    username: "",
    senha: "",
  };

  const validacao = Yup.object().shape({
    username: Yup.string().required("O Username não foi informado !!"),
    senha: Yup.string().required("Por favor informe sua senha!"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((response) => {
      console.log(data);
  });
  };

  return (
    <div className="formulario">
      <Formik
        initialValues={valoresIniciais}
        onSubmit={onSubmit}
        validationSchema={validacao}
      >
        <Form className="formConteiner">
          <label>Usuário: </label>
          <ErrorMessage name="username" component="span" />
          <br></br>
          <Field
            id="inputNew"
            name="username"
            placeholder="Nome de usuário"
          />
          <br></br>

          <label>Senha: </label>
          <ErrorMessage name="senha" component="span" />
          <br></br>
          <Field
            id="inputNew"
            type="password"
            name="senha"
            placeholder="Senha"
          />

          <br></br>
          <button type="submit"> Cadastrar </button>
          <br></br>
        </Form>
      </Formik>
    </div>
  );
}

export default Cadastro;
