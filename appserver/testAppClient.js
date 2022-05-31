const appClient = require('./appClient')

require('dotenv').config()

const {APP_SERVER_URL} = process.env

appClient(APP_SERVER_URL).poll()