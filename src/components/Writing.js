import React, { useState, useEffect } from "react";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { DB } from "../firebaseConfig.js";

import "../styles/writing.css";
import DeleteIcon from '@mui/icons-material/Delete';

const Writing = ({ uid, note }) => {
    const [header, setHeader] = useState("")
    const [text, setText] = useState("")
    const [isNewNote, setIsNewNote] = useState(true)
    const [noteId, setNoteId] = useState(null)

    /*When opening saved note header and text values are added*/
    useEffect(() => {
        setIsNewNote(true)

        setNoteId(note.id)
        setHeader(note.header)
        setText(note.text)
        if (note.header && note.text) {
            setIsNewNote(false)
        }
    }, [note])

    const saveNote = async () => {
        if (header && text) {
            const ref = doc(DB, "Notes", uid)
            await updateDoc(ref, {
                notes: arrayUnion({
                    header: header,
                    text: text,
                    timestamp: "1D",
                    id: noteId
                })
            });
            setIsNewNote(false)
        }
    }

    const updateNote = async () => {
        const ref = doc(DB, "Notes", uid);

        const docSnap = await getDoc(ref);

        const noteArray = docSnap.data().notes
        const indexOfUpdatableNote = noteArray.findIndex((note) => note.id === noteId)
        noteArray[indexOfUpdatableNote].header = header
        noteArray[indexOfUpdatableNote].text = text

        await updateDoc(ref, {
            notes: noteArray
        })

    }

    const deleteNote = async () => {
        const ref = doc(DB, "Notes", uid);

        const docSnap = await getDoc(ref);

        const noteArray = docSnap.data().notes
        const updatedNoteArray = noteArray.filter((note) => note.id !== noteId)

        console.log(updatedNoteArray)

        await updateDoc(ref, {
            notes: updatedNoteArray
        })
        setHeader("")
        setText("")
        setIsNewNote(true)
    }

    return (
        <div className="col-lg-8 col-md-12" style={{ borderLeft: "1px solid #B8C5CC", backgroundColor: "#5500FF" }}>
            <div className="row h-75 g-0">
                <div className="col-11 py-5 p-3 m-0 h-100">
                    <input
                        className="headerSection mb-2"
                        placeholder="a new note"
                        value={header}
                        onChange={(e) => setHeader(e.target.value)}
                    />
                    <textarea
                        className="textSection"
                        placeholder="Start writing here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="col-1 pt-5">
                    <DeleteIcon className="deleteIcon" sx={{ fontSize: 40, color: "white" }} onClick={isNewNote ? null : deleteNote} />
                    <h5 className="saveButton" onClick={isNewNote ? saveNote : updateNote}>{isNewNote ? "Save" : "Update"}</h5>
                </div>
            </div>
        </div>
    );
}

export default Writing;