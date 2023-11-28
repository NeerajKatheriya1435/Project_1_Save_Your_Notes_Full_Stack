import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
const Addnotes = () => {
    const context = useContext(noteContext);
    const { addNote} = context;
    const [note,setNote]=useState({title:"",description:"",tag:"default"})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
    }
    const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }
  return (
    <div>
      <div className="container">
      <h2>Add your Notes</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input onChange={onchange} type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
        <input onChange={onchange} type="text" className="form-control" id="description" name='description' aria-describedby="emailHelp" />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button onClick={handleClick} type="submit" className="btn btn-primary">Submit</button>
      </form>
      <h2>Save Your Notes</h2>
      </div>
    </div> 
  )
}

export default Addnotes
