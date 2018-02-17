import express from 'express'
import { question, auth } from './routes'
import bodyParser from 'body-parser'
import formidable from 'express-formidable'
import path from 'path'


const app = express()
 // no me funciona con body parse

//de esta manera podemos leer todo lo que vienen con fomarmato json del cliente
app.use(bodyParser.json())
//para entender las rutas que vienen con utf-8
app.use(bodyParser.urlencoded({ extended: true }))


//-----------formidable
// app.use(formidable({ encoding: 'utf-8', keepExtensions: true}))



if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
      next()
    })
}

/*
  aca defininomos las rutas o los mildware
    cuando app obtenga un get es decir que algiuen en el neveg... ingrese en la direccion ('/')
    ejecute la funcion
    app.get('/', (req,res)=> res.send('hola desde express'))
*/
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(process.cwd(), 'dist')))
}


//El modulo de questions es el que se encargara de la respuesta
// usamos USE en ves de get xq en los modulos que importaremos vendran las pesticones GET,POST
app.use('/api/questions', question)
app.use('/api/auth', auth)

export default app
