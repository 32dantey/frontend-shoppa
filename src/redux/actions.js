import axios from 'axios'

export const GET_DRINKS = "GET_DRINKS"
export const ADD_TO_CART = "ADD_TO_CART"
export const LOADING_DRINKS = "LOADING_DRINKS"
export const REMOVE_FROM_CART = "REMOVE_FROM_CART"



export const addToCart = (item)=>{
    return{
        type:ADD_TO_CART,
        payload:item
    }
}

export const removeFromCart = (item)=>{
    return{
        type:ADD_TO_CART,
        payload:item
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

export const fetchDrinks = ()=>(dispatch)=>{
    dispatch(loadingDrinks())
    return axios.get('http://127.0.0.1:8000/all_drinks/')
    .then(res=>{
        dispatch({ type:GET_DRINKS, payload:res.data})
    })
    .catch(err=>console.log(err))
}
 