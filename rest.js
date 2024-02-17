const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const signupModel = require('./model');
const route = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
mongoose.connect('mongodb://localhost:27017/gedb').then(()=>{console.log('Connected to DB')}).catch(()=>{console.log('Error connecting to DB')})

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})
app.get('/all',async(req,res)=>{
    const alluser = await signupModel.find();
    console.log(alluser);
    res.send(alluser);
})

app.post('/sign-up', (req,res)=>{
    bcrypt.hash(req.body.password, 10).then(hash=>
    {
        const signup = new signupModel(
            {
                name: req.body.name,
                password: hash
            })
  
    
    signup.save().then(result=>{
        res.status(201).json({
            message:'User Created',
            result: result
        })
    }).catch(err=>{
        res.status(500).json({
            error:err

        })  
      })
    })
})


// app.post('/sign-up', (req,res) => {
//     bcrypt.hash(req.body.password, 10)
//     .then(hash => {
//             const signup = new signupModel({
//                 name: req.body.name,
//                 password: req.body.password
//             })

//             signup.save()
//             .then(result => {
//                 res.status(201).json({
//                     message: 'User created',
//                     result: result
//                 })
//             })
//             .catch(err => {
//                 res.status(500).json({
//                     error: err
//                 })
//             })
//         })
// })


app.post('/login',(req,res)=>{
    let userFound;

    signupModel.findOne({name:req.body.name})
    .then(user=>{
        if(!user)
            {
                return res.status(401).json({
                    'message':'User not found'
                })
            }
            userFound = user;
            return bcrypt.compare(req.body.password, user.password)
    }).then(result=>{
        if(!result)
        {
            return res.status(401).json({
                message:'Password is incorrect'
            })
        }

        const token = jwt.sign({name:userFound.name, userId:userFound._id},"secret_string",{expiresIn:"1h"})
        return res.status(200).json({
            token:token,
            expiresIn: 3600
        })
    })
    .catch(err=>{
        return res.status(401).json({
            message:'Error with authentification'
        })
    })
})
        module.exports = app;



















































// route.get('/',async(req,res)=>{
//     const alluser = await signupModel.find();
//     console.log(alluser);
//     res.send(alluser);
// })

// route.post('/signup',function(req,res){
//     let signup = new signupModel(
//         {
//             name:req.body.name,
//             password: req.body.password
//         })
//     signup.save().then(()=>
//     {
//         res.status(200).json({'message':'User added'});
//     }).catch(()=>
//     {
//         res.status(400).send({'message':'something went wrong'})
//     });
// });

// route.delete('/del/:id',async(req,res)=>{
//     try
//     {
//         let id = req.params.id;
//         const dele = await signupModel.findByIdAndDelete(id,req.body);
//         if(!dele)
//         {
//             return next(new Error('Unable to find user with given id'))
//         }
//         else
//         res.send("Deletion success");


//     }
//     catch(err)
//     {
//         res.status(400).send("Deletion failed")
//     }
// })
// module.exports = route;
