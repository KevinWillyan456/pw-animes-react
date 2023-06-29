import jsonServer from 'json-server'
import path from 'path'

const server = jsonServer.create()
const router = jsonServer.router(path.join('./api/db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(router)
server.listen(5000, () => {
    console.log('JSON Server is running port 5000')
})
