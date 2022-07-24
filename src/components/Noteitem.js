import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Noteitem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context
    const { note, updateNote } = props;
    return (
        <>
            <div className="col-md-3">
                <div className="card my-3">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title" style={{color:"#582c"}}>{note.title}</h5>
                            <DeleteIcon  style={{ cursor: "pointer",marginLeft: "auto",color:"#e33307" }} onClick={() => { deleteNote(note._id); props.showAlert("Deleted successfully", "success") }} />
                            <EditIcon  style={{ cursor: "pointer",marginLeft: "1px",color:"#ff5a00" }} onClick={() => { updateNote(note) }} />
                        </div>
                        <p className="card-text" style={{color:"blue"}}>  {note.description}  </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem
