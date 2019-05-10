import React, { Component} from 'react'

import board from './board'
import Util from '../models/Util';
import Axios from 'axios';
// import Team from "./Team";
// import Fixture from "./Fixture";
// // import Fixture from '../models/Fixture';
// // import Player from '../models/Player';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LeagueRegister from './LeagueRegister'
import SelectTeam from  './SelectTeam'
import LeagueDashboard from './LeagueDashboard'
import FixtureContainer from "./FixtureContainer";
import Standings from "./Standings";
import HomeDashboard from './HomeDashboard.js'

class League extends Component {
    util= new Util(Axios, 0)

    nextFixture = {}

    time='0'

    state = {
        name:'SIMK',
        season: 0,
        conferences: {},
        next:[],
        count: 0,
        fixturesCount: 0,
        teams: '',
        players: '',
        selectTeam: '',
        fixtureMap: {}, leagues: false, colors:  ['#00a0ff', '#0066ff', '#00cc33', '#330000', '#333300','#663300', '#666600', '#666699', '#a70dff',  '#6610f2',   '#6f42c1',     '#e83e8c',  '#dc3224',   '#fd7e14',   '#ffb500',    '#28a745',    'rgb(67, 75, 145)' ,    '#3D41C2',  '#f39848',  '#121218' ],
        played: [],
        remaining: []

    }
componentDidMount() {
    this.util.starts('/teams.json', '/players.json',(data )=>{
            let {teams, players} = data;
        let ConfObj = this.util.populateConferencesAndTeams(teams, players);

        let fixuresArray = this.util.generateFixtures(ConfObj)
        console.log( fixuresArray.length)
        let fixuresMap =this.util.generateFixturesMap(fixuresArray);

        let leagues = localStorage.getItem('league')||false
        let value =  localStorage.getItem('selected')||false, selectTeam
        !value? selectTeam = '': selectTeam=this.util.getTeam(value, teams)
        selectTeam.selected = true

        this.setState({teams: teams, players: players, conferences: ConfObj,
        selectTeam : selectTeam,
            nextFixture :  this.util.getNextFixture(fixuresMap.fixtures),
        leagues:leagues,
        fixtureMap: fixuresMap,
        remaining: fixuresMap.fixtures})

        console.log(this.state)
    })



}
getTeam = (teamName) => {
        return this.util.getTeam(teamName, this.state.teams)
}
getPositionOfTeam = (teamName, Conference) => {
        let {conferences} = this.state
        let team = this.util.getTeam(teamName, this.state.teams)
   let {teams} = conferences[Conference+'ern']
    teams.sort((a, b) =>parseFloat(b.record)-parseFloat(a.record))
    let index = teams.findIndex(o=> o.short===teamName)

    return this.util.formatPosition(`${index+1}`) + ' in the '+ Conference
}
play =(e) => {
        e.preventDefault()
        let {fixtureMap, teams} = this.state, den
    let {one, two, three} = fixtureMap.fixtureMap[this.time]
   if(one.length> 0) {
         den =   one.splice(0, one.length);
         den.forEach(i=> i.play());

         this.setState({teams:teams})
       this.refConf()
       return

    }
    else if(two.length> 0){
       den =   two.splice(0, two.length);
       den.forEach(i=> i.play());
       this.setState({teams:teams})
       this.refConf()
       return
   }
    else if(three.length > 0) {
       den =   three.splice(0, three.length);
       den.forEach(i=> i.play());
       this.setState({teams:teams})
       this.refConf()
       return

   }
   else {
            this.time = (parseInt(this.time) + 1).toString()
           let bill = fixtureMap.fixtureMap[this.time].one
            den =   bill.splice(0, bill.length);
       den.forEach(i=> i.play());
       this.setState({teams:teams})
       this.refConf()
   }


}
playImproved = () => {
        let {remaining: fixArr, teams} = this.state
    let den = this.util.getTeamFixture(fixArr)
    den.forEach(i=> i.play());
         fixArr.filter(fix=> !fix.played)
       if(den.length < 1) {
           fixArr.forEach(i=> i.play())

       }
       let other =fixArr.filter(fix=> !fix.played)
    this.nextFixture =  this.util.getNextFixture(other)
    this.setState({teams:teams, played: fixArr.filter(fox=> fox.played) , remaining: other})


    this.refConf()

}


getNextFixture = () =>  {

        return this.util.getNextFixture(this.state.remaining)

}
adder = (e) => {
        console.log(document.querySelector(e.target.dataset.target), e.target.dataset.target)
}
    selectATeam = (name) => {
        let team = this.util.getTeam(name, this.state.teams)
        team.selected = true
        localStorage.setItem('selected', name)
      //  console.log(team)
        this.setState({selectTeam: team})
    }
    regLeageue =(name) => {
        this.setState({leagues: true})
        localStorage.setItem('league', name)
    }
    refConf = () =>{
        let {conferences, remaining} = this.state

        Object.keys(conferences).forEach(c=> {
            conferences[c].teams.sort((a, b) =>parseFloat(b.record)-parseFloat(a.record))
        })

        this.setState({conferences: conferences, nextFixture: this.util.getNextFixture(remaining)})
        
    }
        render() {

        let {
            name,
            season,
            conferences,
            count,
            fixturesCount,
            teams,
            players,
            selectTeam,
            fixtureMap,
            leagues
        } = this.state

            return (
                <Router>
                    <Route exact={true} path={'/'} render={(props) => {
                      if (!leagues) {
                          return LeagueRegister(this.regLeageue)
                      }
                      else {
                          if(!this.state.selectTeam){
                              return SelectTeam(teams, this.state.colors, this.selectATeam, this.state.leagues)
                          }
                          else {
                              return HomeDashboard( board, this.play,this.getPositionOfTeam, this.playImproved, this.state.nextFixture )
                          }
                      }
                    }}/>


                    <Route path={'/fixtures'} render={(props) => {
                        if(!leagues) return (<div>Loading</div>)
                        return FixtureContainer(fixtureMap, this.time, this.play, board)
                    }}/>

                    <Route path={'/standings'} render={(props) => {
                        if(!leagues) return (<div>Loading</div>)
                        return(
                        <React.Fragment>
                            <Standings Conferences ={conferences} refreshConf={this.refConf}  />
                            <div className="play tooltiper">
                                <button className={"btn nav-link" }onClick={this.play}><i className="fas fa-play"></i></button>
                                <span className="tooltiptexter" style={{background: 'none', color:'#f39848', opacity: '1'}}>Play</span>
                            </div>
                        </React.Fragment>
                    )}}/>



                    <Route path={'/myTeam'} render={(props) =>{

                        if(!leagues) return (<div>Loading</div>)
                        return LeagueDashboard(this.state.colors, this.state.selectTeam,this.getPositionOfTeam, board, this.play, this.adder)}}/>
                </Router>

            )

    }
}

export default League