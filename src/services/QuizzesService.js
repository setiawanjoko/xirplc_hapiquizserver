class QuizzesService {
    constructor() {
        this.categories = [
            {
                id: 9,
                name: "General Knowledge"
            },
            {
                id: 10,
                name: "Entertainment: Books"
            },
            {
                id: 11,
                name: "Entertainment: Games"
            },
            {
                id: 12,
                name: "Entertainment: Movies"
            }
        ]
        this.difficulties = ["easy", "medium", "hard"]
    }

    getCategories() {
        return this.categories
    }

    getDifficulties() {
        return this.difficulties
    }
}

module.exports = QuizzesService