import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credential, setCredential] = useState({ email: "", password: "" })
    let navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json()
        if(json.success){
            // save the authtoken and redirect
            localStorage.setItem("token",json.authToken)
            navigate("/")
            props.setAlert("Logged in Succesfully","success")
        }else{
            props.setAlert("Invalid credentials please try with correct credentials","danger")
        }
        console.log(json)
    }
    const onchange = (e) => {
        setCredential({...credential, [e.target.name]: e.target.value })
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" onChange={onchange} className="form-control" id="email" aria-describedby="emailHelp" name='email' value={credential.email} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="current-password" name='password' onChange={onchange} className="form-control" id="password" value={credential.password} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
export default Login
