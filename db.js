const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/inotebook"
// const mongoURI="mongodb+srv://admin-rajesh:123@inotebook.iibifpt.mongodb.net/?retryWrites=true&w=majority/inotebook"

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to Mongo successfully");
    })
}
module.exports=connectToMongo;