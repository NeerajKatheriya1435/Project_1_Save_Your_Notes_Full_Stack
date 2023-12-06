import noteContext from '../context/notes/noteContext'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Noteitem from './Noteitem';
import Addnotes from './Addnotes';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;
  let navigate=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNote()
    }else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])
  const updateNotes = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    })
  }
  const ref = useRef(null)
  const refClose = useRef(null)

  const handleClick = (e) => {
    // console.log("Updating Noteitem.apply........", note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    ref.current.click();
    props.setAlert("Updated your note","success")
  }
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }
  return (
    <>
      <Addnotes setAlert={props.setAlert} />
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input onChange={onchange} required type="text" className="form-control" id="etitle" minLength={5} name='etitle' value={note.etitle} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input onChange={onchange} required type="text" className="form-control" id="edescription" name='edescription' minLength={5} value={note.edescription} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input onChange={onchange} minLength={5} type="text" className="form-control" id="etag" name='etag' value={note.etag} aria-describedby="emailHelp" />
                </div>
              </form>
            </div>
            <div ref={refClose} className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5||note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
      <div className="conatiner mx-3">
      {notes.length===0 && "No Notes to Display"} </div>
        {notes.map((note) => {
          return <Noteitem updateNotes={updateNotes} key={note._id} note={note} setAlert={props.setAlert} />
        })}
       
      </div>
    </>
  )
}

export default Notes
