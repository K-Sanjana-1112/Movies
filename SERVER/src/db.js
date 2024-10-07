const mongoose=require('mongoose')
let DB_URL='mongodb://127.0.0.1:27017/Project'

mongoose.connect(DB_URL)
.then(()=>console.log('DB connection Success'))
.catch(err=>('Error  DB in conncection',err))