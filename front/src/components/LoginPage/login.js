import { React } from "react";
import { useState } from "react";
import Form from 'react-bootstrap/Form'
import { Button, Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import './login.css'


const LoginPage = () => {
    const [show, setShow] = useState(true);

    return (
        <div>
        <Modal
        show={show}
        onHide={() => setShow(false)}
        size="xl"
        aria-labelledby="example-modal-sizes-title-lg"
        className="signin" >
        <Modal.Header closeButton >
        </Modal.Header>
            <Form className="bateekh">
                 <p>Sign In</p>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                    Email
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="email" placeholder="Email" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                    Password
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="password" placeholder="Password" />
                    </Col>
                </Form.Group>
               
                <Form.Group as={Row} controlId="formHorizontalCheck">
                    <Col sm={{ span: 10, offset: 2 }}>
                    <Form.Check label="Remember me" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit">Sign in</Button>
                    </Col>
                    <Col id="forgotlink" sm={{ span: 10, offset: 2 }}>
                        <a href="#">Forget Password</a>
                    </Col>
                </Form.Group>
            </Form>
          </Modal>
        </div>
    )

}



export default LoginPage;