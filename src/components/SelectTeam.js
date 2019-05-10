import Team from './Team'
import React from 'react';
import Scroller from './Scroller'
export default function ( teams, colors, selectATeam,leagues) {
    return   (  <div className="content">
        <div className="fixed  tooltiper"
             style={{position: 'sticky', top: '80px', left: '10px', display: 'inline-block'}}>
            <img className='helper-img' src={"/logo.svg"} alt="logo"
                 style={{maxWidth: '50px', position: 'relative'}}/>
            <span className="tooltiptexter" style={{width: 'auto'}}>lion</span></div>
        <div className="container" style={{backgroundColor: 'white'}}>
            <h1>{leagues}</h1>
            <div className="rows" style={{width: '100%'}}>
                <div className="card-grid" style={{width: '100%'}}>
                    <figure id={'team-scroll'} style={ {display:'block',width: `${100*teams.length}%`,  marginLeft:'-100%'}}>
                    {teams.map((t, i) => (
                        <React.Fragment>
                            <Team key={t.short} id={'team' + i} team={t} listView={true}
                                  color={'white'} bgColor={colors[i % colors.length]} selectTeam={selectATeam}/>
                        </React.Fragment>))}
                    </figure>
                    <Scroller/>
                </div>

            </div>
        </div>
    </div>)
}