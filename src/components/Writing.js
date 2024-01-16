import React, { useState, useEffect } from "react";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { DB } from "../firebaseConfig.js";

import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleUp';
import "../styles/styles.css";

const Writing = ({ uid, note }) => {
    const [header, setHeader] = useState("")
    const [text, setText] = useState("")
    const [isNewNote, setIsNewNote] = useState(true)
    const [noteId, setNoteId] = useState(null)
    const [collapseOn,setCollapseOn] = useState(false)

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
        const currentDate = new Date()
        const formattedDate = currentDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        })

        if (header && text) {
            const ref = doc(DB, "Notes", uid)
            await updateDoc(ref, {
                notes: arrayUnion({
                    header: header,
                    text: text,
                    timestamp: formattedDate,
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
        <div className={`col-lg-8 col-12 ${collapseOn? "collapseOn" : null}`} style={{ borderLeft: "1px solid #B8C5CC", backgroundColor: "#0d6efd " }}>
            <div className="row d-block d-sm-none">
                <div className="col-12 py-2">
                    <ArrowCircleUpIcon
                        onClick={() => setCollapseOn(!collapseOn)}
                        sx={{fontSize: 40,color:"white"}}
                    />
                </div>
            </div>
            <div className="row h-75 g-0">
                <div className="col-10 py-5 p-3 m-0 h-100">
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
                <div className="col-2 pt-5 p-0">
                    <DeleteIcon className="deleteIcon" sx={{ fontSize: 40, color: "white" }} onClick={isNewNote ? null : deleteNote} />
                    <h5 className="saveButton" onClick={isNewNote ? saveNote : updateNote}>{isNewNote ? "Save" : "Update"}</h5>
                </div>
            </div>
        </div>
    );
}

export default Writing;