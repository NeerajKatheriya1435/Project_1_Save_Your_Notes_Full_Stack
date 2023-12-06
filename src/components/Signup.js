import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credential, setCredential] = useState({cpassword:"",name:"" ,email: "",password: "" })
  let navigate = useNavigate();
  const {name,email,password}=credential;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email,name,password})
    });
    const json = await response.json()
    if (json.success) {
      // save the authtoken and redirect
      localStorage.setItem("token", json.authToken)
      navigate("/home")
      props.setAlert("Signup Succesfully","success")
    }else{
      props.setAlert("Email already exists try with another","danger")
  }
  }
  const onchange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }
  return (
    <div className='container'>
      <h2>Create an acount to use iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" minLength={3} required onChange={onchange} className="form-control" id="name" name='name' aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" minLength={5} required onChange={onchange} className="form-control" id="email" name='email' aria-describedby="emailHelp" />
          <div id="email" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="new-password" minLength={5} required onChange={onchange} className="form-control" id="password" name='password' />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm-Password</label>
          <input type="new-password" minLength={5} required onChange={onchange} className="form-control" id="cpassword" name='cpassword' />
        </div>
        <button type="submit"  className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
