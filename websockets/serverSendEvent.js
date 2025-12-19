import {createServer} from 'http'

const server = createServer((req,res)=>{
    if(req.url === '/event'){
        res.writeHead(200 , {
            'content-type' : 'text/event-stream',
            'cache-control' : 'no-cache',
            'connection' : 'keep-alive'
        })

        const interval = setInterval(()=>{
            res.write(`date : ${new Date().now}\n\n`)
        },200)

        req.on('close',()=>{
            clearInterval(interval)
            res.end()
        })
    }
    else{
        res.writeHead(200)
        res.end('server is up')
    }
})

server.listen(3000)