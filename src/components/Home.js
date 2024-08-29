
import React, { useEffect } from 'react'
import { Notes } from './Notes';

export default function Home(props) {
const {showAlert,setProgress}=props
props.setProgress(100)
  useEffect(() => {
    
    document.title = 'Home-iNotebook - Your notes secured in cluod';
    // eslint-disable-next-line
  }, []);
  return (
    <div >
    
      <Notes  showAlert={showAlert} setProgress={setProgress} />
    </div>
  )
 }
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjNWYwMmZjZGJiNDk2MmViMGUwNjgxIn0sImlhdCI6MTcyNDY3Mjg1NX0.zyV1fncTwJeGsfa_pBacGySeVh6DZiy_7UH4yZV4DF4
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiMzQ3ZGY2NTNmZWRkOTMwNzkyN2YxIn0sImlhdCI6MTcyMzA0Mzg5M30.yjgPFcAu4_6FStIc0iym1I_5WbHlHjeclXu3pFZw03M