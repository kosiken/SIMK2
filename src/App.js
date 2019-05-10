import React, { Component } from 'react';

import Header from './layout/Header'

import League from  './components/League'

import Footer from './layout/Footer'

class App extends Component {

    state = {
        color:'#f39848',
        bg:'#fff',
        isAuthenticated:true,
        server:'php',
        isDev: true,
        session: '',
        teamName: ''
    }

    componentDidMount() {

    }

    render() {
        let {color, bg,isAuthenticated,teamName} = this.state
        return (
            <React.Fragment>
            {Header(bg, color, teamName, isAuthenticated)}
             <League/>
            {/*{isAuthenticated? (<League/>): Home(this.state.server, isDev, isAuthenticated) }*/}





            <Footer/>
            </React.Fragment>

    );
    }
}

export default App;
