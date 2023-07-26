const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const app = express()
const middleware = require('body-parser')
const routelog = require('./Routers/Routerforlogs')
const routepost = require('./Routers/Routerforpost')
const routecomment = require('./Routers/Routerforcomment')
const routeevent = require('./Routers/Routerforevent') 
const port = process.env.PORT || 7000
const path = require('path')

// middlewares
app.use(middleware.urlencoded({ extended: false }));
app.use(middleware.json());
app.use('/users',routelog)
app.use('/post',routepost)
app.use('/comment',routecomment)
app.use('/events',routeevent)



app.use(express.static(path.join(__dirname, './client/build')))

app.use('*',(req,res)=>{
          res.sendFile(path.join(__dirname, './client/build/index.html'))
})
// dbconnection
mongoose.connect(process.env.DB).then((e)=>{
          console.log("connected to database")
}).catch((e)=>{
          console.log("nt")
})



// port setting
app.listen(port,()=>{
          console.log(`App running on ${process.env.PORT}`)
}) 

