import React from 'react'
import './Header.css'
import { useSelector } from 'react-redux'
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import {
    Link
  } from "react-router-dom";


function Header() {
    const itemsInCart = useSelector(state=>state.cart);
    // console.log(itemsInCart.length)
    return (
        <div className="header">
        <div className="innerheader">
            <div className="logo">
                <Link className="text-muted logo2" to="/"><h1>SHOPPA</h1></Link>
            </div>


            <form>
                <div className="searchiconandinput">
                    <SearchIcon />
                    <input  type="text"  placeholder="Search products, brands and categories"/>
                </div>
                <button  type="submit" className="btn btn-primary button">SEARCH</button>
            </form>

            <div className="user_cart">
                <div className="user">
                    <PersonIcon />
                    <Link to="/" className="text-muted user_name"><p className="text-muted">Hi, Ayuen</p></Link>
                </div>

                <div >
                    <Link className="cart" to="/cart">
                        <div className="bg-primary cart_count" id="cart_count" >{itemsInCart.length}</div>

                        <div className="cart_icon">
                            <ShoppingCartIcon className="text-muted shoppingcarticon" />
                            <p className="text-muted">Cart</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Header
