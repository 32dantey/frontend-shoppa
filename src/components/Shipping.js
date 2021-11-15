import React, { useState } from 'react'
import './Shipping.css'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

function Shipping() {
    const[phone, setPhone] = useState('');
    const[town, setTown] = useState('');
    const[area, setArea] = useState('');
    const[delivery, setDelivery] = useState('');
    const[payment, setPayment] = useState('');

    let history = useHistory();

    const itemsInCart = useSelector(state=>state.cart);
    const amount = useSelector(state => state.grandTotal);
    const userDetails = useSelector(state=>state.user);
    console.log(userDetails)

    // const firstItem = itemsInCart[0];
    const firstItem=()=>{
        if(itemsInCart.length>0){
            return itemsInCart[0]
        }else{
            return "null"
        }
    }

    const data = {
        "amount": amount,
        "area": area,
        "customer": localStorage.getItem('userId'),
        "delivery": delivery,
        "drink": firstItem().id,
        "location": town,
        "payment": payment,
        "phone": phone,
        "quantity": firstItem().quantity
    }

    console.log(data)
    function sendData(e){
        e.preventDefault();
        axios.post('/all_drinks/order/', data, {
            headers:{
                Authorization:`Token ${localStorage.getItem('token')}`
            }
        })
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
        if(data.phone && data.payment){
            history.push('/orderconfirm')
        }else{
            history.push('/shipping')
        }
    }

    return (
        <div className="shipping home">
            <p className="h5">CHECKOUT</p>
            <form className="form">
                <div className="form-row line_height">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4 ">Phone Number</label>
                        <input value={phone} onChange={e=>setPhone(e.target.value)} type="text" className="form-control" id="inputEmail4" placeholder="Mobile Phone" required/>
                        </div>
                        <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4 line_height">Town/City</label>
                        <input value={town} onChange={e=>setTown(e.target.value)} type="text" className="form-control" id="inputPassword4" placeholder="Enter town you live in" required/>
                    </div>
                </div>
                
                <div className="form-row line_height">
                    <div className="form-group col-md-6">
                    <label htmlFor="inputCity">Area/Location</label>
                    <input value={area} onChange={e=>setArea(e.target.value)} type="text" className="form-control" id="inputCity" placeholder="Area or location you live in" />
                    </div>
                    <div className="form-group col-md-4">
                    <label htmlFor="inputState">Delivery Method</label>

                    <select value={delivery} onChange={e=>setDelivery(e.target.value)} id="inputState" className="form-control">
                        <option defaultValue>Choose...</option>
                        <option>Door delivery</option>
                        <option>Pick up station</option>
                    </select>
                    </div>
                    <div className="form-group col-md-2">
                    <label htmlFor="inputZip">How To Pay</label>
                    <select value={payment} onChange={e=>setPayment(e.target.value)} id="inputState" className="form-control">
                        <option defaultValue>Choose...</option>
                        <option>Payment on delivery</option>
                        <option>Pay before delivery</option>
                    </select>
                    </div>
                </div>

                <div className="div" style={{marginTop: '20px'}}>
                    <p className="h6">Mpesa Payment</p>
                </div>
               {!localStorage.getItem('token') && 
                 <div className="alert alert-danger p-1 trylog">
                 <p>you must login to place an order!</p>
             </div>
               }
                <button onClick={sendData} type="submit" className="btn btn-primary">Submit</button>
            </form>

            <div className="your">
                <p className="h5">your order</p>
                {itemsInCart.map(item=>(
                    <div className="your_order" key={item.id}>
                        <img alt="order" src={item.cover_picture} />
                        <p>{item.name}</p>
                    </div>
                ))}
                <p className="h6" style={{ marginTop:'10px'}}>Amount To Pay: Ksh {amount}</p>
            </div>
        </div>
    )
}

export default Shipping
