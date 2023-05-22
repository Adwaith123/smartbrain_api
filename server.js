const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');      
// const signin = require('./controllers/signin');

const db = knex({
    client: 'pg',
    connection: {
    host : process.env.DATABASE_URL,
    ssl:true,
  }
});

const app  = express();

app.use(bodyParser.json());
app.use(cors())

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)})
app.put('/image',(req,res) => {image.handleImage(req,res,db)})
app.post('/imageurl',(req,res) => {image.handleApiCall(req,res)})

// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3001, ()=> {
	console.log('app is running on port 3001');
})

/*
 End points to be expected from the Front-End
 -------------------------------------------------
/ --> response with this is working
/ signin --> POST = success or fail
/ register ---> POST = retrun new user
/profile/:userid ---> GET = user
image --> PUT udate on the user profile & it returns user count

*/
