import React, { Component} from 'react'
// import uuid from 'uuid'
 import $ from 'jquery'

class Player extends Component {
    state = {
        age: "",
        assists: '',
        assistsL: [],
        blocks: '',
        blocksL: [],
        contract: '',
        firstName: '',
        height: '',
        id: 0,
        lastName: "",
        mins: 0,
        onCourt: false,
        points: '',
        pointsL: [],
        position: '',
        rating:0,
        ratingSpec: {},
        rebounds:0,
        reboundsL: [],
        starting: true,
        statsSpec: {},
        steals: 0,
        stealsL: [],
        team: '',
        teamId:'' ,
        teamName: ""

    }


    componentDidMount () {
        this.setState(this.props.player)
    }

    sub = (e) => {
       $(e.target.id).css('opacity', '0.5');
       this.props.substitute(e.target)

    }

    end = (e) => {
        $(e.target.id).css('opacity', '1');

    }

    onClick = (e) => {



            let {firstName, lastName, rating} = this.state

            $('#' + firstName + lastName + rating).toggleClass('disp')

}

toggleModal =(e) => {
        if(e.target.classList.contains('modal')) {
            let {firstName, lastName, rating} = this.state

            $('#' + firstName + lastName + rating).toggleClass('disp')

        }
}
    showMins = (e) => {
        let {firstName, lastName, rating} = this.state

        $('#'+firstName+lastName+rating+ 'form').toggleClass('shower')

    }
render () {
        let {position,  firstName, lastName, rating, statsSpec,  contract, mins} = this.state
        if (this.props.table && this.props.lineupStart) {
            return       (
                    <tr className="player spacing" >
                        <td  className="player-position">{ this.state.position}</td>
                        <td className="player-name">{ this.state.lastName}</td>
                        <td  className="player-age">{this.state.age}</td>
                        <td className="player-rating">{this.state.rating}</td>
                    </tr>
                )

        }
        else if (this.props.fixedView) {
            return(
                <React.Fragment>
                <li className="player spacing" onClick={this.onClick} style={{cursor: 'pointer'}}>


                    <span className="player-name inline-bloq">{firstName + ' ' + lastName}</span>
                    <span className="player-name inline-bloq">{rating}</span>

                </li>

                    <div className="modal" id={firstName+lastName+rating} onClick={this.toggleModal}>
                        <div className="card" style={{width: '18rem', position: 'relative', zIndex: '99999',     color: '#212529'}}>
                            <img className="card-img-top" src="./Group 2.png" alt="Player"/>

                            <div className="card-body">

                                <h5 className="card-title">{firstName + ' ' + lastName}  <span className={'player-position p-2 ' +position} >{position}</span></h5>
                                <p className="card-text">{lastName} is on a 4 year  ${contract}million contract with a lion option</p>
                            </div>

                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>PPG</th>
                                        <th>RPG</th>
                                        <th>APG</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{statsSpec.PPG}</td>
                                        <td>{statsSpec.RPG}</td>
                                        <td>{statsSpec.APG}</td>
                                    </tr>
                                    </tbody>
                                </table>


                            </div>
                        </div>

                    </div>
                </React.Fragment>

            )
        }
        else return(
            <React.Fragment>
                <li className="player-checkbox inline-bloq" ><input onChange={this.props.adder} data-target={firstName + ' ' +lastName } className={this.props.lineup}  type="checkbox" name={firstName + position + lastName} id={firstName + position + lastName + rating}  /></li>
            <ul className="player player-cont" draggable="true" id={firstName+lastName} onDragStart={this.sub} onDragEnd={this.end} data-player = {firstName + lastName} style={{position: 'relative'}} onClick={this.onClick}>

                <li className={'player-position inline-bloq ' +position} >{position}</li>
                <li className="player-name inline-bloq">{firstName + ' ' + lastName}</li>
                <li className="player-name inline-bloq">{rating}


                </li>
                <li className="player-feeling inline-bloq happy" style={{color: '#28a745'}}><i className="fas fa-smile">&nbsp;</i></li>
                <li className="player-mins inline-bloq">{mins}mins</li>



            </ul>


                <div className="modal" id={firstName+lastName+rating} onClick={this.toggleModal}>
                    <div className="card" style={{width: '18rem', position: 'relative', zIndex: '99999'}}>
                        <img className="card-img-top" src="./Group 2.png" alt="Player"/>

                        <div className="card-body">
                            <h5 className="card-title">{firstName + ' ' + lastName}</h5>
                            <p className="card-text">{lastName} is on a 4 year  ${contract}million contract with a lion option</p>
                        </div>

                        <div className="card-body">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>PPG</th>
                                    <th>RPG</th>
                                    <th>APG</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{statsSpec.PPG}</td>
                                    <td>{statsSpec.RPG}</td>
                                    <td>{statsSpec.APG}</td>
                                </tr>
                                </tbody>
                            </table>

                            <button onClick={this.showMins}>Show</button>
                            <div className="color player-position PF" style={{padding: '10px'}}>


                                <form  className="player-edit none"id={firstName+lastName+rating+'form'}>
                                    <input type="text" placeholder={mins}/>

                                </form>


                            </div>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        )
}

}

export default Player