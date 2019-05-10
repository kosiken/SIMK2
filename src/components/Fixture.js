import React, {Component} from 'react';

import './Fixture.css'
import $ from "jquery";
import uuid from 'uuid'
class Fixture extends Component {

    state = {
        fixture : this.props.fixture
    }
    onClick = (e) => {



        let {arr, boxScore} = this.state.fixture
      console.log(boxScore)
        $('#fixture' +arr.toString()).toggleClass('disp')

    }
    render () {
        let {home, away, veen, score, played, boxScore, arr} = this.state.fixture;
        var today  = new Date();
        if(this.props.cardView) {
            return (
              <div className={"card col-sm-4  shadow " + (played? 'played': '')} id={veen.toString()} style={{display:'inline-block', borderRadius:'0', color:'#222'}} onClick={this.onClick} >
                  <div className="card-header" style={{background:'inherit', border:'none', textAlign:'center'}}>
                      <small>{today.toLocaleDateString()}</small>
                  </div>
                  <div className="card-body">
                      <div className="score">
                          <div className={'spacin'}>

                              <span className="score" style={{width:'70%', padding: '10px 2px'}}>
                                  <span className="meta" style={{color:'#dc3a3a', fontSize:'1.5em'}}><i className="fas fa-dragon"></i></span>{home.short} </span> <span>{score? score.home: '0'} </span></div>

                          <div className={'spacin'}>
                            <span className="score" style={{width:'70%', padding: '10px 2px'}}>
                                <span className="meta" style={{color:'rgb(22,55,205)', fontSize:'1.5em'}}><i
                                    className="fas fa-hippo"></i></span> {away.short}</span>
                              <span>{score? score.away : '0'}</span></div>
                      </div>
                  </div>
                  <div className="modal" id={'fixture' + arr} >
                      <div className="card" style={{width: '70%', height:'50%', position: 'relative', zIndex: '99999', overflow:'scroll'}}>
                      <div className="card-header">
                          <h5 className="card-title">{home.short} vs {away.short}</h5>
                      </div>



                          <div className="card-body">
                            <div className="sp">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Player</th>
                                        <th>Points</th>
                                        <th>Assists</th>
                                        <th>Rebounds</th>
                                        <th>Blocks</th>
                                        <th>Steals</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {boxScore? boxScore.home.map(onj => (
                                        <tr key={uuid()}>
                                            <td>{onj.player}</td>
                                            <td>{onj.points}</td>
                                            <td>{onj.assists}</td>
                                            <td>{onj.rebounds}</td>
                                            <td>{onj.blocks}</td>
                                            <td>{onj.steals}</td>

                                        </tr>
                                    )): (<tr><td>nothing</td></tr>)}
                                    </tbody>

                                </table>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Player</th>
                                        <th>Points</th>
                                        <th>Assists</th>
                                        <th>Rebounds</th>
                                        <th>Blocks</th>
                                        <th>Steals</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {boxScore? boxScore.away.map(onj => (
                                        <tr key={uuid()}>
                                            <td>{onj.player}</td>
                                            <td>{onj.points}</td>
                                            <td>{onj.assists}</td>
                                            <td>{onj.rebounds}</td>
                                            <td>{onj.blocks}</td>
                                            <td>{onj.steals}</td>

                                        </tr>
                                    )): (<tr><td>nothing</td></tr>)}
                                    </tbody>

                                </table>
                            </div>
                          </div>

                      </div>

                  </div>

              </div>
            )
        }
    }
}

export default Fixture