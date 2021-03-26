import React from "react";
import { Row, Col, Card, CardBody, CardTitle,  Button, Input, Label, Alert } from "reactstrap";

export default () => {
 
  
  return (
    <Row className="h-100 justify-content-center">
    <Col md={4} className="h-100 d-flex align-items-center">
        <Card className=" w-100 shadow">
            <CardBody className="mt-2">
            <form >
                <CardTitle className="ml-3 mr-3">
                    <h5 className="">Confirmar conta</h5>
                    <small className="text-primary">
                        Enviamos um código de confirmação para o email&nbsp;<strong>sanches_1971@hotmail.com</strong>, 
                        digite o código abaixo</small>
                </CardTitle>
                <Row className="justify-content-center ml-1 mr-1">
                    <Col md={12}>
                        <div>
                            <label><small>Código de confirmação</small></label>
                            <Input type="text" name="confirmationCode" id="codeConfirmationInput"/>

                        </div>
                    </Col>
                </Row>
                <Row className="ml-1 mr-1 pt-3">
                    <Col md="6" className="">
                    </Col>
                    <Col md="6" className="">
                        <Button  type="submit" color="primary" className="w-100" style={{ fontSize: "13px" }}>Confirmar conta</Button>
                    </Col>
                </Row>
                </form>
            </CardBody>
        </Card>
    </Col>
</Row>



  );
};
