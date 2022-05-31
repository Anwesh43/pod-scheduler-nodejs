const limit = 4 

class ReqHandler {

    queue = []
    workingQueue = []
    
    addPayload(req) {
        if (this.queue.length < limit) {
            this.queue.push(req)
        } else {
            this.workingQueue.push(req)
        }
    }

    poll() {
        if (this.queue.length > 0) {
            const data = this.queue.splice(0, 1)[0]
            if (this.workingQueue.length > 0) {
                this.queue.push(this.workingQueue.splicr(0, 1)[0])
            }
            return data 
        }
    }
}

module.exports = new ReqHandler()