import http from 'http'
import Debug from 'debug'
import app from './app.js'
import mongoose from 'mongoose'
import { mongoUrl, port  } from './config'


const debug = new Debug('platzi-overflow:root')



// const app = http.createServer((req,res)=>{
//   //200-> todo ok
//   //para que el navegador sepa como mostrar la respuesta que se le va a dar
//   res.writeHead(200,{'content-type':'text/plain'})
//   res.write('Hola mundo desde platziOverflow')
//   //una vez ya terminado el proceso el serv muetra la respuesta
//   res.end()
// })

mongoose.Promise = global.Promise

async function start() {
  await mongoose.connect(mongoUrl)

  app.listen(port, () => {
    debug(`Server running at port ${port}`)
  })
}

start()
