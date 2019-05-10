import React from 'react';
import uuid from 'uuid'

import Fixture from './Fixture'

export default function (fixtureMap, time, play, board) {

    return (

        <div className="content">
            {board('fixtures')}
        <div className="container" style={{marginBottom: '10px'}}>


            <div className="rows">
                <div className="card-grids shadow-sm" >

                    {fixtureMap.fixtureMap? fixtureMap.fixtureMap[time].den.map(i=> {

                        return (
                            <Fixture fixture={i} cardView={true} key={uuid()} />
                        )}): (<div>Loading</div>)}
                </div>
            </div>

        </div>
        <div className="play tooltiper">
            <button  className={"btn nav-link" }onClick={play}><i className="fas fa-play"></i></button>
               <span className="tooltiptexter" style={{background: 'none', color:'#f39848', opacity: '1'}}>Play</span>
        </div>
        </div>
    )
}