import React, { useState, useEffect } from "react"
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore"
import { DB } from "../firebaseConfig.js"
import { v4 as uuidv4 } from 'uuid'

import DeleteIcon from '@mui/icons-material/Delete'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleUp'

import "../styles/styles.css"

const Writing = ({ uid, note, removedNotesShow }) => {
    const [header, setHeader] = useState("")
    const [text, setText] = useState("")
    const [isNewNote, setIsNewNote] = useState(true)
    const [noteId, setNoteId] = useState(null)
    const [collapseOn, setCollapseOn] = useState(false)

    /*When opening saved note header and text values are added*/
    useEffect(() => {
     
        if (note?.header && note?.text) {
            console.log("header and text")
            setIsNewNote(false)
            setNoteId(note.id)
            setHeader(note.header)
            setText(note.text)
        }
        else {
            createEmptyNote()
        }
    }, [note])

    const createEmptyNote = () => {
        const newNoteId = uuidv4()
        const note = {
            header: "",
            text: "",
            timestamp: "1D",
            id: newNoteId
        }

        setIsNewNote(true)
        setNoteId(note.id)
        setHeader(note.header)
        setText(note.text)
    }

    const saveNote = async () => {
        const ref = doc(DB, "Notes", uid)
        const currentDate = new Date()
        const formattedDate = currentDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        })

        /*If the text doesn't have both text and header it won't be saved */
        if (header && text) {
            await updateDoc(ref, {
                notes: arrayUnion({
                    header: header,
                    text: text,
                    timestamp: formattedDate,
                    id: noteId
                })
            });
            createEmptyNote()
        }
    }

    const updateNote = async () => {
        const ref = doc(DB, "Notes", uid)
        const docSnap = await getDoc(ref)

        const noteArray = docSnap.data().notes
        const indexOfUpdatableNote = noteArray.findIndex((note) => note.id === noteId)
        noteArray[indexOfUpdatableNote].header = header
        noteArray[indexOfUpdatableNote].text = text

        await updateDoc(ref, {
            notes: noteArray
        })
    }

    /*First the note is deleted from Notes property and then moved to removed*/
    const removeNote = async () => {
        const ref = doc(DB, "Notes", uid)
        const docSnap = await getDoc(ref)

        const noteArray = docSnap.data().notes
        const updatedNoteArray = noteArray.filter((note) => note.id !== noteId)
        const removedItem = noteArray.filter((note) => note.id === noteId)

        await updateDoc(ref, {
            notes: updatedNoteArray,
            removed: arrayUnion(
                removedItem[0]
            )
        })
        createEmptyNote()
    }

    const restoreNote = async () => {
        const ref = doc(DB, "Notes", uid)
        const docSnap = await getDoc(ref)

        const removedArray = docSnap.data().removed
        const updatedRemovedArray = removedArray.filter((note) => note.id !== noteId)

        await updateDoc(ref, {
            notes: arrayUnion(note),
            removed: updatedRemovedArray
        })
        createEmptyNote()
    }

    const deleteNote = async () => {
        const ref = doc(DB, "Notes", uid)
        const docSnap = await getDoc(ref)

        const removedArray = docSnap.data().removed
        const updatedRemovedArray = removedArray.filter((note) => note.id !== noteId)

        await updateDoc(ref, {
            removed: updatedRemovedArray
        })
        createEmptyNote()
    }

    return (
        <div className={`col-lg-8 col-12 bg-primary writingContainer ${collapseOn ? "collapseOn" : null}`}>
            <div className="row d-block d-sm-none">
                <div className="col-12 py-2">
                    <ArrowCircleUpIcon
                        onClick={() => setCollapseOn(!collapseOn)}
                        sx={{ fontSize: 40, color: "white" }}
                    />
                </div>
            </div>
            <div className="row h-75 g-0">
                <div className="col-10 py-5 p-3 m-0 h-100">
                    <input
                        disabled={removedNotesShow ? true : false}
                        className="headerSection mb-2 bg-primary"
                        placeholder={removedNotesShow ? "Select the note" : "a new note"}
                        value={header}
                        onChange={(e) => setHeader(e.target.value)}
                    />
                    <textarea
                        disabled={removedNotesShow ? true : false}
                        className="textSection bg-primary"
                        placeholder={removedNotesShow ? "you want to restore or delete" : "Start writing here..."}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="col-2 pt-5 p-0">
                    <DeleteIcon className="deleteIcon" sx={{ fontSize: 40, color: "white" }} onClick={removedNotesShow ? deleteNote : (isNewNote ? null : removeNote)} />
                    <h5 className="saveButton" onClick={removedNotesShow ? restoreNote : (isNewNote ? saveNote : updateNote)}>
                        {removedNotesShow ? "Restore" : (isNewNote ? "Save" : "Update")}
                    </h5>
                </div>
            </div>
        </div>
    );
}

export default Writing;