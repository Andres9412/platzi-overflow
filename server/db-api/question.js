import Debug from 'debug'
import { Question, Answer } from '../models'

const debug = new Debug('platzi-overflow:deb-api:question')

export default {
  findAll:  (sort = '-createdAt') => {
    debug('finding all question')
    //find sin parametros devuelve todo
    return  Question.find().populate('answers').sort(sort)
  },
  findById: (_id) => {
    debug(`Find question with id ${_id}`)
    return Question
      .findOne({ _id })
      .populate('user')
      .populate({
        path: 'answers',
        options: { sort: '-createdAt' },
        populate: {
          path: 'user',
          model: 'User'
        }
      })
  },
  create: (q) => {
    debug(`Creating new question with ${q}`)
    const question = new Question(q)
    return question.save()
  },
  createAnswer: async (q, a) => {
    const answer = new Answer(a)
    const savedAnswer = await answer.save()
    q.answers.unshift(savedAnswer)
    await q.save()
    return savedAnswer
  }
}
