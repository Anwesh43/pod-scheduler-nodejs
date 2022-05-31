const appServer = require('./appserver')
const podManager = require('./podmanager')
const configureDotEnv = require('./configureDotEnv')
const Scheduler = require('./scheduler')
const start = async () => {
    configureDotEnv()
    console.log("starting appserver")
    await appServer.start()
    console.log("started appserver")
    await podManager.start()
    const scheduler = Scheduler(podManager, appServer.appClient(process.env.APP_SERVER_URL))
    scheduler.start()
    console.log("Scheduler start")
}

start()