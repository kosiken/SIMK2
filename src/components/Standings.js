import  React, {Component} from 'react'

import uuid from 'uuid'
import Team from "./Team";
import board from './board'
export default class Standings extends Component {
    state = {
        Eastern: this.props.Conferences['Eastern'],
        Western: this.props.Conferences['Western'],
        show:'eastern'
    }

onClick= (e) => {
        this.setState({show: e.target.dataset.conference})
}
    componentDidMount() {
        this.props.refreshConf()

    }

    render () {
        let {Eastern, Western, show} = this.state


            let teams = show === 'eastern' ? Eastern.teams : Western.teams

        return (
            <div className="content">
                {board('standings', this.props.plays)}
                <div className="container" style={{backgroundColor: '#fff'}}>
                    <div className="toggle-view spacin" >

                            <button className={"btn" + (show === "eastern"? " in-use":'')} onClick={this.onClick} data-conference="eastern" style={{width:'50%', backgroundColor:'#fff'}}>Eastern</button>
                            <button className={"btn" + (show === "eastern"?'': " in-use")} onClick={this.onClick} data-conference="western" style={{width:'50%', backgroundColor:'#fff'}}>Western</button>


                    </div>
                    <table className={'table'} >
                        <thead>
                        <tr>
                            <th>Pos</th>
                            <th>Team</th>
                            <th>
                                Record
                            </th>
                            <th>Won</th>
                            <th>Lost</th>
                        </tr>
                        </thead>
                        <tbody>
                        {teams.map((t, i) => (<Team key={uuid()} team={t} standingsView={true} position={i}/>))}
                        </tbody>
                    </table>
                </div>
            </div>
        )

    }

}