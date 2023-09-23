const express = require('express')
const router = express.Router()
const dotenv = require('dotenv').config()
const user = require('../Schema/User')
const hash = require('bcryptjs')
const otp = require('../Schema/Otp')
const cors = require('cors')
const cookie = require('cookie-parser')
const JWT = require('jsonwebtoken')
const { json } = require('body-parser')


router.use(cors({
          origin: ['http://localhost:3000','https://helpinghandofficial.netlify.app/'],
          methods: ['POST', 'PUT', 'GET','DELETE','OPTIONS', 'HEAD'],
          credentials: true
}))
router.use(cookie())

// ------------------------------------------nodemailer------------------------------------------------------//

const sendmail = (email, otp) => {
          const nodemailer = require("nodemailer");

          const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    auth: {
                              
                              user: process.env.EMAIL,
                              pass: process.env.PASSWORD
                    },
          });
          var mailoption = {
                    from : "ohumor2000@gmail.com",
                    to:email,
                    subject:"Veriication code",
                    text:`your one time password is ${otp}`
          }


          transporter.sendMail(mailoption,(error,info)=>{
                    if(error){
                              
                              return false
                    }
                    if(info){
                            
                              return true
                    }
          })

}
//-------------------------------------------verify otp------------------------------------------------------//
const changePassword= async(otpcode,newpassword)=>{
          const findCred = await otp.find({code:otpcode})
          if(findCred.length > 0){
                    
                    const mail = await findCred[0].email
                    
                    const userData = await user.findOne({email:mail})
                   
                    const salt = await hash.genSaltSync(10)
                    const hashed = await hash.hashSync(newpassword, salt)
                    
                    userData.password = hashed
                    userData.save().then((res)=>{
                              return 'Password changed successfull'

                    }).catch((e)=>{
                              return 'hoi ni'

                    })


          }
          else{
                    return  'invalid OTP!'

          }
          
         

}

// -----------------------------------------send verification mail-------------------------------------------//

router.post('/sendverificationmail', async (req, res) => {
          const { email } = req.body
          const data = await user.find({ email: email })
          if (data.length > 0) {
                    let otpcode = Math.floor((Math.random() * 10000) + 1);
                    let otpdata = new otp({
                              email: email,
                              code: otpcode,
                              expire: new Date().getTime() + 100 * 1000
                    })
                    otpdata.save()
                    sendmail(email,otpcode)
                    

                    return res.status(202).send(otpdata)
          }


          return res.status(404).send("does not exist")

})

// --------------------------------------------change password-----------------------------------------------//

router.patch('/changepassword', async(req, res) => {
          const {otp_code,password} = req.body
          var changePass = await changePassword(otp_code,password)


          return res.send(changePass)


})

module.exports = router
