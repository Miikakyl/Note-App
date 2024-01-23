import React, { useState, useEffect, useRef } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { DB } from "../firebaseConfig.js"
import { motion } from "framer-motion"

import "../styles/styles.css";

const Notes = ({ uid, passNoteParameters, email, signOut, noteHighlightSwitch, removedNotesShow }) => {
    const [noteData, setNoteData] = useState(false)
    const [currentUser, setCurrentUser] = useState("")
    const [selectedNote, setSelectedNote] = useState(null)


    useEffect(() => {
        if (uid) {
            const ref = doc(DB, 'Notes', uid)
            setCurrentUser(email)
            const unsubscribe = onSnapshot(ref, (doc) => {

                if (doc.exists()) {
                    const response = doc.data()
                    if (removedNotesShow) {
                        handleNotes(response ? response.removed : null)
                        setSelectedNote(null)
                    }
                    else {
                        handleNotes(response ? response.notes : null)
                    }

                }
                else {
                    setNoteData(null);
                }
            });
            return () => unsubscribe();
        }
    }, [uid, removedNotesShow])


    /* When user click new note button the highlight of the selected note is disabled */
    useEffect(() => {
        setSelectedNote(null)
    }, [noteHighlightSwitch])


    const handleNoteClick = (note) => {
        passNoteParameters(note)
        setSelectedNote(note.id)
    }

    /*Creates preview properties from text and header properties to fit in the preview div
    */
    const handleNotes = (notes) => {
        let handledNotes = notes
        
        if (handledNotes) {
            handledNotes.forEach(note => {
                if (note.header.length > 22) {
                    let shortendHeader = note.header.slice(0, 22)
                    note.preHeader = shortendHeader + "..."
                }
                if (note.text.length > 85) {
                    let shortendText = note.text.slice(0, 85)
                    note.preText = shortendText + "..."
                }
                if (note.text.length < 85) {
                    note.preText = note.text
                }
                if (note.header.length < 22) {
                    note.preHeader = note.header
                }
            })
            setNoteData(handledNotes.reverse())
        }
    }

    return (
        <div className="notesContainer col-lg-3 col-md-12 px-3">
            <div className="topBar px-3 py-5 d-flex justify-content-between position-sticky">
                <h4 className="currentUser">{currentUser}</h4>
                <h4
                    onClick={() => signOut()}
                    className="signOutButton">Sign Out
                </h4>
            </div>
            <h4>{removedNotesShow ? "Removed Notes" : "Saved Notes"}</h4>

            {noteData && noteData.map((note) => (
                <motion.div
                    initial={{ opacity: 0, y: "50px" }}
                    animate={{ opacity: 1, y: "0px" }}
                    className={`savedNote d-flex align-items-center p-3 mb-3 ${selectedNote === note.id ? (removedNotesShow ? "selectedDeleted" : "selectedSaved") : ""
                        }`}
                    onClick={() => handleNoteClick(note)}
                    key={note.id}
                >
                    <h5 className="savedNoteTimestamp">{note.timestamp}</h5>
                    <div className="savedNoteTextContainer d-flex flex-column justify-content-start px-4">
                        <h4 className="savedNotePreviewHeader"
                        >{note.preHeader}
                        </h4>
                        <h4 className="savedNotePreviewText">{note.preText}</h4>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

export default Notes;