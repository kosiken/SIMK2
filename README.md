# SIMK2 ![build](https://travis-ci.com/kosiken/SIMK2.svg?branch=master)


[CLANG](https://raw.githubusercontent.com/kosiken/SIMK2/master/public/logo.svg)


Just a simple season simulator

- [Front End Docs](#front-end)
- [Classes](#classes)

## Front End

This section documents the code that was used  in making up the front end part of the project. [React](https://github.com/facebook/react) was used for this

## Table of Contents

- [App Component](#app-component)
- [Layout Components](#layout-components)
- [League Component](#league-component)
- [Fixture Component](#fixture-component)
- [Team Component](#team-component)
- [Player Component](#player-component)

## App Component

This just contains the other components like the layout and the main league components
That is

```js

import React, { Component } from 'react';
import Header from './layout/Header'
import League from  './components/League'
import Footer from './layout/Footer'

class App extends Component {

    state = {
        color:'#f39848',
        bg:'#fff',
        isAuthenticated:true,
        server:'php',
        isDev: true,
        session: '',
        teamName: ''
    }


    render() {
        let {color, bg,isAuthenticated,teamName} = this.state
        return (
            <React.Fragment>
            {Header(bg, color, teamName, isAuthenticated)}
             <League/>
               <Footer/>
            </React.Fragment>

    );
    }
}




```

## Layout Components

These are contained in the layout directory. These are the Header and Footer of the app
The header component is rendered so

```js

Header(background, color, teamName, isAuthenticated)

```

it takes the following arguments

- background
- color
- teamName
- isAuthenticated

Background just sets the background color of the header, Color the color of the header text, teamName shows the currently selected team, isAuthenticated shows if the user is logged in

The Footer Component just renders the footer

## League Component

This is the main component of the  application, It houses all the components concerned with running the game, it has the following states

### League State

- name:  The Name chosen for the current league 
- season:     The number of seasons played
- conferences:  Holds the conferences object
- count:  Number of rounds played
- teams:  Holds an array of the current league teams
- players:  Holds an array of the currnt league players
- selectTeam:  Holds the name of the current selected team
- fixtureMap:  Holds the fixture map object
- leagues:  Just for validation
- colors:  Holds an array of color strings(for team colors)
- played:  Holds an array of the fixtures that have been played
- remaining: Holds an array of the remaining fixtures

it also stores the util object of the league

```js

class League extends Component {
    util= new Util(Axios, 0)
}

```

it implements the following methods

### ComponentDidMount()

The Usual react componentdid mount method to initialize the application

```js

// This is an example implementation
componentDidMount() {
    this.util.starts('/teams.json', '/players.json',(data )=>{
            let {teams, players} = data;
        let ConfObj = this.util.populateConferencesAndTeams(teams, players);

        let fixuresArray = this.util.generateFixtures(ConfObj)
        console.log( fixuresArray.length)
        let fixuresMap =this.util.generateFixturesMap(fixuresArray);

        let leagues = localStorage.getItem('league') |false
        let value =  localStorage.getItem('selected')||false, selectTeam
        !value? selectTeam = '': selectTeam=this.util.getTeam(value, teams)
        selectTeam.selected = true

        this.setState({teams: teams, players: players, conferences: ConfObj,
        selectTeam : selectTeam,
            nextFixture :  this.util.getNextFixture(fixuresMap.fixtures),
        leagues:leagues,
        fixtureMap: fixuresMap,
        remaining: fixuresMap.fixtures})

    })

```

### getTeam

returns a team object identified by the team identifier
passes the team identifier and  [teams array](#League_state) to the [Util.getTeam](#getTeamUtil)

```js
let teamIdentifier = 'fire'
console.log(League.getTeam(teamIdentifier))

/*
*Team {
    teamName: Ryev...

*
*/

```

- teamIdentifier:  string|number

### getPositionOfTeam

takes a team name and a conference object to return the position of the team in its conference

- teamName: string
- conference string

```js

let teamName = 'fire'
let conference  = 'west'

getPositionOfTeam(teamName, conference)

// =>  1st in the west

```

### play

>League.play()

Implements the [play method](#fixture) of the fixture object passed or for each fixture object of an array of fixtures

### getNextFixture

Returns the [util](#util) objects getNextFixture method passing the [remaining](#league-state) fixtures array to it

### selectATeam

>League.selectATeam(name)

Sets the value of the [selecTeam](#league-state)  in the league state  to the team with the same name passed or throws an error if the name does not exist

### regLeageue

>League.regLeageue(name)

Sets the value of the [leagues](#league-state)  in the league state to true and saves it in local storage. Will throw error if the name is nulll, undefined or ''

### refConf

Sorts the values each [Conference Object](#conference) in the [conferences](#league-state) object of the league state in descending order acording to [Team records](#record)

## Fixture Component

Renders a visual representaion of a [Fixture](#fixture), clicking on a fixture component will open up a modal which holds the full information of the fixture 

### Fixture State

- fixture: Holds a fixture object

## Team Component

Renders a visual representaion of a [Team](#team), clicking on a team component will open up a window which holds the full information of the team

```js
class Team extends Component {
    dragged= ''
    playersSubFromBench = []
    playersSubtoBench = []
    state = {
       team:this.props.team

    }
}

```


### Team State

- Team: Holds a team object

## Team Component methods

### selectingIt

>Team.selectingIt()

Implements the [League Comoponent`s selectATeam](#selectATeam) method pasing the name of the team stored in its [state](#team-state) object

### refresh

>Team.refresh(bench[,lineup])

- bench: an array of [Players](#player)
- lineup: an array of [Players](#player) ~optional argument

Sorts each argument passed to it in descending order in respect to [ratings](#rating)

### removeAnItem

>Team.removeAnItem(array, identifier)

- array: Array
- identifier: String|Number

Removes an element from an array that matches the identifer

example

```js

let array = [1, 2, 3, 4]

Team.removeAnItem(array, 3)
console.log(array)
// [1, 2, 4]

```

## Player Component

Renders a visual representaion of a [Player](#player), clicking on a player component will open up a modal which holds the full information about the player

```js

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
}

```

### Player State

Holds the properties of the  [Player](#player) stored in it

## Classes

- [Util](#util)
- [Conference](#conference)
- [Fixture](#fixture)
- [Team](#team)
- [Player](#player)

## Util

```js

class Util {
    constructor(api, counter = 0) {
        this.api = api;
        this.counter = counter;
    }
}

```

## Util Methods

### starts

>UtilObject. starts(urlTeam, urlPlayers, cb)

- urlTeam: String ~The url from which to get the team.json file
- urlPlayers: String ~The url from which to get the player.json file
- cb: Function ~ Callback is passed an object containing an array of [teams](#team) and an array of [players](#player)

```js

function cb (obj) {
    console.log(obj.teams, obj,players)
}
UtilObject. starts(urlTeam = '/teams.json', urlPlayers = '/players.json', cb)
/*
* [
    Team {
        teamName: 'Rye...
]
[
    Player {
        firstName: 'Pro..
]
*/

```

## getTeamUtil

>UtilObject.getTeam(teamIdentifier, teamList)

- teamIdentifier: String|Number
- teamList: Array of Teams

returns a [Team](#team) that matches the teamIdentifier parameter in the teamlist parameter

```js
console.log(UtilObject.getTeam('fire', teamList))
/*
*Team {
    teamName: Ryev...

*
*/
```

## generateFixtures

> Util.generateFixtures(teamConferenceObject) 

- teamConferenceObject: an object containing two [conferences](#conference) ~West and East

returns an array of fixtures

```js

let fixtures = Util.generateFixtures(teamConferenceObject);
console.log(fixtures)

/*
[
    Fixture {
        home: {
            Team...
        }..
    }..
]
*/

```

## Team

>Coming Up

## Player

>Coming Up

## Fixture

> Coming Up

- [Twitter](https://twitter.com/kosisoali)
