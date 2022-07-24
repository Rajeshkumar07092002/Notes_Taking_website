import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Signup = () => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let navigate = useNavigate();
  const { name, email, password } = credentials;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()
    // console.log(json);
    // save the auth token and redirect
    localStorage.setItem('token', json.authtoken);
    navigate("/");
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className='mt-3'>
        <h2>Create an account to use <strong style={{ color: "rgb(207 195 19)" }}>Notes Keeper</strong></h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" onChange={onChange} minLength={3} required id="name" name="name" value={credentials.name} aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" onChange={onChange} id="email" name="email" value={credentials.email} aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" onChange={onChange} minLength={5} required id="password" name="password" value={credentials.password} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Confirm-Password</label>
            <input type="password" className="form-control" onChange={onChange} id="cpassword" name="cpassword" value={credentials.cpassword} />
          </div>
          <button type="submit" style={{ backgroundColor: "#46143c", color: "#ffffff", width: "100%" }} className="btn btn-primary" >Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
