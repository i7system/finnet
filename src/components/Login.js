import React, { useState, useContext } from "react";
import "../../src/index.css";
import { AccountContext } from "./Accounts";
import Pool from "../Cognito_Config";
import { Row, Col, Card, CardBody, CardTitle,  Button, Input, Label, Alert } from "reactstrap";
import {Link} from 'react-router-dom'

// bom dia

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");


  const { authenticate } = useContext(AccountContext);
  const onSubmit = (event) => {
    event.preventDefault();
    authenticate(email, password)
      .then((data) => {
        console.log("Logged in!", data);
        alert("Você está logado");
        window.location.href = "/home"
      })
      .catch((err) => {
        console.error("Failed to login!", err);
        setMensagemErro(err.message);
      });
  };
  const user = Pool.getCurrentUser();
  if (user) {
    user.signOut();
  }
  
  return (

<Row className="h-100 justify-content-center">

<Col md={4} className="h-100 d-flex align-items-center">
  <Card className=" w-100 shadow" >
    <CardBody className="mt-1">
      <CardTitle>
        <h2 className="text-center">Login</h2>
      </CardTitle>
      <Row>
        <Col md={12}>
        {!mensagemErro ? <></> : <Alert color="warning"  className="ml-2 mr-2">{mensagemErro}</Alert>}
        </Col>
      </Row>
      <form onSubmit={onSubmit}>
      <Row className="justify-content-center">
        <Col md={12}>
          <div className="ml-3 mr-3">
            <label>Email</label>
            <Input type="text" value={email}
          onChange={(event) => setEmail(event.target.value)} />

          </div>
        </Col>
      </Row>
      <Row className="justify-content-center pt-3">
        <Col md={12}>
          <div className="ml-3 mr-3">
            <label>Senha</label>
            <Input type="password" value={password}
          onChange={(event) => setPassword(event.target.value)} />


          </div>
        </Col>
      </Row>
      <Row className="justify-content-center ml-4 mr-3">
        <Col className="mt-2" md={12}>
          <input defaultChecked type="checkbox" className="form-check-input" id="rememberMeSignInInput"  />
          <Label><small className="pl-2" style={{fontSize: "12px"}}>Lembrar-me</small></Label>
        </Col>
      </Row>
      <Row className="justify-content-center ml-1 mr-3">
        <Col className="mt-2" md={12}>
          <small>Esqueceu sua senha ?</small>
          <small className="text-info pl-1">
            <Link to="/esquecisenha">Redefinir senha</Link>
          </small>
        </Col>
      </Row>
      <Row className="ml-1 mt-2">
        <Col md="6" className=" mt-1">
          <small>Sem conta ?</small>
          <small className="text-info pl-1">
            <Link to="/criarconta">Criar conta</Link>
          </small>
        </Col>
        <Col md="6" className="">

          <Button  type="submit"
            color="primary"
            className="w-100"
            style={{ fontSize: "13px" }}>Entrar
          </Button>

        </Col>
      </Row>
      </form>
    </CardBody>
  </Card>
</Col>

</Row>




  );
};
