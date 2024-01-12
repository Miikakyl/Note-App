import { useState, useEffect } from 'react'
import { FIREBASE_AUTH } from "../firebaseConfig.js"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AuthenticationModal = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [authMessage, setAuthMessage] = useState("")

    useEffect(() => {
        setShow(true);
    }, [])


    const signIn = () => {
        signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user.uid)
            setShow(false)
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setAuthMessage(errorMessage);
          });
    }

    const signUp = () => {
        createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                setAuthMessage("Your registration is complete. Now Sign In")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setAuthMessage(errorMessage);
                // ..
            });
    }

    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Sign In / Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column">
                <h5>Email</h5>
                <input
                    className="authInputs mb-2"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <h5>Password</h5>
                <input
                    className="authInputs"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="d-flex justify-content-center align-items-center p-5">
                    <p>{authMessage}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={signIn}>
                    Sign In
                </Button>
                <Button variant="primary" onClick={signUp}>
                    Sign Up
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AuthenticationModal;