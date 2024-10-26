const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.port || 3000
const router = require('./routes')
const cors = require('cors')

// app.get('/', (req, res) => {
//     res.json({
//         message: "Hello"
//     })
// })

  
// const ErrorHandler = require('./middlewares/errorHandler')
  
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)
// app.use(ErrorHandler)


app.listen(PORT, () => {
  console.log(`Server listen to http://localhost:${PORT}`)
})

