import React, { Component } from 'react';
import Header from './layout/Header'

import './App.css';

class App extends Component {

    state = {
        color:'#f39848',
        bg:'#fff',
        isAuthenticated:false
    }
    render() {
        let {color, bg} = this.state
        return (
            <React.Fragment>
            {Header(bg, color)}
                {this.state.isAuthenticated?():}
            </React.Fragment>

    );
    }
}

export default App;
