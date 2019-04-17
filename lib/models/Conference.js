"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Conference {
    constructor(name, teams, allStars) {
        this.name = name;
        this.teams = teams;
        this.allStars = allStars;
    }
    toJSON() {
        return {
            // $type: 'com.example.Conference',
            name: this.name,
            teams: this.teams.map(x => x.getTeamId)
        };
    }
    static fromJSON(data, func, list) {
        return new Conference(data.name, data.teams.map((x) => func((y) => y.teamId === x, list)));
    }
    init() {
        this.allStars = [];
        this.teams.forEach(x => {
            x.players.forEach(y => {
                if (y.getRating > 91) {
                    this.allStars.push(y);
                }
            });
        });
    }
}
exports.Conference = Conference;
