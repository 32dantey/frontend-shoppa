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
    // const userDetails = useSelector(state=>state.user)
    const token = localStorage.getItem('token');

    const logOut =()=>{
        localStorage.removeItem('token');
        // reloading a page on button click
        window.location.reload();
    }

    return (
        <div className="header">
        <div className="innerheader">
            <div className="logo">
                <Link className="text-muted logo2" to="/"><h1>Shoppa</h1></Link>
            </div>


            <form>
                <div className="searchiconandinput">
                    <SearchIcon />
                    <input  type="text"  placeholder="Search products, brands and categories"/>
                </div>
                <button  type="submit" className="btn btn-primary button">SEARCH</button>
            </form>

            <div className="user_cart">
                {token?<div className="user">
                    <PersonIcon />
                    <Link to="/" className="text-muted user_name"><p className="text-muted">{localStorage.getItem('username')}</p></Link>
                    <button className="btn btn-link text-muted signout" onClick={logOut}>Sign Out</button>
                </div>: <Link className="text-muted login" to="/login"><p className="text-muted">login</p></Link>}
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
