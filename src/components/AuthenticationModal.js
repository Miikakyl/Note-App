import { useState, useEffect } from 'react';
import { FIREBASE_AUTH } from "../firebaseConfig.js"
import { DB } from "../firebaseConfig.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

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
                setShow(false)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code
                let errorMessage = ''
                
                switch (errorCode) {
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email address'
                        break;
                    case 'auth/invalid-credential':
                        errorMessage = 'Wrong email or password'
                        break;
                    default:
                        errorMessage = 'An error occurred. Please try again.'
                        break;
                }
                setAuthMessage(errorMessage)
            });
    }

    const signUp = () => {
        createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                setAuthMessage("Your registration is complete. Now Sign In")
                createNoteDocument(user.uid)
            })
            .catch((error) => {
                const errorCode = error.code
                let errorMessage = ''

                switch (errorCode) {
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email address'
                        break;

                    case 'auth/email-already-in-use':
                        errorMessage = 'This email is already in use'
                        break;
                    case 'auth/weak-password':
                        errorMessage = 'This password is too weak, please write password that is minimum 6 characters'
                        break;
                    default:
                        errorMessage = 'An error occurred. Please try again.'
                        break;
                }
                setAuthMessage(errorMessage)
            });
    }

    /*Creates document that holds user's deleted and saved notes. Document name is equal to user's uid*/
    const createNoteDocument = async (uid) => {
        await setDoc(doc(DB, "Notes", uid), {
            notes: [],
            removed: []
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