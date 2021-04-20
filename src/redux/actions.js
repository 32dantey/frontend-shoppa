import axios from 'axios'

export const GET_DRINKS = "GET_DRINKS"
export const ADD_TO_CART = "ADD_TO_CART"
export const LOADING_DRINKS = "LOADING_DRINKS"
export const REMOVE_FROM_CART = "REMOVE_FROM_CART"
export const INCREASE_QUANTITY = "INCREASE_QUANTITY"
export const DECREASE_QUANTITY = "DECREASE_QUANTITY"
export const USER_DETAILS = "USER_DETAILS"




export const increaseQuantity = (id)=>{
    return{
        type:INCREASE_QUANTITY,
        payload:id
    }
}

export const decreaseQuantity = (id)=>{
    return{
        type:DECREASE_QUANTITY,
        payload:id
    }
}

export const addToCart = (item)=>{
    return{
        type:ADD_TO_CART,
        payload:item
    }
}

export const removeFromCart = (id)=>{
    return{
        type:REMOVE_FROM_CART,
        payload:id
    }
}

export const getDrinks =(data)=>{
    return{
        type:GET_DRINKS,
        payload:data
    }
}

export const loadingDrinks = ()=>{
    return {
        type:LOADING_DRINKS,
    }
}

export const addUserDetails = (data)=>{
    return{
        type:USER_DETAILS,
        payload: data
    }
}

export const fetchDrinks = ()=>(dispatch)=>{
    dispatch(loadingDrinks())
    return axios.get('http://127.0.0.1:8000/all_drinks/', {
        Headers: `Token ${localStorage.getItem('token')}`
    })
    .then(res=>{
        dispatch({ type:GET_DRINKS, payload:res.data})
    })
    .catch(err=>console.log(err))
}
 