import { React } from "react";
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import { Button, Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import './login.css'


const LoginPage = () => {
    const [show, setShow] = useState(true);
    const [form , setform] = useState({

            email: "",
            password: "",

    });

    useEffect(() => {
        
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form)
    }
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
            <Form onSubmit={handleSubmit} className="bateekh">
                 <p>Sign In</p>
                <Form.Group as={Row} controlId="email">
                    <Form.Label column sm={2}>
                    Email
                    </Form.Label>
                    <Col sm={8}>
                    <Form.Control type="email" placeholder="Email" onChange={(e)=> setform({...form, email: e.target.value})}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="password">
                    <Form.Label column sm={2}>
                    Password
                    </Form.Label>
                    <Col sm={8}>
                    <Form.Control type="password" placeholder="Password" onChange={(e)=> setform({...form, password: e.target.value})}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col sm={{ span: 20, offset: 5 }}>
                    <Button type="submit">Sign in</Button>
                    </Col>
                    <Col id="forgotlink" sm={{ span: 10, offset: 4 }}>
                        <a href="/login">Forget Password</a>
                    </Col>
                </Form.Group>
            </Form>
          </Modal>
        </div>
    )

}



export default LoginPage;