import { LOADING_DRINKS, 
    GET_DRINKS, 
    ADD_TO_CART,
    REMOVE_FROM_CART,
    DECREASE_QUANTITY,
    INCREASE_QUANTITY ,
    USER_DETAILS
} from './actions'



const initialState = {
    loading:false,
    cart:[],
    grandTotal:0, //the total price for items in cart
    allDrinks: [],
    user:[]
}

export const drinksReducer = (state=initialState, action)=>{
    switch(action.type){
        case LOADING_DRINKS:
            return{
                ...state,
                loading: true
            }
        case USER_DETAILS:
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('username', action.payload.username)
            localStorage.setItem('userId', action.payload.user_id)
            return{
                ...state,
                user: action.payload
            }
        case GET_DRINKS:
            return{
                ...state, 
                loading:false,
                allDrinks: action.payload
            }
        case ADD_TO_CART:
            // /check if the action id exists in the addedItems
            let existed_item = state.cart.find(drink => drink.id === action.payload.id)
            if (existed_item) {
                return {
                    ...state
                }
            }else {
                    action.payload.quantity = 1;
                    action.payload.totalPrice = action.payload.price*action.payload.quantity;
                    //calculating the total
                    let newTotal = state.grandTotal + action.payload.totalPrice
        
                    return {
                        ...state,
                        cart: [...state.cart, action.payload],
                        grandTotal: newTotal
                    }
                }
        
        case REMOVE_FROM_CART :
            let itemToRemoveFromCart = state.cart.find(drink => drink.id === action.payload)
            if(itemToRemoveFromCart){
                const newItemsInCart = state.cart.filter(drink => drink.id !== action.payload)
                const newTotal = state.grandTotal - itemToRemoveFromCart.totalPrice;
                return {
                    ...state,
                    cart: newItemsInCart,
                    grandTotal: newTotal
                }
            }
            break;
        case INCREASE_QUANTITY:
            let drink = state.cart.find(drink => drink.id === action.payload);
            let newCart = state.cart.filter(item => item.id !== drink.id);
            if(drink){
                drink.quantity = drink.quantity + 1;
                drink.totalPrice = drink.price*drink.quantity;
                newCart.push(drink);
                // console.log(drink.quantity);
                //calculating the total                
                return{
                    ...state,
                    cart: newCart,
                    grandTotal: state.grandTotal + drink.price
                }
            }
            break;
        case DECREASE_QUANTITY:
            let item = state.cart.find(drink => drink.id === action.payload);
            let newcart = state.cart.filter(drink => drink.id !== item.id);
            if(item){
                item.quantity = item.quantity - 1;
                item.totalPrice = item.price*item.quantity;
                newcart.push(item);
                if(item.quantity===0){
                    const itemsInCart = state.cart.filter(drink => drink.id !== action.payload)
                    const Total = state.grandTotal - item.price;
                    return {
                        ...state,
                        cart: itemsInCart,
                        grandTotal: Total
                    }
                    // store.dispatch(removeFromCart(item.id));
                }           
                return{
                    ...state,
                    cart: newcart,
                    grandTotal: state.grandTotal - item.price
                }
            }
            break;
            
        default:
            return{
                ...state
            }
    }
}