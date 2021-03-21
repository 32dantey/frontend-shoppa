import { LOADING_DRINKS, GET_DRINKS, ADD_TO_CART } from './actions'

const initialState = {
    loading:false,
    cart:[],
    allDrinks: []
}

export const drinksReducer = (state=initialState, action)=>{
    switch(action.type){
        case LOADING_DRINKS:
            return{
                ...state,
                loading: true
            }
        case GET_DRINKS:
            return{
                ...state, 
                loading:false,
                allDrinks: action.payload
            }
        case ADD_TO_CART:
            return{
                ...state,
                cart:[...state.cart, action.payload]
            }
        default:
            return{
                ...state
            } 
    }
}