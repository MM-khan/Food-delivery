import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Login() {
    const [credantials,setCredantials] = useState({email:"",password:""})
    
    let navigate= useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response =await fetch("http://localhost:5000/api/userlogin",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:credantials.email,
            password:credantials.password
        })
        });
        const data =await response.json();
        console.log(data);
        if(!data.success){
            alert("Invalid Credentials.")
        }if(data.success){
            localStorage.setItem("userEmail", credantials.email);
            localStorage.setItem("authToken",data.authToken);
            console.log(localStorage.getItem("authToken"));
            navigate("/");}
    }
    const onchange =(event)=>{
        setCredantials({...credantials,[event.target.name]:event.target.value})
    }
    return (
        <>
            <Navbar />
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" value={credantials.email} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={credantials.password} onChange={onchange} id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-success m-3">Submit</button>
                    <Link className="btn btn-danger text-light m-3" to="/signup">Signup</Link>
                </form>
            </div>
        </>
    )
}
