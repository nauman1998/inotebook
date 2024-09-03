import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [Notes, setNotes] = useState(notesInitial);

  // Fetch All Notes
  const getNotes = async () => {
    // API Call
    const url = `${host}/api/notes/fetchallnotes`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Add a Note with Images
  const addNote = async (title, description, tag, images) => {
    const url = `${host}/api/notes/addnote`;

    // Creating FormData object to send images and other note details
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tag', tag);

    // Append each image to the formData object
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "auth-token": localStorage.getItem('token') // Do not set 'Content-Type' for FormData
        },
        body: formData
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const note = await response.json();
      setNotes(Notes.concat(note));
    } catch (error) {
      console.error(error.message);
    }
  };

  // Delete a Note
  const deleteNote = async (id) => {
    const url = `${host}/api/notes/deletenote/${id}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          "Content-Type": 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    }

    const newNotes = Notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // Edit a Note with Images
  const editNote = async (id, title, description, tag, newImages) => {
    const url = `${host}/api/notes/updatenote/${id}`;

    // Creating FormData object to send new images and other note details
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tag', tag);

    // Append each new image to the formData object
    if (newImages) {
      newImages.forEach((image) => {
        formData.append('images', image);
      });
    }

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          "auth-token": localStorage.getItem('token') // Do not set 'Content-Type' for FormData
        },
        body: formData
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const updatedNote = await response.json();

      // Update notes locally
      const newNotes = Notes.map(note => note._id === id ? updatedNote : note);
      setNotes(newNotes);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <NoteContext.Provider value={{ Notes, setNotes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

// import React, { useState } from "react";
// import NoteContext from "./NoteContext";
// const NoteState = (props) => {

//   const host = "http://localhost:5000"
//   const notesInitial = []
//   // fetch All notes
//   const getNotes = async () => {
//     // API Call
//     const url = `${host}/api/notes/fetchallnotes`;
//     try {
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           "Content-Type": 'application/json',
//           "auth-token": localStorage.getItem('token')
//         }
//       })
//       if (!response.ok) {
//         throw new Error(`Response status: ${response.status}`);
//       }

//       const json = await response.json();
//       // console.log(json);
//       setNotes(json)
//     } catch (error) {
//       console.error(error.message);
//     }

//   }
//   // Add a Note
//   const addNote = async (title, description, tag) => {
//     // API Call
//     const url = `${host}/api/notes/addnote`;
//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           "Content-Type": 'application/json',
//           "auth-token": localStorage.getItem('token')
//         }, body: JSON.stringify({ title, description, tag })
//       })
//       if (!response.ok) {
//         throw new Error(`Response status: ${response.status}`);
//       }

//       const note = await response.json();
//       setNotes(Notes.concat(note))

//     } catch (error) {
//       console.error(error.message);
//     }


//   }
//   // Delete a Note
//   const deleteNote = async (id) => {
//     // API Call
//     const url = `${host}/api/notes/deletenote/${id}`;
//     try {
//       const response = await fetch(url, {
//         method: 'DELETE',
//         headers: {
//           "Content-Type": 'application/json',
//           "auth-token": localStorage.getItem('token')
//         }
//       })
//       if (!response.ok) {
//         throw new Error(`Response status: ${response.status}`);
//       }

//       // const json = await response.json();

//     } catch (error) {
//       console.error(error.message);
//     }

//     const newnotes = Notes.filter((note) => { return note._id !== id })
//     setNotes(newnotes)
//   }
//   // Edit a Note

//   const editNote = async (id, title, description, tag) => {
//     // API Call 
//     const url = `${host}/api/notes/updatenote/${id}`;
//     try {
//       const response = await fetch(url, {
//         method: 'PUT',
//         headers: {
//           "Content-Type": 'application/json',
//           "auth-token": localStorage.getItem('token')
//         }, body: JSON.stringify({ title, description, tag })
//       })
//       if (!response.ok) {
//         throw new Error(`Response status: ${response.status}`);
//       }

//       // const json = await response.json();

//     } catch (error) {
//       console.error(error.message);
//     }
//     let newNotes = JSON.parse(JSON.stringify(Notes))
//     for (let index = 0; index < newNotes.length; index++) {

//       const element = newNotes[index];

//       if (element._id === id) {
//         newNotes[index].title = title
//         newNotes[index].description = description
//         newNotes[index].tag = tag

//         break
//       }

//     }

//     setNotes(newNotes)
//   }
//   const [Notes, setNotes] = useState(notesInitial)
//   return (
//     <NoteContext.Provider value={{ Notes, setNotes, addNote, editNote, deleteNote, getNotes }}>
//       {props.children}

//     </NoteContext.Provider>

//   )


// }



// export default NoteState;
