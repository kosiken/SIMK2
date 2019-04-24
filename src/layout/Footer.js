import React from 'react';
import './Footer.css'
import logo from '../logo.svg'
export default (params) => {
    return (
        <footer className={'dar'} id="footer">
            <div className="container">
                <div className="spacin">
                    <div className="footer-logo">
                        <img src={logo} alt="" id="footer-logo-img"/><br/>
                        <span className="accent">SIMK 2.0</span>&nbsp;
                        <small className="black">&copy; 2019 KRC MEDIA</small>
                    </div>
                    <div className="list">
                        <nav>
                            <ul id="footer-list">
                                <li className="list-item-footer"><a href="//krc.com" className="link">KRC homepage</a></li>
                                <li className="list-item-footer"><a href="/terms.html" className="link">Terms of use</a></li>
                                <li className="list-item-footer"><a href="/privacy.html" className="link">Privacy Policy</a></li>
                                <li className="list-item-footer"><a href="/docs.html" className="link">Documentation</a></li>
                            </ul>
                        </nav>
                    </div>
                    
                </div>
                <hr className="black" style={{width:'60%', margin:'10px auto'}}/>
                <p style={{textAlign:'center'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias, animi culpa cupiditate deleniti,
                    .</p>
            </div>
        </footer>
    )
}