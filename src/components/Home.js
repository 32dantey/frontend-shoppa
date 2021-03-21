import React from 'react'
import './Home.css'
import WinesAndSpirits from './WinesAndSpirits'
import EnergyDrinks from './EnergyDrinks' 
import SoftDrinks from './SoftDrinks'
import Water from './Water'
import Featured from './Featured'

function Home() {
    return (
        <div className="home">
            <Featured />
           <WinesAndSpirits />
           <EnergyDrinks />
           <SoftDrinks />
           <Water />
        </div>
    )
}

export default Home
