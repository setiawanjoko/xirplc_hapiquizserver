const routes = (handler) => [
    {
        method: 'GET',
        path: '/start',
        handler: (request, h) => handler.getStartMenuHandler(request, h)
    },
    {
        method: 'POST',
        path: '/start',
        handler: (request, h) => handler.postStartMenuHandler(request, h)
    },
    {
        method: 'GET',
        path: '/question',
        handler: (request, h) => handler.getQuestionHandler(request, h)
    }
]

module.exports = routes