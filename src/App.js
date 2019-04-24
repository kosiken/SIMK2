import React, { Component } from 'react';
import Header from './layout/Header'
import Home from './layout/Home'
import League from  './components/League'
//import './App.css';
import Footer from './layout/Footer'
class App extends Component {

    state = {
        color:'#f39848',
        bg:'#fff',
        isAuthenticated:false,
        server:'php',
        isDev: true
    }
    authenticate = async (obj, api, url) => {
       let data = await  api.post(url, obj)
        console.log(data)
    }
    render() {
        let {color, bg,isAuthenticated, isDev} = this.state
        return (
            <React.Fragment>
            {Header(bg, color)}
               
            {isAuthenticated? (<League/>): Home(this.state.server, isDev, isAuthenticated) }
                <hr style={{marginTop:'40px'}}/>
            <Footer/>
            </React.Fragment>

    );
    }
}

export default App;
