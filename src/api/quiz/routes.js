const routes = (handler) => [
    {
        method: 'GET',
        path: '/start',
        handler: (request, h) => handler.getStartMenuHandler(request, h)
    }
]

module.exports = routes