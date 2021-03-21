import React from 'react'
import './SoftDrinks.css'
import {Link} from "react-router-dom"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useSelector } from "react-redux";

function SoftDrinks() {
    const drinks = useSelector(state=>state.allDrinks.results)

    const loadedData = ()=>{
        if(drinks){
            const filterWinesSpirits = drinks.filter(drink=>{
                return drink.category==="Soft Drinks"
            })
            const winesAndSpirits = filterWinesSpirits.slice(0, 5);
            return(
                <div className="drink1">
                    {winesAndSpirits.map(drink=>(
                        // <Link to="/" key={drink.key} className="link">
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
                <h5 >SOFT DRINKS</h5>
                <Link to="/SoftDrinks" className="link">SEE ALL <ArrowForwardIosIcon /> </Link>
            </div>
           }
           {loadedData()}
           
        </div>
    )
}

export default SoftDrinks
