import React from 'react';
// import {Link} from 'react-router-dom'

import './Header.css'


function hide() {

  let nav =  document.getElementById('nav-toggle');
      nav.classList.contains('visible')? nav.className ='nav-vert':nav.className = 'nav-vert visible'

}

export default (color,accent,teamName='Welcome', isAuthenticated) => {
    return <header>
        <div className="container"  >
            <div className="logo">

                <div className="spacin">

                        <a href="/">
                        <img id='logo-img' src={"/logo.svg"} alt="logo"/>
                        </a>



                     {/*<span className="active" >{teamName.toUpperCase()}</span>*/}
                    <button className={'button'} id="toggle" onClick={hide} style={{float:'right'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="31.767" height="21.472"
                             viewBox="0 0 31.767 21.472">
                            <g id="Group_1" data-name="Group 1" transform="translate(-9)">
                                <line id="Line_1" data-name="Line 1" x2="26.767" transform="translate(11.5 2.5)"
                                      fill="none"
                                      stroke="#f39848" strokeLinecap="round" strokeWidth="3"/>
                                <line id="Line_2" data-name="Line 2" x2="26.767" transform="translate(11.5 18.972)"
                                      fill="none" stroke="#f39848" strokeLinecap="round" strokeWidth="3"/>
                                <line id="Line_3" data-name="Line 3" x2="26.767" transform="translate(11.5 10.736)"
                                      fill="none" stroke="#f39848" strokeLinecap="round" strokeWidth="3"/>
                            </g>
                        </svg>
                    </button>
                    <nav className="nav-vert" id="nav-toggle">
                <div className="overlay"></div>
                <div className="user-div">
                    {isAuthenticated ? (<span id={'pill'}>Logged IN</span>) : (
                        <a href="/login" className="span">You are not logged in</a>)}
                </div>
                <div className="pads">
                    <ul className="nav-list">
                        <li className="nav-list-item">
                            <a href="/" className="list-item">Home</a>
                        </li>
                        <li className="nav-list-item"><a href="/login" className="list-item">Login</a></li>
                        <li className="nav-list-item"><a href="/about" className="list-item">About</a></li>
                        <li className="nav-list-item"><a href="/about" className="list-item">Docs</a></li>
                    </ul>
                </div>
            </nav>

                </div>
             
            </div>



        </div>
    </header>
}
