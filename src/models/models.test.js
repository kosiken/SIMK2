"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("./Util");
const fs_1 = require("fs");
const axios_1 = require("axios");
let teams;
let dili;
const util = new Util_1.Util(axios_1.default, 0);
util.starts('http://localhost:5000/teams.json', 'http://localhost:5000/players.json', (value) => {
    //dili = value
    let { teams, players } = value;
    dili = util.populateConferencesAndTeams(teams, players);
    dili = util.generateFixtures(dili);
    dili = util.generateFixturesMap(dili);
    dili.fixtures.map((i) => i.play());
    fs_1.writeFileSync('./me.json', JSON.stringify(teams), { encoding: 'utf-8' });
});
//getter()
