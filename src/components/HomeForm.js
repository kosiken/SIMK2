import React, {Component} from 'react'
import axios from 'axios'
class HomeForm extends Component{

    state = {
        email:'',
        password:'',
        params:'php'
    }

    onChange = (e) => {
        this.setState({[e.target.id]:e.target.value})
    }

    onSubmit=(e)=> {
       e.preventDefault()
        axios.post('http://localhost/form.php', this.state)
            .then(v=>console.log(v.data))
            .catch(e=> console.log(e.message))

    }

    render() {
        let {params}= this.state
        return(
            <React.Fragment>
                <form onSubmit={this.onSubmit} action={params==='php'? 'login.php?date='+Date.now(): '/login?date='+Date.now()} className="login-form">

                    <div className="form-group">
                        <input onChange={this.onChange} type="email" name="email" id="email" value={this.state.email} placeholder={'Email'}/>

                    </div>

                    <div className="form-group">
                        <input value={this.state.password} onChange={this.onChange} type="password" name="password" id="password" placeholder={'Password'}/>
                    </div>




                    <div className="form-group-submit">
                        <button style={{fontFamily: 'Verdana'}} className="btn btn-secondary" type="submit">Submit</button>
                        <a href="/fopassword.php?ref=web" id={'forgot-password'} className="secondary" style={{marginLeft:'10px'}}>Forgot password </a><br/>
                        <hr style={{ width:'100%', margin:'20px 0'}}/>
                        <br/> <a href="/hhu" className="btn btn-secondary">Login with&nbsp; <i style={{background:'none'}} className="fa fa-facebook"></i></a>
                        &nbsp; <a href="/hh" className="btn btn-secondary" style={{background:'#ec3212'}}>Login with <i style={{background:'none'}} className="fa fa-google"></i> </a>
                    </div>
                </form>
            </React.Fragment>
        )
    }

}

export default HomeForm