import './App.css';
import { useDispatch } from "react-redux";
import React, {useEffect}  from 'react'
import Header from './components/Header'
import {fetchDrinks} from './redux/actions'
import Cart from './components/Cart'
import Home from './components/Home'
import Drink from './components/Drink'
import Shipping from './components/Shipping'
import ScrollToTop from './components/ScrollToTop'
import AllWinesAndSpirits from './listDrinks/AllWinesAndSpirits'
import AllEnergyDrinks from './listDrinks/AllEnergyDrinks'
import AllSoftDrinks from './listDrinks/AllSoftDrinks'
import AllWater from './listDrinks/AllWater'
import Login from './components/Login'
import Registration from './components/Registration'
import OrderConfirm from './components/OrderConfirm'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App () {
  const dispatch = useDispatch();
  useEffect(()=>{
  dispatch(fetchDrinks());
  })
  return (
    <Router>
      <ScrollToTop >
      <div className="app">
        <Header />
          <Switch>              
            <Route path="/cart">
              <Cart />
            </Route>
            <Route exact path="/" component={Home} />
            <Route path="/WinesandSpirits" component={AllWinesAndSpirits} />
            <Route path="/EnergyDrinks" component={AllEnergyDrinks} />
            <Route path="/SoftDrinks" component={AllSoftDrinks} />
            <Route path="/Water" component={AllWater} />
            <Route path="/shipping" component={Shipping} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Registration} />
            <Route path="/orderconfirm" component={OrderConfirm} />
            {/* passing the router props to my Drink component  */}
            <Route path="/:post_id" render={props=><Drink {...props}/>} /> 
                    
          </Switch> 
      </div>
      </ScrollToTop >
    </Router>
  );
}

export default App;
