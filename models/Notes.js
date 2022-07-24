const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
    user:{
       type:mongoose.Schema.Types.ObjectId,  // this is to tell that storing one schema int other to tell which notes belongs to which user 
       ref:'user'
    },
     title:{
        type:String,
        required:true
     },
     description:{
        type:String,
        required:true,
     },
     tag:{
        type:String,
        default:"General"
     },
     date:{
        type:Date,
        default:Date.now
     },
  });
  module.exports=mongoose.model('notes',NotesSchema);