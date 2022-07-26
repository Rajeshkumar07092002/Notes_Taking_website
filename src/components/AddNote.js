import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Added successfully", "success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div className="my-3">
            <h2 style={{color:"rgb(30 37 52)"}}>Add a Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" onChange={onChange} value={note.title} className="form-control" aria-describedby="emailHelp" id="title" name="title" minLength={2} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" onChange={onChange} value={note.description} className="form-control" id="description" name="description" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" onChange={onChange} value={note.tag} className="form-control" id="tag" name="tag" />
                </div>

                <button style={{ backgroundColor: "#46143c", color: "#ffffff",width:"100%"}} disabled={note.title.length < 2 || note.description.length < 5} onClick={handleClick} type="submit" className="btn btn-primary">Add Note</button>
            </form>
        </div>
        </div>
    )
}

export default AddNote
