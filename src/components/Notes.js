import noteContext from '../context/notes/noteContext'
import React, { useContext, useEffect } from 'react'
import Noteitem from './Noteitem';
import Addnotes from './Addnotes';

const Notes = () => {

  const context = useContext(noteContext);
  const { notes,getNote} = context;
  useEffect(()=>{
    getNote()
  },[])
  return (
    <>
    <Addnotes/>
    <div className='row my-3'>
      {notes.map((note)=>{
        return <Noteitem key={note._id} note={note} />
      })}
    </div>
    </>
  )
}

export default Notes
