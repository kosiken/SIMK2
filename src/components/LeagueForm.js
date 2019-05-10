import React, {Component} from "react";


class LeagueForm extends Component{

    state = {
     league: '',
        leagueHold: 'SIMK2'
    }

    onChange = (e) => {
        this.setState({[e.target.id]:e.target.value})
    }

    onSubmit=(e)=> {
        e.preventDefault()
        let ans = this.state.league===''? 'SIMK2': this.state.league
        this.props.set(ans)

    }

    render() {

        return(
            <React.Fragment>
                <form onSubmit={this.onSubmit} className="login-form">

                    <div className="form-group">
                        <div className="tooltiper">
                            <input onChange={this.onChange} type="text" name="league" id="league" value={this.state.league} placeholder={this.state.leagueHold}/>
                            <span className="tooltiptexter">You can set any name you want</span>
                        </div>


                    </div>




                    <div className="form-group-submit">
                        <button style={{fontFamily: 'Verdana'}} className="btn btn-secondary" type="submit">Submit</button>

                    </div>
                </form>
            </React.Fragment>
        )
    }

}

export default LeagueForm