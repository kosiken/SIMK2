"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Fixture {
    constructor(home, away, veen, id, dele, sort, con, arr, score, regExp, played = false) {
        this.home = home;
        this.away = away;
        this.veen = veen;
        this.id = id;
        this.dele = dele;
        this.sort = sort;
        this.con = con;
        this.arr = arr;
        this.score = score;
        this.regExp = regExp;
        this.played = played;
        //this.score = obj
        if (home === undefined)
            throw Error('no AWAY');
        if (away === undefined)
            throw Error('no AWAY');
        if (home.conferenceName === away.conferenceName)
            this.con = home.conferenceName;
        this.init(home.abbrev, away.abbrev);
    }
    init(h, a) {
        if (a !== undefined) {
            this.sort = `#${h + a}`;
            this.id = ` ${h}${a} ${a}${h} `;
            this.regExp = new RegExp(`${h}${a}`);
            this.arr = 0;
            for (let i = 0; i < h.length; i++) {
                this.arr += a.charCodeAt(i);
                this.arr += h.charCodeAt(i);
            }
        }
        else
            throw new Error('all Teams must be defined \n You must specify the home and away teams');
    }
    sime() {
        this.dele = true;
    }
    upload(a, b) {
        this.score = { home: a, away: b };
    }
    play() {
        let h = this.home.sim();
        let a = this.away.sim();
        if (h == a) {
            return this.play();
        }
        if (h > a) {
            this.home.win(this.away);
            this.away.lose(this.home);
        }
        else {
            this.home.lose(this.away);
            this.away.win(this.home);
        }
        this.score = { home: h, away: a };
        this.played = true;
        return;
    }
    toJSON() {
        return {
            $type: 'com.example.Fixture',
            home: this.home.short,
            away: this.away.short,
            id: this.id,
            score: this.score,
            played: this.played
        };
    }
}
exports.Fixture = Fixture;
