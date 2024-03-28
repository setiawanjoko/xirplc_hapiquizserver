class PlayerService {
    constructor() {
        this.name = 'Player One'
        this.score = 0
    }

    addScore(score) {
        this.score += score
        return this.score
    }

    flushScore() {
        this.score = 0
        return true
    }
}

module.exports = PlayerService