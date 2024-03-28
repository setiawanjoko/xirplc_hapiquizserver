const PlayerService = require('../../services/PlayerService')

class QuizHandler {
    constructor(service) {
        this._service = service
        this._player = new PlayerService()

        this.getStartMenuHandler = this.getStartMenuHandler.bind(this)
    }

    async getStartMenuHandler(request, h) {
        const categories = await this._service.getCategories()
        const difficulties = this._service.getDifficulties()

        return h.view('index', {categories, difficulties})
    }
    
    async postStartMenuHandler(request, h){
        let {id: category} = this._service.getCategory(request.payload.categories)
        await this._service.getQuestions(category, request.payload.difficulties)
        this._player.flushScore()
        return h.redirect('/question')
    }

    getQuestionHandler(request, h) {
        let question = this._service.getNextQuestion()
        if(!question) return h.redirect('/score')

        question.incorrect_answers.push(question.correct_answer)
        return h.view('question', {question})
    }

    postQuestionHandler(request, h) {
        let attemptedQuestion = this._service.getQuestion()
        if(request.payload.answer == attemptedQuestion.correct_answer) this._player.addScore(10)
        
        return this.getQuestionHandler(request, h)
    }

    getScoreHandler(request, h) {
        const player = this._player
        return h.view('score', {player})
    }
}

module.exports = QuizHandler