import { WebSocket, WebSocketServer } from "ws";
import http from 'http'

const server = http.createServer((req: any, res: any) => {
    console.log((new Date()) + 'Recive request for ' + req.url)
    res.end('hi there')
})


const wss = new WebSocketServer({ server })

wss.on('connection', (socket) => {
    socket.on('error', console.error)

    socket.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary })
            }
        })
    })

    socket.send('Hello ! Message from Server')
})

server.listen(8080, () => {
    console.log('server is listening on port 8080')
})