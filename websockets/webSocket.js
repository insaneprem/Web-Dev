const WebSocket = require('ws')
const http = require('http')
const httpserver = http.createServer((req,res)=>{
    if(req.url === ''){

    }
})

const server = new WebSocket.Server({port : 3000})

server.on('prem',(socket)=>{
    console.log('client connected')

    socket.send('Hello From Server')


    socket.on('message', (message)=>{
        console.log(message)

        socket.send('Hello from socket')
    })
})