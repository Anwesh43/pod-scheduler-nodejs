const { appClient } = require("../appserver")
const podManager = require("../podmanager/PodManager")

class Scheduler {

    started = false 
    appClient 
    constructor(podManager, appClient) {
        this.podManager = podManager 
        this.appClient = appClient 
    }

    start() {
        const {SCHEDULER_INTERVAL_IN_MS} = process.env 
        if (!this.started) {
            this.started = true 
            this.interval = setInterval(() => {
                this.appClient.poll().then((data) => {
                    if (!!data && Object.keys(data).length > 0) {
                        console.log("PULLED_DATA", data)
                        this.podManager.requestPod(data)
                    }
                })
            }, SCHEDULER_INTERVAL_IN_MS)
        }
    }
}

module.exports = (podManager, appClient) => new Scheduler(podManager, appClient) 