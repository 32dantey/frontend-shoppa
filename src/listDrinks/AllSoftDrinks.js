import React from 'react'
import './AllSoftDrinks.css'
import {Link} from "react-router-dom"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useSelector } from "react-redux";

function AllSoftDrinks() {
    const drinks = useSelector(state=>state.allDrinks.results)
    const loading = useSelector(state=>state.loading)
    if(loading){
        return(
            <div className="divloader">
                <div className="loader"></div>
            </div>
        )
    }


    const loadedData = ()=>{
        if(drinks){
            const winesAndSpirits = drinks.filter(drink=>{
                return drink.category==="Soft Drinks"
            })
            return(
                <div className="drink1">
                    {winesAndSpirits.map(drink=>(
                        <Link to={"/" + drink.id} className="drink2" key={drink.id}>
                            {drink.discount && <p className="bg-secondary discount">{drink.discount}%</p>}
                            <img className="cover_picture" alt="showcase" src={drink.cover_picture}/>
                            <p className="name">{drink.name}</p>
                            <p className="h6 price">Ksh {drink.price}</p>
                            {drink.previous_price && <s><p className="text-muted previous_price">Ksh {drink.previous_price}</p></s>}
                        </Link>
                    ))}
                </div>
            )
        }
    }

    const jamboTron = ()=>{
        if(drinks){
            const num = Math.floor(Math.random()*drinks.length);
            const randomDrink = drinks[num];
            // console.log(randomDrink)

            return(
                <div className="container waa" >
                    <div className="jumbotron text-white jumbotron-image shadow jambo" 
                        style={{backgroundImage: `url(${randomDrink.cover_picture})`,
                        backgroundRepeat: 'no-repeat', 
                        height:'200px',
                        width:'40%',
                        objectFit:'cover'}}>
                        <Link to={"/"+ randomDrink.id} className="btn btn-primary">view</Link>
                    </div>
        
                  <div className="bg-info text-white text">
                      <p className="h3">Name: {randomDrink.name}</p>
                      <p className="h6">Brand: {randomDrink.brand}</p>
                      <p className="h5">Price: Ksh {randomDrink.price}</p>
                      {randomDrink.previous_price && <p className="h6">Discount: {randomDrink.previous_price}% off!</p>}
                  </div>
              </div>
            )
        }
    }
    
    return (
        <div className="drinkslist">
            {jamboTron()}
           {drinks && 
                <div className="category">
                <h5 >Soft Drinks</h5>
                <Link to="/" className="link">back home <ArrowForwardIosIcon /> </Link>
                </div>
           }
           {loadedData()}
           
        </div>
    )
}

export default AllSoftDrinks
