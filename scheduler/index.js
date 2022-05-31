
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
                
            }, SCHEDULER_INTERVAL_IN_MS)
        }
    }
}