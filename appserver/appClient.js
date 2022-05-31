const axios = require('axios')

const appClient = (baseUrl) => {
    return {
        async poll() {
            const {data} = await axios.get(`${baseUrl}/poll`)
            console.log('DATA', data)
            return data 
        }
    }
}

module.exports = appClient 