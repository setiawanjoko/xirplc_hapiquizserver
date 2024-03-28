class QuizHandler {
    constructor(service) {
        this._service = service

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
        return this.getQuestionHandler(request, h)
    }

    getQuestionHandler(request, h) {
        let question = this._service.getQuestion()
        question.incorrect_answers.push(question.correct_answer)

        return h.view('question', {question})
    }
}

module.exports = QuizHandler