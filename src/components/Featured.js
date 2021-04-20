import React, {useEffect, useState } from 'react'
import './Featured.css'
import axios from 'axios'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

function Featured() {
    const state = useSelector(state=>state.allDrinks.results);
    const[featured, setFeatured] = useState([]);
    useEffect(()=>{
        const getFeatured = ()=>{
            axios.get('http://127.0.0.1:8000/featured/products/')
            .then(res=>{
                const data = res.data.results
                if(data){
                    const img = data.map(img=><img key={img.key} alt="showcase" src={img.cover_image}/>);
                    setFeatured(img);
                }
            })
            .catch(err=>console.log(err))
        }
        getFeatured();
    },[])

    const responsive = {
        0: { items: 1 },
        568:{items: 1 },
        1024: { items: 2 },
      }
    
    const featuredProducts = ()=>{
        if(state){
            return(
            <div className="featured">
                <div className="right">
                    <Link to="/Winesandspirits" className="h6 text-secondary link"><p><img alt="showcase" className="bottleIcons" src="https://img.icons8.com/fluent/50/000000/champagne-bottle.png"/>Wines and Spirits</p></Link>
                    <Link to="/EnergyDrinks" className="h6 text-secondary link"><p><img alt="showcase" className="bottleIcons" src="https://img.icons8.com/cute-clipart/64/000000/energy-drink.png"/>Energy Drinks</p></Link>
                    <Link to="/SoftDrinks" className="h6 text-secondary link"><p><img alt="showcase" className="bottleIcons" src="https://img.icons8.com/cotton/64/000000/orange-soda-bottle--v1.png"/>Soft Drinks</p></Link>
                    <Link to="/Water" className="h6 text-secondary link"><p><img alt="showcase" className="bottleIcons" src="https://img.icons8.com/fluent/48/000000/sport-bottle.png"/>Water</p></Link>
                </div>
                <AliceCarousel
                    items={featured}
                    responsive={responsive}
                    autoPlayInterval={4000}
                    autoPlayDirection="ltr"
                    autoPlay={true}
                    infinite={true}
                    fadeOutAnimation={true}
                    mouseTrackingEnabled={true}
                    disableAutoPlayOnAction={true}
                    disableButtonsControls={true}
                />
            </div>
            )
        }
    }

    return (
        <div>
           {featuredProducts()}
        </div>
    )
}

export default Featured
