import { React } from "react";
import { useState, useEffect, useRef } from "react";
import Form from 'react-bootstrap/Form'
import { Button, Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import './login.css'


const LoginPage = () => {
    const [show, setShow] = useState(true);
    const rememberemail = useRef("");
    const rememberpass = useRef("");
    const remembercheck = useRef("");


    const [form , setform] = useState({

            email: "",
            password: "",
            check: false

    });

    const Storage = localStorage

    useEffect(() => {
        console.log(Storage.check)
        
        if(Storage.check != false && Storage.email != "" && Storage.email !== undefined){
                rememberemail.current.value = Storage.email
                rememberpass.current.value = Storage.password
                remembercheck.current.checked = Storage.check
        }
        console.log(rememberemail.current.value)
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, check } = form
        if (check && email !== "") {
            Storage.email = email
            Storage.password = password
            Storage.check = check
        }else {
            Storage.clear();
        }
        //console.log(rememberemail.current.value)
        console.log(rememberemail.current.value, rememberpass.current.value, remembercheck.current.checked)
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
                    <Form.Control type="email" placeholder="Email" onChange={(e)=> setform({...form, email: e.target.value})} ref={rememberemail} value={rememberemail.current.value}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="password">
                    <Form.Label column sm={2}>
                    Password
                    </Form.Label>
                    <Col sm={8}>
                    <Form.Control type="password" placeholder="Password" onChange={(e)=> setform({...form, password: e.target.value})} ref={rememberpass} value={rememberpass.current.value}/>
                    </Col>
                </Form.Group>
               
                <Form.Group as={Row} controlId="remember">
                    <Col sm={{ span: 8, offset: 2 }}>
                    <Form.Check label="Remember me" onChange={(e)=> setform({...form, check: e.target.checked})} ref={remembercheck} value={remembercheck.current.checked} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col sm={{ span: 20, offset: 5 }}>
                    <Button type="submit">Sign in</Button>
                    </Col>
                    <Col id="forgotlink" sm={{ span: 10, offset: 4 }}>
                        <a href="#">Forget Password</a>
                    </Col>
                </Form.Group>
            </Form>
          </Modal>
        </div>
    )

}



export default LoginPage;