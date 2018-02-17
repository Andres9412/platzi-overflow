import Debug from 'debug'
import jwt from 'jsonwebtoken'
import { secret } from '../config'

const debug = new Debug('platzi-overflow:auth-middleware')

export const users = [{
  firstName: 'albin',
  lastName: 'yakitori',
  email: 'albin@dominio.com',
  password: '123456'
}]
export const findUserByEmail = e => users.find(({ email }) => email === e)
export const comparePasswords = (providedPassword, userPassword) => providedPassword === userPassword


export const required = (req, res, next) => {
  jwt.verify(req.query.token, secret, (err, token) => {
    if(err){
      debug( `JWTF was not enctrypted with our secret`)
      return res.status(401).json({
        message: 'Unauthorized',
        error: err
      })
    }
    debug(`Token verified ${token}`)
    req.user = token.user
    next()
  })


}
