import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from "react-router-dom";

export const Notes = (props) => {
    const context = useContext(NoteContext);
    const { Notes, getNotes, editNote } = context;
    let usenavigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            props.setProgress(100);
            getNotes();
        } else {
            usenavigate('/login');
        }
    }, []);

    const ref = useRef(null);
    const refclose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "", eimages: [] });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag,
            eimages: currentNote.images || []
        });
    };

    const handleonClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag, note.eimages);
        refclose.current.click();
        props.setProgress(100);
        props.showAlert('Updated Successfully...!', 'success');
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setNote({ ...note, eimages: Array.from(e.target.files) });
    };

    return (
        <>
            <AddNote showAlert={props.showAlert} setProgress={props.setProgress} />

            <button ref={ref} hidden type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" value={note.etitle} name='etitle' onChange={onChange} minLength={5} required className="form-control" id="etitle" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" value={note.edescription} onChange={onChange} minLength={5} required name='edescription' className="form-control" id="edescription" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" value={note.etag} onChange={onChange} minLength={5} required name='etag' className="form-control" id="etag" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="images" className="form-label">Images</label>
                                    <input type="file" multiple onChange={handleFileChange} name="images" className="form-control" id="images" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5 || note.etag.length < 5} onClick={handleonClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row ">
                <h2>Your Notes</h2>
                <div className="container mx-3"> {Notes.length === 0 && 'No Notes to display'}</div>

                {Notes.map((note) => {
                    return <NoteItem setProgress={props.setProgress} key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
        </>
    );
};

export default Notes;

// import React, { useContext, useEffect, useRef, useState } from 'react'
// import NoteContext from '../context/notes/NoteContext';
// import NoteItem from './NoteItem';
// import AddNote from './AddNote';
// import { useNavigate } from "react-router-dom";
// export const Notes = (props) => {

//     const context = useContext(NoteContext)
//     const { Notes, getNotes, editNote } = context
//     let usenavigate = useNavigate();
//     useEffect(() => {
//         if (localStorage.getItem('token')) {
//             // console.log(localStorage.getItem('token'))
//             props.setProgress(100)
//             getNotes()
//             // eslint-disable-next-line
//         }
//         else {
//             usenavigate('/login')
//         }

//     }, [])
//     const updateNote = (currentNote) => {
//         ref.current.click()
//         setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

//     }
//     const ref = useRef(null)
//     const refclose = useRef(null)
//     const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
//     const handleonClick = (e) => {

//         editNote(note.id, note.etitle, note.edescription, note.etag)
//         // e.preventDefault()
//         refclose.current.click()
//         props.setProgress(100)
//         props.showAlert('updated Successfully...!', 'success')
//     }
//     const onChange = (e) => {
//         setNote({ ...note, [e.target.name]: e.target.value })
//     }

//     return (
//         <>
//             <AddNote showAlert={props.showAlert} setProgress={props.setProgress} />

//             <button ref={ref} hidden type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
//                 Launch demo modal
//             </button>


//             <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body">
//                             <form>
//                                 <div className="mb-3">
//                                     <label htmlFor="title" className="form-label">Title</label>
//                                     <input type="text" value={note.etitle} name='etitle' onChange={onChange} minLength={5} required className="form-control" id="etitle" aria-describedby="emailHelp" />

//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="description" className="form-label">Description</label>
//                                     <input type="text" value={note.edescription} onChange={onChange} minLength={5} required name='edescription' className="form-control" id="edescription" />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="tag" className="form-label">Tag</label>
//                                     <input type="text" value={note.etag} onChange={onChange} minLength={5} required name='etag' className="form-control" id="etag" />
//                                 </div>

//                             </form>
//                         </div>
//                         <div className="modal-footer">
//                             <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                             <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5 || note.etag.length < 5} onClick={handleonClick} className="btn btn-primary">Update Note</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="row ">
//                 <h2>Your Notes</h2>
//                 <div className="container mx-3"> {Notes.length === 0 && 'No Notes to display'}</div>

//                 {Notes.map((note) => {
//                     return <NoteItem setProgress={props.setProgress} key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />


//                 })}
//             </div>
//         </>
//     )
// }
// export default Notes