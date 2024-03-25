const QuizHandler = require('./handler')
const routes = require('./routes')

const quizzes = {
    name: 'quizzes',
    register: async (server, {service}) => {
        const handler = new QuizHandler(service)
        server.route(routes(handler))
    }
}

module.exports = quizzes