import React from 'react'
import './Cart.css'
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/actions'
import { Link } from 'react-router-dom'

function Cart() {
    const cartItems = useSelector(state=>state.cart);
    const grandTotal = useSelector(state=>state.grandTotal);
    const dispatch = useDispatch()
    console.log(cartItems)
    if(cartItems.length===0){
        return(
            <div className="alert-success p-2" align="center">
                <h5>No items in the cart!</h5>
                <p>items added to the cart will appear here</p>
            </div>
        )
    }
    return (
        <div className="cart">
            <h3>Cart({cartItems.length} items)</h3>
            <div className="headings">
                <p className="items">ITEM</p>
                <p className="quantity">QUANTITY</p>
                <p className="price">UNIT PRICE</p>
                <p className="subtotal">SUBTOTAL</p>
            </div>
            {cartItems.map(item=>(
                <div className="div">
                    <div className= "itemyenyewe">
                
                        <div className="itemz">
                            <div className="image">
                                <img src={item.cover_picture} alt="a cover"/> 
                            </div>
                            <p className="name">{item.name}</p>
                        </div>

                        <div className="quantity1">
                            <div className="arrows">
                                <ArrowDropUpIcon onClick={()=>dispatch(increaseQuantity(item.id))}/>
                                <p>{item.quantity}</p>
                                <ArrowDropDownIcon onClick={()=>dispatch(decreaseQuantity(item.id))} />
                            </div>
                        </div>

                        <div className="price1">
                            <p>{item.price}</p>
                        </div>

                        <div className="subtotal1">
                            <p>{item.totalPrice}</p>
                        </div>

                        <button onClick={()=>dispatch(removeFromCart(item.id))} className="btn btn-outline-primary btn-sm button mt-3"><DeleteIcon />REMOVE</button>
                    </div>
                </div>

            ))}
            <div className="bg-primary grandtotal">
                <p className="h5">Grand Total: Ksh {grandTotal}</p>
            </div>

            <div className="proceed">
                <Link to="/"><button className="btn btn-primary back">CONTINUE SHOPPING</button></Link>
                <Link to="/shipping"><button className="btn btn-primary to_pay">CONTINUE TO PAY</button></Link>
            </div>
        </div>
    )
}

export default Cart
