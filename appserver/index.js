const fastify = require('fastify')
const reqHandler = require('./ReqHandler')
const start = async () => {
    const server = fastify()
    const queue = []
    server.get('/queuestatus', (req, res) => {
        res.header('content-type', 'application/json')
        res.send({queue : reqHandler.queue})
    });

    server.get('/workingQueueStatus', (req, res) => {
        res.header('content-type', 'application/json')
        res.send({queue: reqHandler.workingQueue})
    })

    server.post('/request', (req, res) => {
        if (!!req.body) {
            reqHandler.addPayload(req.body)
            res.status(200)
            res.send({message: 'successfully added to queue'})
        } else {
            res.status(500)
            res.send({message: 'error adding to queue'})
        }
    
    })
    await server.listen(3000)
}

module.exports = {start} 