import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

function New() {

  let history = useHistory();

  const valoresIniciais = {
    CPF_PK: "",
    nome_pessoa: "",
    telefone_pessoa: "",
    dt_nasc_pessoa: "",
  };

  const validacao = Yup.object().shape({
    CPF_PK: Yup.string().required("O CPF é obrigatório!!"),
    nome_pessoa: Yup.string().required("Por favor Digite seu nome completo!"),
    telefone_pessoa: Yup.string().required("Por favor Digite seu telefone junto ao DDD!"),
    dt_nasc_pessoa: Yup.date().required("A data de nascimetno deve ser escrita da seguinte forma: ano-mes-dia"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/pessoas", data).then((response) => {
      history.push('/')
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
          <label>CPF: </label>
          <ErrorMessage name="CPF_PK" component="span"/>
          <br></br>
          <Field
            id="inputNew"
            name="CPF_PK"
            placeholder="Ex.: 000.000.000-00"
          />
          <br></br>
          <label>Nome: </label>
          <ErrorMessage name="nome_pessoa" component="span"/>
          <br></br>
          <Field
            id="inputNew"
            name="nome_pessoa"
            placeholder="Digite Seu Nome Completo"
          />
          <br></br>
          <label>Telefone: </label>
          <ErrorMessage name="telefone_pessoa" component="span"/>
          <br></br>
          <Field
            id="inputNew"
            name="telefone_pessoa"
            placeholder="Ex.: (00) 00000-0000"
          />
          <br></br>
          <label>Data de Nascimento: </label>
          <br></br>
          <ErrorMessage name="dt_nasc_pessoa" component="span"/>
          <Field
            id="inputNew"
            name="dt_nasc_pessoa"
            placeholder="ano-mês-dia"
          />
          <br></br>
          <button type="submit"> Confirmar </button>
          <br></br>
        </Form>
      </Formik>
    </div>
  );
}

export default New;
