const mongoose=require('mongoose')
require('dotenv').config()
let DB_URL='mongodb://127.0.0.1:27017/Project'
let ATLAS_URL="mongodb+srv://abimannan:database@cluster0.hyert.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(ATLAS_URL)
.then(()=>console.log('DB connection Success'))
.catch(err=>('Error  DB in conncection',err))