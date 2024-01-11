import React, { useState, useEffect } from "react"


import "../styles/notes.css"

const Notes = () => {
    const [noteData, setNoteData] = useState([])

    const fetchNotes = () => {

    }

    /*Shortens the lenghts of texts to fit in the preview div
    */
    const handleNotes = (notes) => {
        let handledNotes = notes
        handledNotes.forEach(note => {
            if (note.header.length > 33) {
                let shortendHeader = note.header.slice(0, 33)
                note.header = shortendHeader + "..."
                console.log(shortendHeader + "...")
            }
            if (note.text.length > 100) {
                let shortendText = note.text.slice(0, 100)
                note.text = shortendText + "..."
            }
        })
        setNoteData(handledNotes)
    }

    const generateFakeNote = () => {
        let array = []
        for (let i = 0; i < 6; i++) {
            array.push({
                header: "Contrary to popular belief, Lorem Ipsum ",
                text: "itasdasdasdasdasdasdasdasaaaaaaaaaaaaaasdasdasdasdsa.lopulopulopuaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                timestamp: "1D"
            })
        }
        handleNotes(array)
    }

    return (
        <div className="notesContainer col-lg-3 col-md-12 p-0">
            <div
                className="createNote d-flex justify-content-center align-items-center"
                onClick={() => generateFakeNote()}
            >
                <h5>Write a note</h5>
            </div>

            {noteData.map((note) => (
                <div className="savedNote d-flex align-items-center p-3">
                    <h5 className="savedNoteTimestamp">{note.timestamp}</h5>
                    <div className="savedNoteTextContainer d-flex flex-column justify-content-start px-4">
                        <h4 className="savedNoteHeader">{note.header}</h4>
                        <h4 className="savedNotePreviewText">{note.text}</h4>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Notes;