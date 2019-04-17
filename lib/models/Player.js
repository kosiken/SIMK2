"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import uuid from 'uuid'
class Player {
    constructor(firstName, lastName, rating, age, position, height, teamId, teamName, ratingSpec, assistsL = [], pointsL = [], reboundsL = [], blocksL = [], stealsL = [], id = 0, statsSpec = {
        PPG: '0.00',
        RPG: `0.00`,
        APG: `0.00`,
        SPG: `0.00`,
        BPG: `0.00`
    }, contract, mins, points, rebounds, steals, assists, blocks, team, starting = false, onCourt = false) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.rating = rating;
        this.age = age;
        this.position = position;
        this.height = height;
        this.teamId = teamId;
        this.teamName = teamName;
        this.ratingSpec = ratingSpec;
        this.assistsL = assistsL;
        this.pointsL = pointsL;
        this.reboundsL = reboundsL;
        this.blocksL = blocksL;
        this.stealsL = stealsL;
        this.id = id;
        this.statsSpec = statsSpec;
        this.contract = contract;
        this.mins = mins;
        this.points = points;
        this.rebounds = rebounds;
        this.steals = steals;
        this.assists = assists;
        this.blocks = blocks;
        this.team = team;
        this.starting = starting;
        this.onCourt = onCourt;
        let okey;
        if (rating > 87)
            okey = 100;
        else if (rating > 80)
            okey = 80;
        else if (rating > 70)
            okey = 50;
        else
            okey = 20;
        this.contract = okey;
    }
    putTeam(Teamlist) {
        Teamlist.find(o => o.getTeamId === this.teamId).players.push(this);
    }
    get getRating() {
        return this.rating;
    }
    assignTeam(t) {
        this.team = t;
    }
    addMins(mins) {
        this.mins = mins;
    }
    set play(value) {
        this.starting = value;
    }
    set togglePlay(value) {
        this.onCourt = value;
    }
    get court() {
        return this.onCourt;
    }
    get statusPlaying() {
        return this.starting;
    }
    playing() {
        if (this.mins !== -1) {
            this.points = calcStat(this.ratingSpec, this.mins).points;
            this.rebounds = calcStat(this.ratingSpec, this.mins).rebounds;
            this.assists = calcStat(this.ratingSpec, this.mins).assists;
            this.steals = calcStat(this.ratingSpec, this.mins).steals;
            this.blocks = calcStat(this.ratingSpec, this.mins).blocks;
            this.assistsL.push(this.assists);
            this.pointsL.push(this.points);
            this.reboundsL.push(this.rebounds);
            this.stealsL.push(this.steals);
            this.blocksL.push(this.blocks);
            this.statsSpec = {
                PPG: average(this.pointsL),
                RPG: average(this.reboundsL),
                APG: average(this.assistsL),
                SPG: average(this.stealsL),
                BPG: average(this.blocksL)
            };
            return {
                points: this.points,
                rebounds: this.rebounds,
                assists: this.assists,
                steals: this.steals,
                blocks: this.blocks
            };
            //  console.log( this.points );
        }
        else {
            return {
                points: 0,
                rebounds: 0,
                assists: 0,
                steals: 0,
                blocks: 0
            };
        }
    }
}
exports.Player = Player;
function calcStat(ratingSpec, mins) {
    const { attackR, blockingR, passingR, reboundingR, stealsR } = ratingSpec;
    let points = Math.floor((Math.random() * mins * attackR) / 80);
    let rebounds = Math.floor(((Math.random() * (mins * reboundingR) / (100 * 1.68))));
    let assists = Math.floor(((Math.random() * ((mins * passingR) / (100 * 1.68)))));
    let steals = Math.floor(((Math.random() * mins * stealsR)) / 500);
    let blocks = Math.floor(((Math.random() * mins * blockingR)) / 500);
    return {
        points,
        rebounds,
        assists,
        steals,
        blocks
    };
}
function average(array) {
    if (array.length === 0 || !array.length)
        return '0.00';
    return (array.reduce((a, b) => a + b) / array.length).toFixed(2);
}
