const net = require('net')
const cp = require('child_process')

class Pod {

    started = false 
    server 
    runningProcess = false 
    client 

    constructor(portNumber, cb) {
        this.cb = cb
        this.portNumber = portNumber 
    }
    start() {
        return new Promise((resolve, reject) => {
            if (!this.started) {
                console.log("starting server")
                this.server = net.createServer((socket) => {
                    this.cb(socket)
                    socket.on('data', (data) => {
                        const podData = JSON.parse(data.toString())
                        const {image, port} = podData 
                        cp.exec(`docker run ${image} -p ${port}:${port}`, (err) => {
                            if (err == nil) {
                                console.log(`started running ${image} on ${port}`)
                                this.runningProcess = true 
                            }
                        })
                    })
                })
                console.log("PORT_NUMBER", this.portNumber)
                this.server.listen({port : this.portNumber}, () => {
                    console.log("Server started")
                    this.started = true 
                    resolve()
                })
                this.server.on('error', reject)
            }
        })
        
    }

    stop() {
        this.server.close()
    }

    registerClient() {
        this.client = net.createConnection({port : this.portNumber}, () => {
            console.log("connected to pod server")
        })
        this.client.on('data', (data) => {
            const msg = data.toString()
        })

        this.client.on('end', () => {

        })
    }

    sendData(podRequest) {
        this.client.write(Buffer.from(JSON.stringify(podRequest)))
    }
}

module.exports = Pod 