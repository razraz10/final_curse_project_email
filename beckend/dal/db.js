const mongoose = require('mongoose')

const MONGO_URL = process.env.URL_MONGO


const connect = () => {
    mongoose.connect(MONGO_URL)
        .then(_ => console.log("connection to DB - success"))
        .catch(err => {
            console.error("DB connect error: ", err);
            throw err
        })
}

module.exports = { connect }