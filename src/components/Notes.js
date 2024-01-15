import React, { useState, useEffect } from "react"
import { doc, onSnapshot } from "firebase/firestore";
import { DB } from "../firebaseConfig.js";

import "../styles/notes.css"

const Notes = ({ uid, passNoteParameters}) => {
    const [noteData, setNoteData] = useState([])
    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
        if (uid) {
            const ref = doc(DB, 'Notes', uid);

            const unsubscribe = onSnapshot(ref, (doc) => {
                if (doc.exists()) {
                    handleNotes(doc.data().notes)
                } else {
                    setNoteData(null);
                }
            });

            return () => unsubscribe();
        }
    }, [uid])

    const handleNoteClick = (note) => {
        passNoteParameters(note)
        setIsSelected(true)
    }

    /*Creates preview properties from text and header properties to fit in the preview div
    */
    const handleNotes = (notes) => {
        let handledNotes = notes
        handledNotes.forEach(note => {
            if (note.header.length > 33) {
                let shortendHeader = note.header.slice(0, 33)
                note.preHeader = shortendHeader + "..."
                console.log(note.preHeader)
            }
            if (note.text.length > 100) {
                let shortendText = note.text.slice(0, 100)
                note.preText = shortendText + "..."
            }
            else {
                note.preHeader = note.header
                note.preText = note.text
            }
        })
        setNoteData(handledNotes.reverse())
    }


    return (
        <div className="notesContainer col-lg-3 col-md-12 p-0">
            <div
                className="createNote d-flex justify-content-center align-items-center"
                onClick={() => passNoteParameters(null)}
            >
                <h5>Write a note</h5>
            </div>

            {noteData.map((note) => (
                <div 
                    className="savedNote d-flex align-items-center p-3"
                    onClick={() => handleNoteClick(note)}
                    key={note.id}
                    >
                    <h5 className="savedNoteTimestamp">{note.timestamp}</h5>
                    <div className="savedNoteTextContainer d-flex flex-column justify-content-start px-4">
                        <h4 className="savedNoteHeader">{note.preHeader}</h4>
                        <h4 className="savedNotePreviewText">{note.preText}</h4>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Notes;