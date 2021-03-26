import React, { useState } from "react";
import UserPool from "../Cognito_Config";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Input,
  Button,
  Alert,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { Auth } from 'aws-amplify';


var AmazonCognitoIdentity = require("amazon-cognito-identity-js");

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const [stage, setStage] = useState(1);
  const [confirmationCode, setConfirmationCode] = useState("");

  var atributos = [
    { Name: "name", Value: name },
    { Name: "phone_number", Value: phone_number },
  ];

  const onSubmit = (event) => {
    event.preventDefault();

    UserPool.signUp(email, password, atributos, null, (err, data) => {
      if (err) {
        setMensagemErro(err.message);
      } else {
        setStage(2);
      }
    });
  };

  const handleSubmitConfirmationSignUp = (event) => {
    event.preventDefault(event);
  
    Auth
        .confirmSignUp(email, confirmationCode)
        .then(() =>  window.location.href = "/login")
        .catch((err) => {
            console.log(err);
            alert("erro : " + err.message);
        });
        
   
}

  const user = UserPool.getCurrentUser();
  if (user) {
    user.signOut();
  }

  if (stage === 1) {
    return (
      <Row className="h-100 justify-content-center">
        <Col md={4} className="h-100 d-flex align-items-center">
          <Card className=" w-100 shadow">
            <CardBody className="mt-2">
              <CardTitle>
                <h5 className="pl-3">Criar Conta</h5>
              </CardTitle>

              <form onSubmit={onSubmit}>
                <Row className="justify-content-center ml-1 mr-1">
                  <Col md={12}>
                    {mensagemErro ? (
                      <Alert color="warning">{mensagemErro}</Alert>
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
                <Row className="justify-content-center ml-1 mr-1">
                  <Col md={12}>
                    <div>
                      <label>
                        <small>Nome de usuário</small>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        onChange={(event) => setName(event.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="justify-content-center pt-2 ml-1 mr-1">
                  <Col md={12}>
                    <div>
                      <label>
                        <small>Email</small>
                      </label>
                      <Input
                        className="form-control"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="justify-content-center pt-2 ml-1 mr-1">
                  <Col md={12}>
                    <div>
                      <label>
                        <small>Senha</small>
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="pt-2 ml-1 mr-1">
                  <Col md={12}>
                    <label>
                      <small>Número de telefone</small>
                    </label>
                    <Input
                      className="form-control"
                      type="text"
                      value={phone_number}
                      onChange={(event) => setPhone_number(event.target.value)}
                    />
                  </Col>
                </Row>

                <Row className="pt-4 ml-1 mr-1">
                  <Col md="6" className="">
                    <small>Já tem uma conta ?</small>
                    <Link to="/login">
                      <small className="text-primary pl-1">Entrar</small>
                    </Link>
                  </Col>
                  <Col md="6" className="">
                    <Button
                      type="submit"
                      color="primary"
                      className="w-100"
                      style={{ fontSize: "13px" }}
                    >
                      Criar conta
                    </Button>
                  </Col>
                </Row>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  } else {
    return (
      <>
        <Row className="h-100 justify-content-center">
          <Col md={4} className="h-100 d-flex align-items-center">
            <Card className=" w-100 shadow">
              <CardBody className="mt-2">
              <form onSubmit={handleSubmitConfirmationSignUp}>
                  <CardTitle className="ml-3 mr-3">
                    <h5 className="">Confirmar conta</h5>
                    <small className="text-primary">
                      Enviamos um código de confirmação para o email&nbsp;
                      <strong>{email}</strong>, digite o código
                      abaixo
                    </small>
                  </CardTitle>
                  <Row className="justify-content-center ml-1 mr-1">
                    <Col md={12}>
                      <div>
                        <label>
                          <small>Código de confirmação</small>
                        </label>
                        <Input
                          type="text"
                           value={confirmationCode}
                         onChange={(event) => setConfirmationCode(event.target.value)}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className="ml-1 mr-1 pt-3">
                    <Col md="6" className=""></Col>
                    <Col md="6" className="">
                      <Button
                        type="submit"
                        color="primary"
                        className="w-100"
                        style={{ fontSize: "13px" }}
                      >
                        Confirmar conta
                      </Button>
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
};
