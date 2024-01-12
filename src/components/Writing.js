import React, { useState, useEffect} from "react";
import "../styles/writing.css"
import DeleteIcon from '@mui/icons-material/Delete';

const Writing = () => {
    const [header, setHeader] = useState("")
    const [text, setText] = useState("")

    useEffect(() => {
     
    }, [])

    const saveNote = () => {
        
    }
    
    return (
        <div className="col-lg-7 col-md-12" style={{ borderLeft: "1px solid #B8C5CC" }}>
            <div className="row h-75 g-0">
                <div className="col-11 py-5 p-3 m-0 h-100">
                    <input 
                        className="headerSection mb-2"
                        placeholder="Header"
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
                    <DeleteIcon className="deleteIcon" sx={{ fontSize: 40, color: "#B8C5CC" }}/>
                    <h5 className="saveButton">Save</h5>
                </div>
            </div>
        </div>
    );
}

export default Writing;