import React, { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {

  const host = "http://localhost:5000"
  const notesInitial = []
  // fetch All notes
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
      })
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      // console.log(json);
      setNotes(json)
    } catch (error) {
      console.error(error.message);
    }

  }
  // Add a Note
  const addNote = async (title, description, tag) => {
    // API Call
    const url = `${host}/api/notes/addnote`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          "auth-token": localStorage.getItem('token')
        }, body: JSON.stringify({ title, description, tag })
      })
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const note = await response.json();
      setNotes(Notes.concat(note))

    } catch (error) {
      console.error(error.message);
    }


  }
  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const url = `${host}/api/notes/deletenote/${id}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          "Content-Type": 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      })
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      // const json = await response.json();

    } catch (error) {
      console.error(error.message);
    }

    const newnotes = Notes.filter((note) => { return note._id !== id })
    setNotes(newnotes)
  }
  // Edit a Note

  const editNote = async (id, title, description, tag) => {
    // API Call 
    const url = `${host}/api/notes/updatenote/${id}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          "Content-Type": 'application/json',
          "auth-token": localStorage.getItem('token')
        }, body: JSON.stringify({ title, description, tag })
      })
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      // const json = await response.json();

    } catch (error) {
      console.error(error.message);
    }
    let newNotes = JSON.parse(JSON.stringify(Notes))
    for (let index = 0; index < newNotes.length; index++) {

      const element = newNotes[index];

      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag

        break
      }

    }

    setNotes(newNotes)
  }
  const [Notes, setNotes] = useState(notesInitial)
  return (
    <NoteContext.Provider value={{ Notes, setNotes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}

    </NoteContext.Provider>

  )


}



export default NoteState;
