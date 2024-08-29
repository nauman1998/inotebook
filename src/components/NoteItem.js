import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
  const context = useContext(NoteContext)
    const { deleteNote } = context
  const { note ,updateNote,showAlert} = props
  return (

    <div className='col-lg-3 col-md-6 col-sm-6'>

      <div className='my-3 mx-2' >
        <div className="card" >

          <div className="card-body" >
          {/* <h5>ID:{note._id}</h5> */}
            <div className='text-end'>
              <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}} ></i>
              <i className="fa-solid fa-trash" onClick={()=>{deleteNote(note._id);showAlert('Deleted Successfully','success')}}></i>
            </div>
            <h5 className="card-title">{note.title} <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: "90%", zIndex: 1 }}>
{note.tag}

            </span></h5>
            <p className="card-text">{note.description} </p>

          </div>
        </div>
      </div>
    </div>

  )
}

export default NoteItem
