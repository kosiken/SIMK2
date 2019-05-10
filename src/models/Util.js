//"use strict";

import Player from './Player'
import Team from'./Team'
import Fixture from './Fixture'
import Conference from './Conference'
//import { IncomingMessage } from "http";
function getTeam(k, t) {
    return t.find(x => k === x.teamName || k === x.short || k === x.abbrev);
}
class Util {
    constructor(api, counter = 0) {
        this.api = api;
        this.counter = counter;
    }
    starts(urlTeam = '/teams.json', urlPlayers = '/players.json', cb) {
        let teams = [], players = [];
        this.api.get(urlPlayers)
            .then((v) => {
            players = v.data;
            this.api.get(urlTeam)
                .then((response) => {
                teams = response.data;
                cb({
                    teams: teams.map(({ teamName, teamId, short, city, abbrev, GM, coach, conferenceName, division }) => new Team(teamName, teamId, short, city, abbrev, GM, coach, conferenceName, division)),
                    players: players.map(({ firstName, lastName, rating, age, position, height, teamId, teamName, ratingSpec }) => new Player(firstName, lastName, rating, age, position, height, teamId, teamName, ratingSpec))
                });
            });
        });
    }
    // create the players and teams array
    getTeam(teamName, teamList) {
        return getTeam(teamName, teamList);
    }
    generateFixtures(teamConferenceObject) {
        const { Western: west, Eastern: east } = teamConferenceObject;
        const TeamMap = Object.create(null);
        let teamList = west.teams.concat(east.teams);
        const fixturesArray = [];
        createTeamMap(TeamMap, teamList);
        configureTeamFixturesConference(TeamMap, teamList, fixturesArray);

      return  finallyPopulateFixtureArray( teamList, 0);

    }
    generateFixturesMap(fixturesArray) {
        const FixtureMap = Object.create(null);
        let fixtures = [];
        for (let f = 0; f < 87; f++) {
            FixtureMap[f] = {
                og: new Set(),
                den: [],
                gear: function (h) {
                    // let v = f
                    this.og.add(h.home.abbrev);
                    this.og.add(h.away.abbrev);
                    this.den.push(h);
                },
                peel: function (d) {
                    this.one = d.slice(0, 5).filter(x => x !== undefined);
                    this.two = d.slice(5, 9).filter(x => x !== undefined);
                    this.three = d.slice(9, 15).filter(x => x !== undefined);
                }
            };
        }
        let fee = fixturesArray.map(x => x).reverse();
        for (let b in FixtureMap) {
            fee.forEach((x) => {
                if (FixtureMap[b].den.length < 15) {
                    if (!FixtureMap[b].og.has(x.home.abbrev) && !FixtureMap[b].og.has(x.away.abbrev)) {
                        FixtureMap[b].gear(x);
                        x.sime(); // return '#' + x.home.abbrev + x.away.abbrev
                    }
                }
            });
            fee = fee.filter(x => x.dele === undefined).reverse();
        }
        Object.keys(FixtureMap).forEach((x, i) => {
            FixtureMap[parseInt(x)].peel(FixtureMap[parseInt(x)].den);
            fixtures.push(...FixtureMap[parseInt(x)].den);
        });
       fixtures.forEach(fix=> {
           fix.inFixArr =  true
       })

        fixtures = fixtures.concat(fixturesArray.filter(fix=> !fix.inFixArr))
        return { fixtureMap: FixtureMap, fixtures: fixtures };
    }
    formatPosition(position) {
        let arr = position.split('');
        let [num1, num2] = arr;
        if (num2) {
            return num1 + format(num2, num1);
        }
        return format(num1);
        function format(num, numb) {
            let ans;
            if (numb==='1') return num+'th'
            switch (num) {
                case '1':
                    ans = num + 'st';
                    break;
                case '2':
                    ans = num + 'nd';
                    break;
                case '3':
                    ans = num + 'rd';
                    break;
                default:
                    ans = num + 'th';
                    break;


            }
            return ans;
        }
    }
    populateConferencesAndTeams(TeamList, PlayerList) {
        PlayerList.map(player => { player.putTeam(TeamList); });
        TeamList.map(i => { i.configureMins(); });
        return {
            Western: new Conference('West', TeamList.filter((team) => team.conferenceName === 'West')),
            Eastern: new Conference('East', TeamList.filter((team) => team.conferenceName === 'East'))
        };
    }



    getNextFixture (fixturesArray) {
        return fixturesArray.find(fixture => fixture.home.selected|| fixture.away.selected && !fixture.played)
    }


    getTeamFixture(fixturesArray) {
        let index = fixturesArray.findIndex(fixture => fixture.home.selected|| fixture.away.selected)
        return  fixturesArray.slice(0, index+1)
    }
}
export default Util;
/*
* @param {Array<any>} fixArr - This is the Fixtures Array
* */
function createTeamMap(teamMap, teamList) {
    teamList.forEach((team) => {
        if (!teamMap[team.division])
            teamMap[team.division] = {
                divisionTeams: teamList.filter(t => t.division === team.division).map(u => u.short), otherTeams: teamList.filter(t => t.conferenceName === team.conferenceName && t.division !== team.division).map(u => u.short)
            };
    });
}
function configureTeamFixturesConference(teamMap, teamList) {
    let limiter = 0;
    //let build = {}
    Object.keys(teamMap).forEach(x => {
        let i = 0;
        let filled = false;
        while (!filled && limiter < 600) {
            teamMap[x].otherTeams.forEach((g) => {
                let team = getTeam(teamMap[x].divisionTeams[i], teamList), y = getTeam(g, teamList);
                if (!team)
                    filled = true;
                else {
                    if (!team.set.has(y.short) && y.set.size < 4) {
                        y.put(team);
                        team.put(y);
                    }
                    if (team.set.size === 4) {
                        i++;
                    }
                }
            });
            limiter++;
        }
    });
    teamList.forEach(i => {
        i.otherTeams = (teamList.filter(p => p.conferenceName !== i.conferenceName).map(d => d.short));
        i.fourTeams = teamList.filter(p => p.conferenceName === i.conferenceName && !i.set.has(p.short) && i.division !== p.division).map(d => d.short);
        i.divisionTeams = teamMap[i.division].divisionTeams.filter((o) => o !== i.short);
    });
}
function finallyPopulateFixtureArray( teamList, count) {
    let fixturesArray = []

    let three = [], deletingSet;
    teamList.forEach((x) => {
        x.omy.map(i => getTeam(i, teamList)).forEach(ot => {
            three.push(new Fixture(x, ot, count++));
            three.push(new Fixture(x, ot, count++));
        });
        x.otherTeams.map(i => getTeam(i, teamList)).forEach(ot => {
            fixturesArray.push(new Fixture(x, ot, count++));
        });
        x.fourTeams.map(i => getTeam(i, teamList)).forEach(ot => {
            fixturesArray.push(new Fixture(x, ot, count++));
            fixturesArray.push(new Fixture(x, ot, count++));
        });
        x.divisionTeams.map(i => getTeam(i, teamList)).forEach(ot => {
            fixturesArray.push(new Fixture(x, ot, count++));
            fixturesArray.push(new Fixture(x, ot, count++));
        });
    });
    deletingSet = new Set(three.map(i => i.id));
    deletingSet.forEach(i => {
        three.filter(f => f.regExp.test(i))[0].sime();
    });
    fixturesArray = fixturesArray.concat(three.filter(f => !f.dele));

    return fixturesArray
    //fixturesArray = fixturesArray.concat(three.concat(four))

}

/*
* @throws TeamError
* */
