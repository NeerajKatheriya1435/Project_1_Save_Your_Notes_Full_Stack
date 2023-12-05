import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
const Addnotes = (props) => {
    const context = useContext(noteContext);
    const { addNote} = context;
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.setAlert("Added your note","success")
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
          <input onChange={onchange} required value={note.title} minLength={5} type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
        <input onChange={onchange} value={note.description} required minLength={5} type="text" className="form-control" id="description" name='description' aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
        <input onChange={onchange} value={note.tag} minLength={5} type="text" className="form-control" id="tag" name='tag' aria-describedby="emailHelp" />
        </div>
        <button onClick={handleClick} disabled={note.title.length<5||note.description.length<5}  type="submit" className="btn btn-primary">Add Note</button>
      </form>
      <h2 className='my-3'>Your Notes</h2>
      </div>
    </div> 
  )
}

export default Addnotes
