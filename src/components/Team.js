import React, { Component} from 'react'
import uuid from 'uuid'
import $ from 'jquery'


import Player from "./Player";

class Team extends Component {
    dragged= ''
    playersSubFromBench = []
    playersSubtoBench = []
    state = {
       team:this.props.team

    };
    selectingIt = ()=> {
        this.props.selectTeam(this.state.team.teamName)
    }
    onClick = (e) => {
    $(e.target.dataset.target).toggleClass('show')
    }

    sub (e) {


        e.preventDefault()
    }
    changeColor =(e) => {
        $('#changer').toggleClass('changing');
    }
    substitute= (target) => {

        this.dragged = {elem: document.getElementById(target.id), playerName: target.dataset.player}


    }


    refresh = (bench, lineup) =>  {

      if(lineup)  lineup.sort((a, b)=> b.rating-a.rating)
        bench.sort((a, b)=> b.rating-a.rating)

}
    drop =(e) => {
        if( e.target.parentElement.parentElement.classList.contains('dropzone'))  {
            let {id} = e.target.parentElement.parentElement,player
            let {team} = this.state
            let {bench, lineup,players} = team
            player = players.find(o=> o.firstName+o.lastName ===this.dragged.playerName)

            if(id==='starters') {
                if (lineup.length<5) {
                    for( let i = 0; i < bench.length; i++){
                        let o = bench[i]
                        if(o.firstName+o.lastName===player.firstName+player.lastName){
                            bench.splice(i, 1)
                        }
                    }

                    lineup.push(player)
                   this.refresh(bench, lineup)
                    this.setState({lineup: lineup, bench: bench})
                }
                else{
                    alert('cannot sub in')
                }
            }else {
            //lineup.splice(1,3)
                for( let i = 0; i < lineup.length; i++){
                    let o = lineup[i]
                    if(o.firstName+o.lastName===player.firstName+player.lastName){
                        lineup.splice(i, 1)
                    }
                }
                bench.push(player)

                this.refresh(bench, lineup)
                this.setState({lineup: lineup, bench: bench})


            }

        }
    }
removeAnItem = (arr, nam) => {
    for (let i = 0; i < arr.length; i++) {
        let o = arr[i]
        if (o === nam) {
            arr.splice(i, 1)
        }
    }
}
    adding = (e) => {
        let name = e.target.dataset.target
        if(e.target.className==='bench') {
            if (e.target.checked) {
                this.playersSubFromBench.push(name)

            }
            else {

                for (let i = 0; i < this.playersSubFromBench.length; i++) {
                    let o = this.playersSubFromBench[i]
                    if (o === name) {
                        this.playersSubFromBench.splice(i, 1)
                    }
                }
            }

            console.log(e.target.className)
        }
        if(e.target.className==='starters') {
            if (e.target.checked) {
                this.playersSubtoBench.push(name)

            }
            else {
                for (let i = 0; i < this.playersSubtoBench.length; i++) {
                    let o = this.playersSubtoBench[i]
                    if (o === name) {
                        this.playersSubtoBench.splice(i, 1)
                    }
                }
            }

            console.log(e.target.className)
        }

    }




    finallyRun = (e) => {
        let player, benchSub = [], starterSub = [], benchStart,startStart
        let {team} = this.state
        let {bench, lineup,players} = team
        benchStart = bench.map(o=> o.firstName+' '+o.lastName)
        startStart = lineup.map(o=> o.firstName+' '+o.lastName)

        if(this.playersSubtoBench.length> 0&& this.playersSubFromBench.length> 0 && this.playersSubFromBench.length === this.playersSubtoBench.length) {


            this.playersSubtoBench.forEach(i=> {
                this.removeAnItem(startStart, i)

            })
            this.playersSubFromBench.forEach(i=> {
                this.removeAnItem(benchStart, i)
            })

            startStart = startStart.concat(this.playersSubFromBench)
            benchStart = benchStart.concat(this.playersSubtoBench)

            bench = benchStart.map((p => players.find(o=> o.firstName+' '+o.lastName ===p)))
            lineup = startStart.map((p => players.find(o=> o.firstName+' '+o.lastName ===p)))

            this.refresh(bench, lineup)

            team.lineup = lineup
            team.bench =  bench
            team.reconfigMins()

            this.setState({lineup: lineup, bench: bench, team: team})
            this.playersSubFromBench=[];this.playersSubtoBench=[]
        }


    }

    render() {
          let { teamName, teamId, short, city,  GM, coach, conferenceName, division ,lineup,bench, record, wonTeams, loseTeams, players} = this.state.team;
        let top
        if (this.props.fixtureView) {

            this.refresh(players)
            top = players.slice(0, 3)
        }
          let best = lineup[0]

        if (this.props.listView) {         return (
            <div className="shadow-lg card team-card" style={{color: this.props.color, borderColor: this.props.color, backgroundColor:this.props.bgColor}}>
                <div className="card-head">
                   <h2 className="heading" onClick={this.onClick} style={{cursor:'pointer'}} data-target={'#'+short} >{city + ' ' + short}</h2>
                    <div className="spacing">
                        <span className="team-metadata">{conferenceName}</span>
                    </div>


                    <p className="best" style={{textAlign: 'center', margin:'10px 0',color: this.props.color}}>
                        <i className="fas fa-star"></i> <span className="story">{best.firstName + ' ' +best.lastName}</span>&nbsp;<span className="story danger">{best.rating}</span>
                    </p>
                </div>
                 <div id={short} className="card-body  bg-transparent " style={{borderColor: this.props.color, transition: 'all o.5s linear'}} >
                        <table className="table" style={{backgroundColor:'#fff'}}>
                            <thead>
                            <tr><th>Starting Lineup</th></tr>
                            </thead>
                            <tbody>
                            {lineup.map(p=> (
                                <Player key={uuid()} player={p} table={true} lineupStart={true} />))}
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer  bg-transparent spacin"  style={{borderColor: this.props.color}}>

                            <span className="team-metadata">
                                <i className="fa fa-user" style={{background:'none'}}></i>
                                {GM}
                                </span>
                        <br/><span className="team-metadata">
                        <i className="fa fa-basketball-ball" style={{background:'none'}}></i>{coach}</span><br/>
                        <button className="btn bg-transperent" onClick={this.selectingIt} style={{borderColor: this.props.color, color: this.props.color}}>Select Team</button>
                    </div>
                </div>
                )
                }
                else if(this.props.standingsView){
              return (
                  <tr>
                      <td>{this.props.position +1}</td>
                      <td>   <span className="meta" style={{color:'#dc3a3a', fontSize:'1.5em'}}><i className="fas fa-dragon"></i></span> <span className="meta">{teamName}</span></td>
                      <td>{record}</td>
                      <td>{wonTeams.length.toString()}</td>
                      <td>{loseTeams.length.toString()}</td>
                  </tr>
              )
        }
        else if (this.props.fixtureView) {
              return (
                  <React.Fragment>
                  <div className="team-meta spacing">
                      <span className={' meta'}>{this.props.getPosition(short, conferenceName)}</span>
                      <span className=" meta"><i className="far fa-chart-bar"></i>{record===''? 'Record: 0.00 Won: 0 Lost:0': `Record: ${record} W:${wonTeams.length} L:${loseTeams.length}`}</span>
                  </div>
                  <div className="team-info">
                      <span className="meta" style={{color:'#dc3a3a', fontSize:'1.5em'}}><i className="fas fa-dragon"></i></span>

                  </div>
                      <div className="something-sha">
                          <ul>
                              {top.map(p => (
                                  <Player key={uuid()} player={p} fixedView={true} />
                              ))}
                          </ul>
                      </div>
                  </React.Fragment>
              )
        }
                else {
              return (
                  <div className="team-full"  data-team={teamName} data-division={division} data-conference={conferenceName} style={{ minHeight:'100vh'}}>
                    <div className="team-info">
                        <div className="container">
                            <div className="spacin ">
                                <span className="meta" style={{color:'#dc3a3a', fontSize:'1.5em'}}><i className="fas fa-dragon"></i></span>
                                <span className=" meta" >{teamName}</span>
                                <span className=" meta"><i className="far fa-chart-bar"></i>{record===''? 'Record: 0.00 Won: 0 Lost:0': `Record: ${record} W:${wonTeams.length} L:${loseTeams.length}`}</span>
                                <span className={' meta'}>{this.props.getPosition(short, conferenceName)}</span>
                                <div >
                                    <span>Coach: {coach}</span><br/>
                                    <span>GM: {GM}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="players-div-list" id={short+teamId}>
                        <div className="container  dropzon shadow" id={'changer'} >
                            <button className="btn" onClick={this.changeColor}>+</button>
                            <button className="btn" onClick={this.finallyRun}>Confirm</button>
                            <legend className={'blue'} style={{textAlign:'center'}}>Lineup <i className="fas fa-users"></i></legend>
                            <div className="spacing">


                            <div className="table" style={{color:'inherit'}}>

                                <div>
                                    <legend>
                                        <h4>Starters <i className="fas fa-hashtag"></i></h4>

                                    </legend>
                                </div>
                                <div onDragOver={this.sub} className={'dropzone'} onDrop={this.drop} id={'starters'}>

                                    {lineup.map(p=>{

                                        return(
                                           <Player key={uuid()} player={p} table={true} sub={this.sub} substitute={this.substitute} adder={this.adding} lineup={'starters'} />
                                        )})}
                                </div>
                            </div>
                                <div className="table" style={{color:'inherit'}}>


                                    <div>
                                    <legend>
                                        <h4>Bench <i className="fas fa-hashtag"></i></h4>

                                    </legend>
                                    </div>
                                    <div onDragOver={this.sub} className={'dropzone'} onDrop={this.drop} id={'bench'}>

                                    {bench.map(p=>{

                                        return(
                                            <Player key={uuid()} player={p} table={true} sub={this.sub} substitute={this.substitute} adder={this.adding} lineup={'bench'} />
                                        )})}
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                  </div>
              )
        }
    }
}

export default Team;