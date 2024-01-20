import { onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebaseConfig.js";
import { useEffect, useState } from "react";

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
    const [removedNotesShow, setRemovedNotesShow] = useState(false)

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if (user) {
                setUserData({
                    uid: user.uid,
                    email: user.email
                })
                setIsSignIn(true)
                passNoteParameters()
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

    const passNoteParameters = (note) => {
        if (note === null) {
            setNoteHighlightSwitch(!noteHighlightSwitch)
        }
        setNote(note)
    }


        return (
            <div className="container-fluid h-100 position-relative" style={{ overflowX: "hidden" }}>
                <div className="row d-flex h-100">
                    {isSignIn ? null : <AuthenticationModal />}
                    <Sidebar 
                        createNewNote={passNoteParameters}
                        setRemovedNotesShow={setRemovedNotesShow}
                    />
                    <Notes
                        uid={userData.uid}
                        passNoteParameters={passNoteParameters}
                        email={userData.email}
                        signOut={handleSignOut}
                        noteHighlightSwitch={noteHighlightSwitch}
                        removedNotesShow={removedNotesShow}
                    />
                    <Writing 
                        uid={userData.uid} 
                        note={note}
                        isSignIn={isSignIn}
                        removedNotesShow={removedNotesShow}
                    />
                </div>
            </div>
        )
    }

export default App;