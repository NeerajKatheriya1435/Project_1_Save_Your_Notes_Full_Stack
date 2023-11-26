import React from 'react'
import noteContext from './noteContext'
const NoteState = (props) => {
    const state={
        name1:"Neeraj sir ji",
        class1:"Completed B.Tech"
    }
  return (
    <noteContext.Provider value={state}>
        {props.children}
    </noteContext.Provider>
  )
}

export default NoteState
