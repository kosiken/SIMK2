
class Team {
    constructor(teamName, teamId, short, city, abbrev, GM, coach, conferenceName, division, selected = false, next, wonTeams = [], loseTeams = [], app = 0, record = '', done = false, gamesPlayed = 0, set = new Set(), conferenceTeams = [], omy, homeFor, divisionTeams = [], otherTeams = [], fourTeams = [], players = [], lineup = [], starting = [], bench = []) {
        this.teamName = teamName;
        this.teamId = teamId;
        this.short = short;
        this.city = city;
        this.abbrev = abbrev;
        this.GM = GM;
        this.coach = coach;
        this.conferenceName = conferenceName;
        this.division = division;
        this.selected = selected;
        this.next = next;
        this.wonTeams = wonTeams;
        this.loseTeams = loseTeams;
        this.app = app;
        this.record = record;
        this.done = done;
        this.gamesPlayed = gamesPlayed;
        this.set = set;
        this.conferenceTeams = conferenceTeams;
        this.omy = omy;
        this.homeFor = homeFor;
        this.divisionTeams = divisionTeams;
        this.otherTeams = otherTeams;
        this.fourTeams = fourTeams;
        this.players = players;
        this.lineup = lineup;
        this.starting = starting;
        this.bench = bench;
        this.omy = omy !== undefined ? omy : [];
    }
    rec() {
        if (this.gamesPlayed === 0) {
            return 0;
        }
        else
            return this.wonTeams.length / this.gamesPlayed;
    }
    put(...args) {
        // console.log(team)
        for (let t of args) {
            this.set.add(t.short);
            this.omy.push(t.short);
            t.app++;
        }
    }
    get getTeamId() {
        return this.teamId;
    }
    configureMins() {
        this.lineup = starting(this.players).starters;
        this.lineup.forEach(x => {
            x.play = true;
        });
        this.bench = starting(this.players).bench;
        let mins = 48 * 5;
        this.players.forEach(x => {
            let min = setP(x, mins);
            if (min > -1)
                mins -= min;
            // else { console.log(`${x.name} DNP ${x.rating}`) }
            // console.log(mins);
        });
        //
    }
    win(t) {
        this.wonTeams.unshift(t.short);
        this.gamesPlayed++;
        this.update();
    }
    lose(team) {
        this.loseTeams.unshift(team.short);
        this.gamesPlayed++;
        this.update();
    }
    update() {
        this.record = (this.wonTeams.length / this.gamesPlayed).toFixed(3);
    }
    sim() {
        let points = 0;
        this.players.forEach(x => {
            if (x.mins > -1) {
                points += x.playing().points;
            }
            else {
                points = points + 0;
            }
        });
        return points;
    }
    toJSON() {
        return {
            // $type: 'com.example.Team',
            teamName: this.teamName,
            teamId: this.teamId,
            conferenceName: this.conferenceName,
            city: this.city,
            wonTeams: this.wonTeams,
            loseTeams: this.loseTeams,
            division: this.division,
            short: this.short,
            abbrev: this.abbrev,
            selected: this.selected,
            con: this.divisionTeams,
            fun: this.otherTeams,
            div: this.fourTeams,
            omy: this.omy,
            done: this.done,
            record: this.record,
            gamesPlayed: this.gamesPlayed,
            app: this.app,
            GM: this.GM,
            coach: this.coach
        };
    }
}
export default  Team;
function starting(players) {
    const Pgraph = Object.create(null);
    startGraph(Pgraph);
    for (let player of players) {
        const { position } = player;
        switch (position) {
            case 'C':
                Pgraph['C'].push(player);
                break;
            case 'PF':
                Pgraph['PF'].push(player);
                break;
            case 'SG':
                Pgraph['SG'].push(player);
                break;
            case 'SF':
                Pgraph['SF'].push(player);
                break;
            default:
                Pgraph['PG'].push(player);
                break;
        }
    }
    // console.log(Pgraph);
    const returnV = removeW(Pgraph);
    const Bench = returnV.bench;
    const Starters = returnV.starters;
    return { bench: Bench, starters: Starters };
}
function sortList(l) {
    return l.sort((a, b) => {
        return b.getRating - a.getRating;
    });
}
function startGraph(graph) {
    graph['C'] = [];
    graph['PF'] = [];
    graph['SF'] = [];
    graph['PG'] = [];
    graph['SG'] = [];
}
function removeW(graph) {
    let starters = [];
    let bench = [];
    for (let key of Object.keys(graph)) {
        starters.unshift(graph[key].shift());
        graph[key].forEach((x) => {
            bench.push(x);
        });
    }
    bench = sortList(bench);
    starters = sortList(starters);
    return { starters: starters, bench: bench };
}
function setP(player, mins) {
    let min;
    let { age } = player, rating = player.getRating;
    if (mins > -1) {
        if (rating > 89) {
            min = Math.round(mins * 0.16 + Math.random() * 5);
        }
        else if (rating > 79) {
            min = Math.round(mins * 0.13 + Math.random() * 5);
        }
        else if (rating > 69 || age < 22) {
            min = Math.round(mins * 0.085 + Math.random() * 5);
        }
        else {
            min = Math.round(mins * 0.05 + Math.random() * 5);
        }
        player.addMins(min);
        return min;
    }
    else {
        player.addMins(-1);
        return -1;
    }
}
