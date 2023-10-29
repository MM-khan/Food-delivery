import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Signup() {
    let navgate  =useNavigate()
    const [credantial, setCredantial] = useState({ name: "", email: "", password: "", location: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: credantial.name,
                email: credantial.email,
                password: credantial.password,
                location: credantial.location
            })
        });
        const data = await response.json();
        console.log(data);
        if(data.success){navgate("/login")}
        if (!data.success) {
            alert("Invalid Credentials.")
        }
    }
    const onchange = (event) => {
        setCredantial({ ...credantial, [event.target.name]: event.target.value })
    }
    return (
        <>
            <Navbar />
            <div className="container">
                <form action='#' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
                        <input type="text" className="form-control" name="name" value={credantial.name} onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" value={credantial.email} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={credantial.password} onChange={onchange} id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Location</label>
                        <input type="text" className="form-control" name="location" value={credantial.location} onChange={onchange} id="exampleInputPassword2" />
                    </div>
                    <button type="submit" className="btn btn-success m-3">Submit</button>
                    <Link className="btn btn-danger m-3" to="/login">LogIn</Link>
                </form>
            </div>
        </>
    )
}
