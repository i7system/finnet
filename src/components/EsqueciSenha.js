import React, { useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import Pool from "../Cognito_Config";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  Input,
  Label,
  Alert,
} from "reactstrap";
import{Link} from 'react-router-dom'

export default () => {
  const [stage, setStage] = useState(1); // 1 = email stage, 2 = code stage
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  const getUser = () => {
    return new CognitoUser({
      Username: email.toLowerCase(),
      Pool,
    });
  };

  const sendCode = (event) => {
    event.preventDefault();

    getUser().forgotPassword({
      onSuccess: (data) => {
        console.log("onSuccess:", data);
      },
      onFailure: (err) => {
        console.error("onFailure:", err);
      },
      inputVerificationCode: (data) => {
        console.log("Input code:", data);
        setStage(2);
      },
    });
  };

  const resetPassword = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords are not the same");
      setMensagemErro("Passwords are not the same");
      return;
    }

    getUser().confirmPassword(code, password, {
      onSuccess: (data) => {
        window.location.href = "/login";
      },
      onFailure: (err) => {
        console.error("onFailure:", err);
        setMensagemErro(err.message);
      },
    });
  };

  return (
    <>
      {stage === 1 && (
        <Row className="h-100 justify-content-center">
          <Col md={4} className="h-100 d-flex align-items-center">
            <Card className=" w-100 shadow">
              <CardBody className="mt-2">
                <form onSubmit={sendCode}>
                  <CardTitle className="ml-3 mr-3">
                    <h5 className="">Esqueci Senha</h5>
                    <small className="text-primary">
                      Informe seu email abaixo e enviaremos um código de
                      confirmação, para sua senha ser redefinida
                    </small>
                  </CardTitle>
                  <Row className="justify-content-center ml-1 mr-1">
                    <Col md={12}>
                      <div>
                        <label>
                          <small>Email</small>
                        </label>
                        <Input
                          type="text"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className="ml-1 mr-1 pt-3">
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
                        Enviar
                      </Button>
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}

      {stage === 2 && (
        <Row className="h-100 justify-content-center">
          <Col md={4} className="h-100 d-flex align-items-center">
            <Card className=" w-100 shadow">
              <CardBody className="mt-2">
                <form onSubmit={resetPassword}>
                  <CardTitle className="ml-3 mr-3">
                    <h5 className="">Nova Senha</h5>
                    <small className="text-primary">
                      Digite o codigo que foi enviado no seu email para
                      redefinir sua senha
                    </small>
                  </CardTitle>
                  <Row className="justify-content-center ml-1 mr-1">
                    <Col md={12}>
                    {mensagemErro ? <Alert color="warning">{mensagemErro}</Alert> : <></>}
                    </Col>
                  </Row>
                  <Row className="justify-content-center ml-1 mr-1">
                    <Col md={12}>
                      <div>
                        <label>
                          <small>Código</small>
                        </label>
                        <Input
                          type="text"
                          value={code}
                          onChange={(event) => setCode(event.target.value)}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className="justify-content-center ml-1 mr-1">
                    <Col md={12}>
                      <div>
                        <label>
                          <small>Nova senha</small>
                        </label>
                        <Input
                          type="text"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className="justify-content-center ml-1 mr-1">
                    <Col md={12}>
                      <div>
                        <label>
                          <small>Confirmar senha</small>
                        </label>
                        <Input
                          type="text"
                          value={confirmPassword}
                          onChange={(event) =>
                            setConfirmPassword(event.target.value)
                          }
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
                        Enviar
                      </Button>
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};
