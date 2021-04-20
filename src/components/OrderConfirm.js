import React from 'react'
import './OrderConfirm.css'

function OrderConfirm() {
    return (
        <div className="jumbotron alert alert-light home orderconfirm ">
            <h1 className="display-4">Thank you for using Shoppa</h1>
            <p className="lead">Your order was successful!</p>
            <p className="alert alert-success lead">We will call you shortly  to confirm your order</p>
            <hr className="my-4" />
            <a className="btn btn-primary btn-lg" href="/" role="button">Continue Shopping</a>
        </div>
    )
}

export default OrderConfirm
