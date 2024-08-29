import React, { useEffect, useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
export const About = () => {

 
  useEffect(() => {
    document.title = 'About-iNotebook - Your notes secured in cluod';
    
    // eslint-disable-next-line
  }, []);
  return (


    <div>
      <h3>this is about </h3>
    </div>
  )
}
