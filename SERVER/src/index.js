const exp = require('express');
const app = exp();
const db=require('./db')
const path=require('path')
// Middleware to parse the body of the request
app.use(exp.json());

// connect to angular

app.use(exp.static(path.join(__dirname,'../../frontend/dist/frontend/browser')))


const userApp=require('./routes/userRoutes')
app.use('/api/v1.0/moviebooking',userApp);

const adminApp=require('./routes/adminRotes')
app.use('/api/v1.0/moviebooking',adminApp);

const movieApp=require('./routes/movieRoutes')
app.use('/api/v1.0/moviebooking',movieApp)

const ticketApp=require('./routes/ticketRoutes')
app.use('/api/v1.0/moviebooking',ticketApp)

app.use((req,res)=>{
  res.sendFile(path.join(__dirname,'../../frontend/dist/frontend/browser/index.html'))

})

function errorHandler(err,req,res,next){
  res.send({message:"error",payload:err})
}
app.use(errorHandler)


const PORT = process.env.PORT || 3000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});