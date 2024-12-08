const express = require('express')
const app = express()
require('dotenv').config();

const db = require('./dal/db')
db.connect()

app.use(express.json())
const cors = require('cors')
app.use(cors())


const userRouter = require('./router/user.router')
app.use('/', userRouter)

const massageRouter = require('./router/massage.router');
app.use('/massages', massageRouter)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('*** server is UP ***\nPort: 3000');
})