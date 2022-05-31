const appServer = require('./appserver')
const start = async () => {
    console.log("starting appserver")
    await appServer.start()
    console.log("started appserver")
}

start()