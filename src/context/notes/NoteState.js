import React,{useState} from 'react'
import noteContext from './noteContext'
const NoteState = (props) => {
    const s1={
        name1:"Neeraj sir ji",
        class1:"Completed B.Tech"
    }
    const [state,setState]=useState(s1)
    const update=()=>{
        setTimeout(() => {
            setState({
                name1:"Abhay sir ji",
                class1:"Completed M.sc." 
            })
        }, 2000);
    }
  return (
    <noteContext.Provider value={{state,update}}>
        {props.children}
    </noteContext.Provider>
  )
}

export default NoteState
