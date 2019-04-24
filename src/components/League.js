import React, { Component} from 'react'
import Team from '../models/Team';
//import Conference from '../models/Conference';
import Util from '../models/Util';
import Axios from 'axios';
// import Fixture from '../models/Fixture';
// import Player from '../models/Player';

//Player

class League extends Component {
    util= new Util(Axios, 0)
    state = {
        name:'SIMK',
        season: 0,
        conferences: null,
        count: 0,
        fixturesCount: 0,
        teams: '',
        players: ''
    }
componentDidMount() {
    this.util.starts('/teams.json', '/players.json',(data )=>{
        this.setState({teams: data.teams, players:data.players })
    })
}
    render() {
        return( <div >
            works </div>
        )
    }
}

export default League