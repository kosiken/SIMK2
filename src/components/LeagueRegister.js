import LeagueForm from './LeagueForm'
import React from 'react';
export default function (func)
{
return (
    <div className="content"
         style={{minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div className="container">
            <div className={'spacin'}>
                <div className={' haf'} id="description">
                    <img src="/Group%202.png" alt="SIMK" className={'home-hero'}/>
                    <p style={{textAlign: 'left', fontSize: '2em'}}>
                        Simulate an entire basketball season. Become a GM
                    </p>
                    <small style={{display: 'block', marginBottom: '20px', marginTop: '10px'}}>Mobile
                        version coming soon for&nbsp; <i className="fa fa-android"></i> and&nbsp; <i
                            className="fa fa-apple"></i> follow status on <a href="//twitter.com/kosisoali"
                                                                             className="link">&nbsp; <i
                            className="fa fa-twitter"></i></a> or <a href="//twitter.com/kosisoali"
                                                                     className="link">&nbsp; <i
                            className="fa fa-github"></i></a></small>

                </div>
                <div className="haf form-div" style={{overflowX: 'hidden'}}>
                    <p className="story secondary" style={{
                        textAlign: 'center',
                        fontSize: '1.5em',
                        animation: '0.8s linear 0s slideRight'
                    }}>
                        Looks like you do not have any leagues yet, Create One
                    </p>

                    <LeagueForm set={func}/>
                </div>
            </div>
        </div>
    </div>
)
}