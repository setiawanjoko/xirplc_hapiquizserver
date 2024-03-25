class QuizHandler {
    constructor(service) {
        this._service = service

        this.getStartMenuHandler = this.getStartMenuHandler.bind(this)
    }

    getStartMenuHandler(request, h) {
        const categories = this._service.getCategories()
        const difficulties = this._service.getDifficulties()

        return h.view('index', {categories, difficulties})
    }
}

module.exports = QuizHandler