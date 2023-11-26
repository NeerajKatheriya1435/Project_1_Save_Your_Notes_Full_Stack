import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
const About = () => {
  const a=useContext(noteContext)
  return (
    <div>
      This is about {a.name1}
    </div>
  )
}

export default About
