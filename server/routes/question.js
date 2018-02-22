import express from 'express'
import { required, questionMiddleware } from '../middleware'
import { question } from '../db-api'
import { handleError } from '../utils'
import { User } from '../models'

const app = express.Router()



/*
------ como se manejo antes el user
const currentUser = {
  firstName: 'albin',
  lastName: 'yakitori',
  email: 'albin@dominio.com',
  password: '123456'
}


function userMiddleware(req,res,next){
  req.user = currentUser
  next()
}
*/

// GET /api/questions
app.get('/', async (req, res) => {
  try {
    const { sort } = req.query
    const questions = await question.findAll(sort)
    res.status(200).json(questions)
  } catch (error) {
    handleError(error, res)
  }
})

// GET api/questions/:id
/*
  app.get('/:id', (req,res)=> res.status(200).json(question))
*/
app.get('/:id',questionMiddleware , async (req, res) => {
  try {
    res.status(200).json(req.question)
  } catch (error) {
    handleError(error, res)
  }
})

// POST /api/questions
// antes-- app.post('/',userMiddleware ,(req, res) => {
app.post('/',required, async (req, res) => {
  const {title, description, icon} = req.body
  const q = {
    title,
    description,
    icon,
    user: req.user._id
  }
  try {
    const questionSaved = await question.create(q)
    res.status(201).json(questionSaved)
  } catch (e) {
    handleError(e, res)
  }


})

// app.post('/:id/answers', userMiddleware , questionMiddleware, (req,res)=>{
app.post('/:id/answers', required, questionMiddleware, async (req, res) => {
  const a = req.body
  const q = req.question
  a.createdAt = new Date()
  a.user = new User(req.user)
  try {
    const savedAnswer = await question.createAnswer(q, a)
    res.status(201).json(savedAnswer)
  } catch (error) {
    handleError(error, res)
  }
})

//  --------------formidable
// app.post('/', (req, res) => {
//
//     const question = req.fields
//     question._id = +new Date()
//     question.user = {
//       firstName: 'albin',
//       lastName: 'yakitori',
//       email: 'albin@dominio.com',
//       password: '123456' }
//
//     question.createdAt = new Date()
//     question.answers = []
//     questions.push(question)
//     res.status(201).json(question)
// })


export default app
