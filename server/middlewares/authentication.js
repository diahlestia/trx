const { Admin } = require("../models");
const jwt = require('jsonwebtoken')

function Authentication(req, res, next) {
  try {
    let decoded = jwt.verify(req.headers.access_token, process.env.SECRET_KEY)
    Admin.findOne({where:{email:decoded.email}})
    .then(result => {
      if (result) {
        let currentUser = {
          id: result.id,
          email: result.email,
          role: result.role
        }
        req.currentUser = currentUser
        next()
      } else {
        next({
          name: 'EmailNotFound',
          msg: {"Authentication": "Email not Found"}
        })
      }
    })
    .catch(err => {
      next({
        name: 'AuthenticationError',
        msg: {message: err.message}
      })
    })
  } catch (error) {
    next({
      name: 'JwtNotProvided',
      msg: {message: error.message}
    })
  }
}

module.exports = Authentication;