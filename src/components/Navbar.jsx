import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import MyCart from '../screens/MyCart';
import { useCart } from '../screens/ContextReducer';

export default function Navbar() {
    let data = useCart()
    const [cartView,setCartView] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("./login");
    }
    return (
        <>
            <nav className="navbar navbar-expand-sm bg-success">
                <div className='container-fluid'>
                    <Link className="navbar-brand text-light fs-5" to="/">Food Delivery</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto ms-2">
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/">Home</Link>
                            </li>
                            
                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to="/myorder">My Orders</Link>
                                </li>
                                : ""}
                        </ul>
                        {(!localStorage.getItem("authToken")) ?
                            <div className="d-flex">
                                <Link className="btn btn-light text-success mx-1" to="/login">LogIn</Link>
                                <Link className="btn btn-light text-success mx-1" to="/signup">SignUp</Link>
                            </div>
                            
                            : <div>
                                
                                <div className="btn btn-light mx-2 text-success position-relative" onClick={()=>{setCartView(true)}}>
                                    Add Cart
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {data.length}
                                        <span className="visually-hidden">unread messages</span>
                                    </span>
                                </div>
                                    {cartView ? <Modal onClose={()=> setCartView(false)}><MyCart /></Modal> : null}
                                <div className="btn btn-light mx-2 text-danger" onClick={handleLogout}>
                                    LogOut
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </>

    )
}
