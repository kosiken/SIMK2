import React from 'react'
import Team from './Team'
import Player from './Player'
import uuid from 'uuid'

function     ref  (bench, lineup)   {

    if(lineup)  lineup.sort((a, b)=> b.rating-a.rating)
    bench.sort((a, b)=> b.rating-a.rating)
    return bench

}
export default function (board, play, getPositionOfTeam, playImproved, fixture) {
    let {home, away} = fixture
    let top = ref(away.players).slice(0, 3)
    let toph= ref(home.players).slice(0, 3)
    return (
        <div className="content">
           <button onClick={playImproved} style={{position:'absolute', bottom: '11px'}} className='btn  fas fa-play'/>
            {board('dashboard')}
            <div className="container spacing" style={{maxHeight:'80vh', overflowY:'scroll', position:'relative'}}>
             
                <div className="next text-white haf " style={{position: 'relative'}}>
                    <div className={ away.selected? "away selected bg-primary": "away selected bg-secondary" }  style={{height:'50%'}}>
                        <div className="team-meta spacing">
                            <span className={' meta'}>{getPositionOfTeam(away.short, away.conferenceName)}</span>
                            <span className=" meta"><i className="far fa-chart-bar"></i>{away.record===''? 'Record: 0.00 Won: 0 Lost:0': `Record: ${away.record} W:${away.wonTeams.length} L:${away.loseTeams.length}`}</span>
                        </div>
                        <div className="team-info">
                        <img className=" meta team-logo-img" style={{width:'50px'}} src={'.' + away.urlPic} />

                        </div>
                        <div className="something-sha">
                            <ul>
                                {top.map(p => (
                                    <Player key={uuid()} player={p} fixedView={true} />
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className={ home.selected? "home selected bg-primary": "home selected bg-secondary" } style={{height:'50%'}}>
                            <div className="team-meta spacing">
                                <span className={' meta'}>{getPositionOfTeam(home.short, home.conferenceName)}</span>
                                <span className=" meta"><i className="far fa-chart-bar"></i>{home.record===''? 'Record: 0.00 Won: 0 Lost:0': `Record: ${home.record} W:${home.wonTeams.length} L:${home.loseTeams.length}`}</span>
                            </div>
                            <div className="team-info">
                            <img className="team-logo-img" style={{width:'50px'}} src={'.' + home.urlPic} />

                            </div>
                            <div className="something-sha">
                                <ul>
                                    {toph.map(p => (
                                        <Player key={uuid()} player={p} fixedView={true} />
                                    ))}
                                </ul>
                            </div>


                    </div>

                </div>
                <div className="haf">
                    <div className="cards">
                    <div className="card text-white bg-primary " >
                        <div className="card-header">Header</div>
                        <div className="card-body">
                            <h5 className="card-title">Primary card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the
                                bulk of the card's content.</p>
                        </div>
                    </div>

                    <div className="card text-white bg-secondary " >
                        <div className="card-header">Header</div>
                        <div className="card-body">
                            <h5 className="card-title">Secondary card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the
                                bulk of the card's content.</p>
                        </div>
                    </div>

                    <div className="card text-white bg-success " >
                        <div className="card-header">Header</div>
                        <div className="card-body">
                            <h5 className="card-title">Success card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the
                                bulk of the card's content.</p>
                        </div>
                    </div>


                </div>
                    <div className="cards">
                        <div className="card text-white bg-primary " >
                            <div className="card-header">Header</div>
                            <div className="card-body">
                                <h5 className="card-title">Primary card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the
                                    bulk of the card's content.</p>
                            </div>
                        </div>

                        <div className="card text-white bg-secondary " >
                            <div className="card-header">Header</div>
                            <div className="card-body">
                                <h5 className="card-title">Secondary card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the
                                    bulk of the card's content.</p>
                            </div>
                        </div>

                        <div className="card text-white bg-success " >
                            <div className="card-header">Header</div>
                            <div className="card-body">
                                <h5 className="card-title">Success card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the
                                    bulk of the card's content.</p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )

}