import React from 'react';
import Team from './Team';

import {Link} from 'react-router-dom'
export default function ( colors, selectTeam, getPositionOfTeam,board, play, adder) {
    return (<div className={'content'} >

        {board('stats')}
        <Team bgColor={colors[0]} team={selectTeam} getPosition={getPositionOfTeam} adder={adder}/>
        <div className="play tooltiper">
            <button  className={"btn nav-link" }onClick={play}><i className="fas fa-play"></i></button>
            <span className="tooltiptexter" style={{background: 'none', color:'#f39848', opacity: '1'}}>Play</span>
        </div>
    </div>)
}