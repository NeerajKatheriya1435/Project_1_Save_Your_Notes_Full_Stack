import React from 'react'
import Notes from './Notes';


const Home = (props) => {
  const {setAlert}=props;
  return (
    <>
    <Notes setAlert={setAlert} />
    </>
  )
}

export default Home
 