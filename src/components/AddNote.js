import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
const AddNote = (props) => {
    const context = useContext(NoteContext)
    const { addNote } = context

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleonClick = (e) => {
        e.preventDefault()
        addNote(note.title,note.description,note.tag)
        setNote({ title: "", description: "", tag: "" })
        props.setProgress(100)
        props.showAlert('Note Added Successfully...!','success')
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" name='title' onChange={onChange} value={note.title}  minLength={5} required className="form-control" id="title" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" onChange={onChange} value={note.description} minLength={5} required name='description' className="form-control" id="description" />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" onChange={onChange} value={note.tag} minLength={5} required name='tag' className="form-control" id="tag" />
                </div>
                
                <button disabled={note.title.length<5 || note.description.length<5|| note.tag.length<5} type="submit" className="btn btn-primary" onClick={handleonClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
