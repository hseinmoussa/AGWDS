import { React } from "react";
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import { Button, Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom";
import './login.css';




const ForgotPass = () => {
    const [show, setShow] = useState(true);
    const [form , setform] = useState({

            email: "",
            password: "",

    });
    const cookieEnabled = navigator.cookieEnabled;
    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
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
                <Form.Group as={Row} controlId="email">
                    <Form.Label column sm={2}>
                    Verify Email
                    </Form.Label>
                    <Col sm={8}>
                    <Form.Control type="email" placeholder="Email" onChange={(e)=> setform({...form, email: e.target.value})}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 20, offset: 5 }}>
                    <Button type="submit">Reset</Button>
                    </Col>
                </Form.Group>
            </Form>
          </Modal>
        </div>
    )
}



export default ForgotPass;