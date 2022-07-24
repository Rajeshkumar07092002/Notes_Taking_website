import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success === true) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/")
            props.showAlert("Logged in successfully", "success")
        }
        else {
            props.showAlert("invalid credentials", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div className='mt-3' >
            <h2 >Login to <strong style={{ color: "rgb(207 195 19)" }}>Notes Keeper</strong> </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" onChange={onChange} id="email1" name="email" value={credentials.email} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password1" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} id="password" name="password" value={credentials.password} />
                </div>
                <button type="submit" style={{ backgroundColor: "#46143c", color: "#ffffff",width:"100%"}} className="btn btn-primary" >Login</button>
            </form>
        </div>
        </div>
    )
}

export default Login
