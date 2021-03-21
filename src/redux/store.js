import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { drinksReducer } from './reducers'

const store = createStore(drinksReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store