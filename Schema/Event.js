const mongoose = require('mongoose')
const event = new mongoose.Schema({
          user:{
                    type:String,
                    required:true,
          },
          username:{
                    type:String,
                    required:true,
          },
          userimg:{
                    type:String,
                    

          },
          topic:{
                    type:String,
                    required:true,
          },
          image:{
                    type:String
          },
          Date:{
                    type:String,
                    required:true
          },
          description:{
                    type:String,
                    required:true,
          }
          
         
          ,area:{
                    type:String,
                    required:true
          },
          
          
})
const newevent = new mongoose.model('eventlist',event)
module.exports=newevent;