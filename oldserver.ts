/*const EventEmitter = require('events')

const myEmitter = new EventEmitter()

myEmitter.once('saute', function(a,b){
    console.log(`J'ai sauté ${a} ${b}`)
})

myEmitter.emit('saute',10,20)
myEmitter.emit('saute')
*/

let http = require('http')
let fs = require('fs')
let url = require('url')
const EventEmitter = require('events');

let App ={
    start : function(port){
        let emitter = new EventEmitter()
        let server = http.createServer((request, response)=> {
            response.writeHead(200, {
                'Content-type' : `text/html; charset=utf-8`
            })
            if(request.url==`/`){
                emitter.emit('root', response)
            }
            if(request.url.startsWith(`/?name`)) {
                emitter.emit('name', request, response)
            }
            console.log('avant')
            response.end()
            console.log('apreès')

        }).listen(port)
        return emitter
    }
}

let app = App.start(80)
app.on('root', function(response) {

    response.write(`Je suis à la racine`)
})
app.on('name',function(request,response) {
    let query =url.parse(request.url,true).query
    let name = query.name
    fs.readFile('index.html', 'utf8' ,(err,data) => {
        if(err) {
            response.writeHead(404)
            response.end(`Ce fichier n'existe pas`)
        } else{

            
            data = data.replace(`{{ name }}`, name)
            console.log('aat')
            // response.writeHead(200, {
            //     'Content-type' : `text/html; charset=utf-8`
            // })
            response.write(data)
            
        }
    })
    

})



/*

let server = http.createServer() 

server.on('request',  (request,response) => {
    response.writeHead(200)  
    let query = url.parse(request.url,true).query
    let name = query.name  === undefined ? `anonyme`: query.name
    fs.readFile('index.html', 'utf8' ,(err,data) => {
        if(err) {
            response.writeHead(404)
            response.end(`Ce fichier n'existe pas`)
        } else{

            response.writeHead(200, {
                'Content-type' : `text/html; charset=utf-8`
            })
            data = data.replace(`{{ name }}`, name)
            response.end(data)
        }
    })

})
server.listen(80)
*/