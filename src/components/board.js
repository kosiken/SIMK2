import React from 'react'
import {Link} from 'react-router-dom'
import './board.css'


export default function (name) {
    return (
        <div className="board" >
            <ul className="navigation" style={{flexWrap:'nowrap'}}>
                <li className="navigation-item tooltiper">
                    <Link className={"nav-link" + (name ==='dashboard'? " selected": '')} to="/"><i
                        className="fas fa-compass"></i></Link>
                    <span className="tooltiptexter" style={{background: 'none', color:'#f39848', opacity: '1'}}>Dashboard</span>
                </li>
                <li className="navigation-item tooltiper">
                    <Link className={"nav-link" + (name ==='fixtures'? " selected": '')}to="/fixtures"><i className="far fa-calendar-alt"></i></Link>
                    <span className="tooltiptexter" style={{background: 'none', color:'#f39848', opacity: '1'}}>Fixtures</span>
                </li>
                <li className="navigation-item tooltiper">
                    <Link className={"nav-link" + (name ==='standings'? " selected": '')} to="/standings"><i
                        className="fas fa-arrows-alt-v"></i></Link>
                    <span className="tooltiptexter" style={{background: 'none', color:'#f39848', opacity: '1'}}>Standings</span>
                </li>
                <li className="navigation-item tooltiper">
                    <Link className={"nav-link" + (name ==='stats'? " selected": '')} to="/myTeam"><i
                        className="fas fa-chart-pie"></i></Link>
                    <span className="tooltiptexter" style={{background: 'none', color:'#f39848', opacity: '1'}}>Stats</span>
                </li>


            </ul>
        </div>
    )
}