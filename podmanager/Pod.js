const net = require('net')
const cp = require('child_process')

const execPromise = (command) => new Promise((resolve, reject) => cp.exec(command, (err, stdout) => {
    if (err) {
        reject(err);
    } else {
        resolve(stdout)
    }
}))

class CommandExecutor {

    commands = []

    addCommand(command) {
        this.commands.push(command)
    }

    async executeCommands() {
        for (let i = 0; i < this.commands.length; i++) {
            try {
                const data = await execPromise(this.commands[i])
                console.log("EXECUTION_DATA", data)
            } catch(err) {
                console.log("EXECUTION_ERROR", err);
            }
        }
    }
}

class Pod {

    started = false 
    server 
    runningProcess = false 
    client 

    constructor(portNumber, cb) {
        this.cb = cb
        this.portNumber = portNumber 
        this.commandExecutor = new CommandExecutor()
    }
    start() {
        return new Promise((resolve, reject) => {
            if (!this.started) {
                console.log("starting server")
                this.server = net.createServer((socket) => {
                    this.cb(socket)
                    socket.on('data', async (data) => {
                        const podData = JSON.parse(data.toString())
                        const {image, port} = podData 
                        this.commandExecutor.addCommand(`docker pull ${image}`)
                        this.commandExecutor.addCommand(`docker run -d ${image} -p ${port}:${port}`)
                        await this.commandExecutor.executeCommands()
                        console.log(`started running ${image} on ${port}`)
                        this.runningProcess = true 
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