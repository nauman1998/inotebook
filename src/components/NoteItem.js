import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const { deleteNote } = useContext(NoteContext);
    const { note, updateNote, showAlert } = props;

    // Base URL for images
    const baseURL = "http://localhost:5000"; // Update if your server URL is different

    // Helper function to render images
    const renderImages = () => {
        if (!note.images || note.images.length === 0) {
            return <p className="text-muted">No images available</p>;
        }

        return note.images.map((imageSrc, index) => (
            <a
                key={index}
                href={`${baseURL}/${imageSrc.replace(/\\/g, '/')}`} // Correct path
                target="_blank"
                rel="noopener noreferrer"
                className="me-2 mb-2"
            >
                {imageSrc.toLowerCase().endsWith('.pdf') ? (
                    // Show an icon or text indicating this is a PDF
                    <span>
                        <i className="fa fa-file-pdf-o" aria-hidden="true"></i> {/* FontAwesome PDF icon */}
                        View PDF
                    </span>
                ) : (
                    // Render an image
                    <img
                        src={`${baseURL}/${imageSrc.replace(/\\/g, '/')}`}
                        alt={`Note ${note.title} Image ${index + 1}`}
                        width="100px"
                        onError={(e) => {
                            e.target.onerror = null; // Prevent infinite loop if placeholder fails
                            // e.target.src = "/path/to/placeholder-imageSrc.png"; // Path to placeholder image
                        }}
                        className="img-thumbnail"
                    />
                )}
            </a>
        ));
    };

    return (
        <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="card my-3 mx-2 shadow-sm rounded">
                <div className="card-body">
                    <div className="text-end">
                        <i
                            className="fa-regular fa-pen-to-square mx-2 cursor-pointer"
                            onClick={() => updateNote(note)}
                        />
                        <i
                            className="fa-solid fa-trash cursor-pointer"
                            onClick={() => {
                                deleteNote(note._id);
                                showAlert('Deleted Successfully', 'success');
                            }}
                        />
                    </div>
                    <h5 className="card-title mb-2">
                        {note.title}
                        <span
                            className="badge bg-danger position-absolute top-0 translate-middle rounded-pill"
                            style={{ left: "90%", zIndex: 1 }}
                        >
                            {note.tag}
                        </span>
                    </h5>
                    <p className="card-text">{note.description}</p>
                    <div className="d-flex flex-wrap mt-2">
                        {renderImages()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteItem;







// import React, { useContext } from 'react'
// import NoteContext from '../context/notes/NoteContext';

// const NoteItem = (props) => {
//   const context = useContext(NoteContext)
//     const { deleteNote } = context
//   const { note ,updateNote,showAlert} = props
//   return (

//     <div className='col-lg-3 col-md-6 col-sm-6'>

//       <div className='my-3 mx-2' >
//         <div className="card" >

//           <div className="card-body" >
//           {/* <h5>ID:{note._id}</h5> */}
//             <div className='text-end'>
//               <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}} ></i>
//               <i className="fa-solid fa-trash" onClick={()=>{deleteNote(note._id);showAlert('Deleted Successfully','success')}}></i>
//             </div>
//             <h5 className="card-title">{note.title} <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: "90%", zIndex: 1 }}>
// {note.tag}

//             </span></h5>
//             <p className="card-text">{note.description} </p>

//           </div>
//         </div>
//       </div>
//     </div>

//   )
// }

// export default NoteItem
