const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//mongodb url
let mongoDatabase = "mongodb://0.0.0.0:27017/blogapp";
//created express server
const app = express();
mongoose.Promise = global.Promise;

//connect mongodb database
mongoose.connect(mongoDatabase,{useNewUrlParser:true})
.then(()=>{console.log('database connected')},err=>{console.log('There is a problem while connecting to database')})


//all the express routes
const postRoutes = require('./routes/post.route');
let upload = require('./uploaad/upload');


//conver incoming data to json format
app.use(express.json())
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'));

//enable cors 
app.use(cors({origin:'http://localhost:4200'}));

const port = 4009;
//route configuration

app.use('/posts',postRoutes);

const server = app.listen(port,function()
{
    console.log("Server is listening on port:" + port);
});


