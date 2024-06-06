const express = require('express');
const cors = require('cors');
const mongoose=require('mongoose');

require('dotenv').config();

const app = express();
//const port = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;

mongoose.set('strictQuery', true);
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
console.log("MongoDB database connection established successfully");
})
const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection=new mongoose.model('LogInCollection',logInSchema)

module.exports=LogInCollection
// app.listen(port, () => {
// console.log(`Server is running on port: ${port}`);
// });