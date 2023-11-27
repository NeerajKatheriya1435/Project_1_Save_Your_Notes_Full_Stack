import React, { useState } from 'react'
import noteContext from './noteContext'
const NoteState = (props) => {
    const notesInitial=[
        {
          "_id": "655da63103b19589fb93e937",
          "user": "655c557acf272537f72cc607",
          "title": "Hello bhai kaise ho",
          "description": "Ha bhai mast main tum bato kaios eho",
          "tag": "Na bhai maza m",
          "date": "2023-11-22T06:56:49.948Z",
          "__v": 0
        },
        {
          "_id": "655db3a3df38d10a3e4a8bbc",
          "user": "655c557acf272537f72cc607",
          "title": "Hello bhai kaise ho123",
          "description": "Ha bhai mast main tum bato kaios eho",
          "tag": "Na bhai maza m",
          "date": "2023-11-22T07:54:11.593Z",
          "__v": 0
        },
        {
          "_id": "655db3d0df38d10a3e4a8bc0",
          "user": "655c557acf272537f72cc607",
          "title": "Hello bhai kaise ho1r54523",
          "description": "Ha bhai mast main tum bato kaios eho",
          "tag": "Na bhai maza m",
          "date": "2023-11-22T07:54:56.266Z",
          "__v": 0
        },
        {
          "_id": "655db459186fb7d604a98bf7",
          "user": "655c557acf272537f72cc607",
          "title": "Hello bhai kaise ho1r23454523",
          "description": "Ha bhai mast main 24tum bato kaios eho",
          "tag": "Na bhai maza m",
          "date": "2023-11-22T07:57:13.559Z",
          "__v": 0
        }
      ] 
      const [notes,setNotes] =useState(notesInitial)
  return (
    <noteContext.Provider value={{notes, setNotes}}>
        {props.children}
    </noteContext.Provider>
  )
}

export default NoteState
