const fetch = require('node-fetch')
//import fetch from 'node-fetch'

class QuizzesService {
    constructor() {
        this._categories = []
        this.difficulties = ["easy", "medium", "hard"]
        this.amount = 5
        this.type = "multiple"
        this._questions = []
        this._currentQuestion = 0
    }

    getCategories() {
        return fetch('https://opentdb.com/api_category.php')
            .then(response => response.json())
            .then(data => {
                this._categories = [...data.trivia_categories]
            })
            .then(() => {
                return this._categories
            })
            .catch(err => console.log(err))
    }

    getCategory(id) {
        return this._categories.find((category) => category.id == id)
    }

    getDifficulties() {
        return this.difficulties
    }

    getQuestions(category, difficulty) {
        const query = `https://opentdb.com/api.php?amount=${this.amount}&category=${category}&type=${this.type}&difficulty=${difficulty}`
        return fetch(query)
            .then(response => response.json())
            .then(data => {
                this._questions = [...data.results]
                console.log(this._questions)
            })
            .then(() => {
                return this._questions
            })
            .catch(err => console.log(err))
    }

    getQuestion() {
        if(this._currentQuestion < this.amount) return this._questions[this._currentQuestion++]

        return false
    }
}

module.exports = QuizzesService