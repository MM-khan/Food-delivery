import React from 'react';
import { useDipatch, useCart } from "./ContextReducer";

export default function MyOrder() {
    let data = useCart();
    let dispatch = useDipatch();
    if(data.length === 0) {
        return (
            <div>
                <div className="m-5 text-center w-100 fs-3 text-danger">Cart is Empty Add First.</div>
            </div>
        )
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        // console.log(data,localStorage.getItem("userEmail"),new Date())
        let response = await fetch("http://localhost:5000/api/orderdata", {
          // credentials: 'include',
          // Origin:"http://localhost:3000/login",
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            order_data: data,
            email: userEmail,
            order_date: new Date().toDateString()
          })
        });
        console.log("JSON RESPONSE:::::", response.status)
        if (response.status === 200) {
          dispatch({ type: "DROP" })
        }
      }
    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <>
            <div className="container mt-5 m-auto table-responsive table-responsive-sm table-responsive-md">
                <table className="table table-hover table-dark">
                    <thead className='fs-4'>
                        <tr className='text-success'>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Option</th>
                            <th scope="col">Amount</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((food, index) => (
                                <tr>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{food.name}</td>
                                    <td>{food.qty}</td>
                                    <td>{food.size}</td>
                                    <td>{food.price}</td>
                                    <td><button className="btn btn-danger text-light" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>Delete</button></td>
                                </tr>
                            ))
                        }
                        <div className="fs-3">Total Price : {totalPrice}</div>
                        <div className="btn btn-success text-light" onClick={handleCheckOut}>Check Out</div>
                    </tbody>
                </table>
            </div>
        </>
    )
}
