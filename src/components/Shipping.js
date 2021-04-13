import React, { useState } from 'react'
import './Shipping.css'
import { useSelector } from 'react-redux'
import axios from 'axios'

function Shipping() {
    const[phone, setPhone] = useState('');
    const[town, setTown] = useState('');
    const[area, setArea] = useState('');
    const[delivery, setDelivery] = useState('');
    const[payment, setPayment] = useState('');

    const itemsInCart = useSelector(state=>state.cart);
    const amount = useSelector(state => state.grandTotal);
    
    // const firstItem = itemsInCart[0];
    const firstItem=()=>{
        if(itemsInCart){
            return itemsInCart[0]
        }
    }

    const data = {
        Customer: "kimjoki",
        Drink: {
            name:firstItem().name
        },
        Phone:phone,
        Location: town,
        Area: area,
        Delivery: delivery,
        Payment:payment,
        Quantity:firstItem().quantity,
        Amount:amount
    }
    console.log(data)

    function sendData(e){
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/all_drinks/order/', data)
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
    }

    return (
        <div className="shipping home">
            <p className="h5">CHECKOUT</p>
            <form className="form">
                <div className="form-row line_height">
                    <div className="form-group col-md-6">
                        <label for="inputEmail4 ">Phone Number</label>
                        <input value={phone} onChange={e=>setPhone(e.target.value)} type="text" className="form-control" id="inputEmail4" placeholder="Mobile Phone" />
                        </div>
                        <div className="form-group col-md-6">
                        <label for="inputPassword4 line_height">Town/City</label>
                        <input value={town} onChange={e=>setTown(e.target.value)} type="text" className="form-control" id="inputPassword4" placeholder="Enter town you live in" />
                    </div>
                </div>
                
                <div className="form-row line_height">
                    <div className="form-group col-md-6">
                    <label for="inputCity">Area/Location</label>
                    <input value={area} onChange={e=>setArea(e.target.value)} type="text" className="form-control" id="inputCity" placeholder="Area or location you live in" />
                    </div>
                    <div className="form-group col-md-4">
                    <label for="inputState">Delivery Method</label>
                    <select value={delivery} onChange={e=>setDelivery(e.target.value)} id="inputState" className="form-control">
                        <option selected>Choose...</option>
                        <option>Door delivery</option>
                        <option>Pick up station</option>
                    </select>
                    </div>
                    <div className="form-group col-md-2">
                    <label for="inputZip">How To Pay</label>
                    <select value={payment} onChange={e=>setPayment(e.target.value)} id="inputState" className="form-control">
                        <option selected>Choose...</option>
                        <option>Payment on delivery</option>
                        <option>Pay before delivery</option>
                    </select>
                    </div>
                </div>

                <div className="div" style={{marginTop: '20px'}}>
                    <p className="h6">Mpesa Payment</p>
                </div>
                <button onClick={sendData} type="submit" className="btn btn-primary">Submit</button>
            </form>

            <div className="your">
                <p className="h5">your order</p>
                {itemsInCart.map(item=>(
                    <div className="your_order" key={item.id}>
                        <img src={item.cover_picture} />
                        <p>{item.name}</p>
                    </div>
                ))}
                <p className="h6" style={{ marginTop:'10px'}}>Amount To Pay: Ksh {amount}</p>
            </div>
        </div>
    )
}

export default Shipping
