import React from 'react'
import './WinesAndSpirits.css'
import {Link} from "react-router-dom"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useSelector } from "react-redux";

function WinesAndSpirits() {
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
            const filterWinesSpirits = drinks.filter(drink=>{
                return drink.category==="Wines and Spirits"
            })
            const winesAndSpirits = filterWinesSpirits.slice(0, 5);
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
    return (
        <div className="drinkslist">
           {drinks && 
                <div className="category">
                <h5 >WINES AND SPIRITS</h5>
                <Link to="/Winesandspirits" className="link">SEE ALL <ArrowForwardIosIcon /> </Link>
                </div>
           }
           {loadedData()}
           
        </div>
    )
}

export default WinesAndSpirits
