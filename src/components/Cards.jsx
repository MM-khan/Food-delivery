import React, { useEffect, useRef, useState } from 'react'
import { useCart,useDipatch } from '../screens/ContextReducer';

export default function Cards(props) {
    let option = props.foodOpetion;
    let priceOptions = Object.keys(option);
    let foodItems = props.fooditem;

    let dispatch = useDipatch();
    let stateCart = useCart()

    const [size,setSize] = useState("");
    const [qty,setQty] = useState(1);
    const priceRef = useRef();
    let finalPrice = qty * parseInt(option[size]);  

    const cartHandle = async()=>{
        let food = [];
        for(const item of stateCart){
            if(item.id === foodItems.id){
                food = item;

                break;
            }
        }
        if(food !== []){
            if(food.size === size){
              await  dispatch({type:"UPDATE",id:foodItems.id, price:finalPrice,qty:qty});
                return
            }else if(food.size !== size){
              await  dispatch({type:"ADD",id : foodItems.id,name :foodItems.name,img:foodItems.img,price:finalPrice,size:size,qty:qty});
                return
            }
            return
        }
        await dispatch({type:"ADD",id : foodItems.id,name :foodItems.name,img:foodItems.img,price:finalPrice,size:size,qty:qty});
        console.log(stateCart); 
    }
    useEffect(()=>{
        setSize(priceRef.current.value);
    },[])
  return (
    <>
        <div className="card mt-5" style={{"width": "19rem"}}>
            <img src={foodItems.img} alt='foods' style={{objectFit:"fill",height:200}}/>
            <div className="card-body">
                <h5 className="card-title">{foodItems.name}</h5>
                <div className="container w-100">
                    <select className='h-100 m-2 rounded bg-success text-light' onChange={(e)=>setQty(e.target.value)}> {
                        Array.from(Array(6),(e,i)=>{
                            return(
                                <option key={i+1} value={i+1}>{i+1}</option>
                            )
                        })}
                        </select>
                        <select className='h-100 bg-success rounded text-light' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                            {priceOptions.map((price)=>{
                                return (
                                    <option key={price} value={price}>{price}</option>
                                )
                            })}
                        </select><br />
                        <div className='fs-5 d-inline'>Total Price : {finalPrice}/-</div>
                        <hr />
                        <div className="btn btn-success text-light" onClick={cartHandle}>Add Cart</div>
                </div>
            </div>
        </div>
    </>
  )
}
