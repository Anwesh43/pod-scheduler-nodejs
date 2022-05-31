const Pod = require("./Pod")

class PodManager {

    pods = []
     
    async start() {
        const n = process.env.MAX_PODS
        const podPort = process.env.POD_PORT 
        for (let i = 0; i < n; i++) {
            const pod = new Pod(parseInt(podPort) + i, () => {
               console.log("initiated pod server") 
            })
            await pod.start()
            console.log("POD SERVER STARTED on", parseInt(podPort) + i)
            pod.registerClient()
            this.pods.push(pod)
        }
    }

    async requestPod(podData) {
        const freePods = this.pods.filter((pod) => !pod.runningProcess)
        if (freePods.length == 0) {
            return {status: "FAIL"}
        }
        freePods[0].sendData(podData)
        return {status : "SUCCESS"}
    }
}

const podManager = new PodManager()
module.exports = podManager