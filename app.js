const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const fileUpload = require('express-fileupload');

const app = express()
// require('./db')
const cervezas = require('./routes/cervezas')
const users = require('./routes/users')
const auth = require('./routes/auth')
const uploads = require('./routes/uploads')
// DATABASE CONNECTION
async function connectAtlas(){
    await dbConnection()
}
connectAtlas()
//MIDDLEWARE
app.use(express.json())
app.use( fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath: true
}));
//ROUTES
app.use('/cervezas', cervezas)
app.use('/users', users)
app.use('/auth', auth)
app.use('/uploads', uploads)

app.listen(process.env.PORT)

module.exports = app;