const Hapi = require('@hapi/hapi')
const path = require('path')
const QuizzesService = require('./services/QuizzesService')
const quizzes = require('./api/quiz')

const init = async () => {
    const service = new QuizzesService()
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            files: {
                relativeTo: path.join(__dirname, '../public')
            }
        }
    })

    await server.register([ require('@hapi/inert'), require('@hapi/vision') ])

    server.route([
        {
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: '.',
                    redirectToSlash: true
                }
            }
        }
    ])

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates',
        partialsPath: 'templates/partials'
    })
    
    await server.register([
        {
            plugin: quizzes,
            options: {
                service
            }
        }
    ])

    server.route([
        {
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                return h.view('index')
            }
        },
        {
            method: 'GET',
            path: '/login',
            handler: (request, h) => {
                return h.view('login')
            }
        }
    ])

    await server.start()
    console.log(`Server berjalan di ${server.info.uri}`)
}

init()