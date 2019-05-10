import React ,{Fragment}from 'react'

import {Link} from 'react-router-dom'
import './Home.css'
import HomeForm from "../components/HomeForm";
export default (server, dev, auth, func) => {
   // console.log(faAppleAlt)

    return (
       <div className="content-home" style={{minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
           <div className="container" >

               {/*<div className="slider">*/}
                   {/*<figure>*/}


                       {/*<div className="slide" id={' img-div'} style={{textAlign:'center'}}>*/}
                           {/*<img src="/hero.jpg" alt="SIMK" id={'team-logo-home'}/>*/}

                       {/*</div>*/}
                       {/*<div className="slide blue secondary">*/}
                           {/*<p className={'des'}>*/}
                               {/*SLIDE 1*/}
                           {/*</p>*/}
                       {/*</div>*/}
                       {/*<div className="slide accent" >*/}
                           {/*<p className={'des'}>*/}
                               {/*MORE GAMES BY KRC MEDIA*/}
                           {/*</p>*/}
                           {/*<a href="/more" className="link" target={'_blank'} rel="noopener noreferrer">Click Here</a>*/}
                       {/*</div>*/}
                       {/*<div className="slide accent dark" >*/}
                           {/*<p className={'des'}>*/}
                               {/*SLIDE 3*/}
                           {/*</p>*/}

                       {/*</div>*/}
                   {/*</figure>*/}
               {/*</div>*/}

               <div className="spacin">
                  <div className={' haf'} id="description">
                      <img src="/Group%202.svg" alt="SIMK" className={'home-hero'}/>
                     <p style={{textAlign:'left', fontSize:'2em'}}>
                         Simulate an entire basketball season. Become a GM
                     </p>
                      <small style={{display:'block', marginBottom:'20px', marginTop:'10px'}}>Mobile version coming soon for&nbsp; <i className="fa fa-android"></i>  and&nbsp; <i className="fa fa-apple"></i>   follow status on <a href="//twitter.com/kosisoali" className="link">&nbsp; <i className="fa fa-twitter"></i></a> or          <a href="//twitter.com/kosisoali" className="link">&nbsp; <i className="fa fa-github"></i></a></small>
                      <Link to="/register" className="btn btn-primary " >Sign up</Link>
                  </div>
                  <div className="form-div haf">
                      <div className="container">
                          <p style={{textAlign:'center', fontSize:'1.4em'}} className="secondary">Login</p>
                      </div>
                      {/*form*/}
                      <HomeForm auth={func}/>
                  </div>
              </div>






           </div>
       </div>

    )
  
}
