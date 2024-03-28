const fetch = require('node-fetch')
//import fetch from 'node-fetch'

class QuizzesService {
    constructor() {
        this._categories = []
        this.difficulties = ["easy", "medium", "hard"]
        this.amount = 3
        this.type = "multiple"
        this._questions = []
        this._currentQuestion = -1
    }

    async getCategories() {
        try {
            const response = await fetch('https://opentdb.com/api_category.php')
            const data = await response.json()
            this._categories = [...data.trivia_categories]
            return this._categories
        } catch (err) {
            return console.log(err)
        }
    }

    getCategory(id) {
        return this._categories.find((category) => category.id == id)
    }

    getDifficulties() {
        return this.difficulties
    }

    async getQuestions(category, difficulty) {
        const query = `https://opentdb.com/api.php?amount=${this.amount}&category=${category}&type=${this.type}&difficulty=${difficulty}`
        try {
            const response = await fetch(query)
            const data = await response.json()
            this._questions = [...data.results]
            console.log(`${this._questions.length} question retrieved from API!`)
            return this._questions
        } catch (err) {
            return console.log(err)
        }
    }

    getQuestion() {
        if(this._currentQuestion < this.amount) return this._questions[this._currentQuestion]

        return false
    }

    getNextQuestion() {
        if(this._currentQuestion+1 < this.amount) return this._questions[++this._currentQuestion]

        return false
    }
}

module.exports = QuizzesService