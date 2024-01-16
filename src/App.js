import { onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebaseConfig.js";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import AlertMsg from "./components/AlertMsg.js";

import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";
import Writing from "./components/Writing";
import AuthenticationModal from "./components/AuthenticationModal";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/styles.css"

const App = () => {
    const [isSignIn, setIsSignIn] = useState(true)
    const [userData, setUserData] = useState("")
    const [note, setNote] = useState("")
    const [noteHighlightSwitch, setNoteHighlightSwitch] = useState(false)

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if (user) {
                setUserData({
                    uid: user.uid,
                    email: user.email
                })
                setIsSignIn(true)
                const emptyNote = createEmptyNote()
                passNoteParameters(emptyNote)
            } else {
                setIsSignIn(false)
            }
        })
    }, [])

    const handleSignOut = () => {
        signOut(FIREBASE_AUTH).then(() => {
            setIsSignIn(false)
        }).catch((error) => {
            console.log(error)
        });
    }

    const createEmptyNote = () => {
        const newNoteId = uuidv4()
        const note = {
            header: "",
            text: "",
            timestamp: "1D",
            id: newNoteId
        }
        return note
    }

    const passNoteParameters = (note) => {
        if (!note) {
            note = createEmptyNote()
            setNoteHighlightSwitch(!noteHighlightSwitch)
        }
        setNote(note)
    }


        return (
            <div className="container-fluid h-100 position-relative" style={{ overflowX: "hidden" }}>
                {/* <AlertMsg /> */}
                <div className="row d-flex h-100">
                    {isSignIn ? null : <AuthenticationModal />}
                    <Sidebar createNewNote={passNoteParameters} />
                    <Notes
                        uid={userData.uid}
                        passNoteParameters={passNoteParameters}
                        email={userData.email}
                        signOut={handleSignOut}
                        noteHighlightSwitch={noteHighlightSwitch}
                    />
                    <Writing 
                        uid={userData.uid} note={note}
                        isSignIn={isSignIn}
                    />
                </div>
            </div>
        )
    }

export default App;