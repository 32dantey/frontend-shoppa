import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { addToCart,removeFromCart } from '../redux/actions'
import './Drink.css'
import { Link } from 'react-router-dom'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

function Drink(props) {
    const id = props.match.params.post_id;
    const loading = useSelector(state=>state.loading);
    const state = useSelector(state=>state.allDrinks.results);
    const dispatch = useDispatch();
    const itemsInCart = useSelector(state=>state.cart);

    if(loading){
        return(
            <div className="divloader">
                <div className="loader"></div>
            </div>
        )
    }
    // specific drink details
    const loadedData =()=>{
        if(state){
            const drink = state.filter(drink=>drink.id===id);

           const checkItemIfInCart=()=>{
                for(var item of itemsInCart){
                    if(item.id===id){
                        return(
                           <div>
                            <p className="text-secondary" style={{borderBottom:"1px solid grey", width:"150px"}}>Item added to cart</p>
                            <button onClick={()=>dispatch(removeFromCart(id))} className="btn btn btn-secondary h6" >REMOVE FROM CART</button>
                           </div>
                        )
                    }
            }
           }
            return(
                <div className="item">
                    {drink.map(drink=>(
                        <div className="drink" key={drink.id}>
                            <div className="image">
                                <img src={drink.cover_picture} alt="showcase" />
                            </div>
                            <div className="explanations">
                                <div className="top">
                                    <p className="h6">{drink.name}</p>
                                    <p>{drink.variation}</p>
                                    <p className="brand">Brand: <Link to="/" className="text-info brand">{drink.brand} | shop your favourite brand</Link></p>
                                </div>
                                <div className="bottom">
                                    <p className="h2">Ksh {drink.price}</p>
                                    {drink.previous_price && <s><p >Was: Ksh {drink.previous_price}</p></s>}
                                    {drink.discount && <p className="text-secondary">Discounted percentage: {drink.discount}%</p>}
                                    {checkItemIfInCart()}
                                    <button id="add" onClick={()=>dispatch(addToCart(drink))} className="btn btn btn-primary btn-lg h6" >ADD TO CART</button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            )
        }
    }

    // show related brands
    const getsimilarBrands = ()=>{
        if(state){
            const drink = state.filter(drink=>drink.id===id); 
            const findBrand = drink.map(drink=>drink.brand);
            const drinkBrand = findBrand[0];
            const filterByBrand = state.filter(drink=>drink.brand===drinkBrand);
            const drinksByBrand = filterByBrand.slice(0, 5)
        
            return(
                <div className="drink1">
                {drinksByBrand.map(drink=>(
                            // <Link to="/" key={drink.key} className="link">
                            <Link to={"/" + drink.id} className="drink2" key={drink.id}>
                                {drink.discount && <p className="bg-secondary discount">{drink.discount}%</p>}
                                <img className="cover_picture" src={drink.cover_picture} alt="showcase"/>
                                <p className="name">{drink.name}</p>
                                <p className="h6 price">Ksh {drink.price}</p>
                                {drink.previous_price && <s><p className="text-muted previous_price">Ksh {drink.previous_price}</p></s>}
                            </Link>
                        ))}
                </div>
            )
        }
    }

    // show related products from the same category

    const getSameCategory =()=>{
        if(state){
            const drink = state.filter(drink=>drink.id===id); 
            const findCategory = drink.map(drink=>drink.category);
            const drinkByCategory = state.filter(drink=>drink.category===findCategory[0]);
            // console.log(drinkByCategory);

            // a function to get 5 random drinks from the state
            function getRandom(arr, n) {
                var result = new Array(n),
                    len = arr.length,
                    taken = new Array(len);
                if (n > len)
                    throw new RangeError("getRandom: more elements taken than available");
                while (n--) {
                    var x = Math.floor(Math.random() * len);
                    result[n] = arr[x in taken ? taken[x] : x];
                    taken[x] = --len in taken ? taken[len] : len;
                }
                return result;
            }
            return(
                <div className="drink1">
                {getRandom(drinkByCategory, 5).map(drink=>(
                            <Link to={"/" + drink.id} className="drink2" key={drink.id}>
                                {drink.discount && <p className="bg-secondary discount">{drink.discount}%</p>}
                                <img className="cover_picture" src={drink.cover_picture} alt="showcase"/>
                                <p className="name">{drink.name}</p>
                                <p className="h6 price">Ksh {drink.price}</p>
                                {drink.previous_price && <s><p className="text-muted previous_price">Ksh {drink.previous_price}</p></s>}
                            </Link>
                        ))}
                </div>
            )
        }
    }

    const getDynamicLinkToCategory=()=>{
        if(state){
            const drink = state.filter(drink=>drink.id===id); 
            const findCategory = drink.map(drink=>drink.category);
            const category = findCategory[0].replace(/\s/g, ''); //removes white spaces in btwn the string
            // console.log(category)
            switch(category){
                case "WinesandSpirits":
                    return category
                case "EnergyDrinks":
                    return category
                case "SoftDrinks":
                    return category
                case "Water":
                    return category
                default:
                    return "category not found"
            }
        }
    }
    
    return (
        <div className="outer1">
            <div className="outer">
                {loadedData()}
                <div className="returns">
                    {state && <h4>returns here</h4>}
                </div>
            </div>

            <div className="similar brand">
                {state && 
                    <div className="brandi">
                        <h4 className="h4 text-secondary title"> Products from the same brand</h4>
                        <Link to="/" className="link">back home <ArrowForwardIosIcon /> </Link>
                    </div>
                }
                {getsimilarBrands()}
            </div>

            <div className="samecategory similar">
                {state && 
                    <div className="brandi">
                    <h4 className="h4 text-secondary title"> Customers also buy these</h4>
                        <Link to={"/"+getDynamicLinkToCategory()} className="link">SEE ALL <ArrowForwardIosIcon /> </Link>
                    </div>
                }
                {getSameCategory()}
            </div>
        </div>
    )
}

export default Drink
