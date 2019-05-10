import React, { Component} from 'react';
import $ from 'jquery'

export  default class Scroller extends Component {
    state={
        scrolled:0
    }

    scrollButton = (e) => {
        let {scrolled} = this.state
        if(e.target.dataset.scroll ==='left') {
            scrolled<0 ? scrolled+=100 : scrolled+=0
        }
        else if(e.target.dataset.scroll ==='right'){
            scrolled>(-3000)? scrolled-=100: scrolled-=0
        }
        $('#team-scroll').css('margin-left', `${scrolled}%`)
        this.setState({scrolled: scrolled})


    }

    render() {
        return (
            <div className="scroller spacing">
                <button onClick={this.scrollButton} data-scroll="left" id="left-scroll" className="btn btn-primary"><i className="fas fa-angle-left"></i></button>
                <button onClick={this.scrollButton}  data-scroll="right" id="right-scroll" className="btn btn-primary"><i className="fas fa-angle-right"></i></button>
            </div>
        )
    }
}