const appServer = require('./appserver')
const podManager = require('./podmanager')
const configureDotEnv = require('./configureDotEnv')
const start = async () => {
    configureDotEnv()
    console.log("starting appserver")
    await appServer.start()
    console.log("started appserver")
    await podManager.start()

}

start()