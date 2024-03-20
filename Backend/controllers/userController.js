const User = require('../modals/userModel')
const bcrypt = require('bcrypt');
var session = require('express-session')
const Mongostore =require("connect-mongo")
const signupUser = async (req, res) => {
    let { username,password } = req.body;

    try {
      const newUser = await User.create({
        username:req.body.username,
        password: bcrypt.hashSync(req.body.password,10)
      });
      res.status(200).json({"msg":"Success"});
    } catch (error) {
        console.error('Error signing up user:', error);
      res.status(400).json({ error: 'An error occurred while signing up user' });
    }
};


var app = express()
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.SECERT,
  resave: false,
  saveUninitialized: true,
  store:Mongostore.create({mongoUrl:process.env.MONGO_URI,collectionName:"sessions"}),
  cookie: { 
    maxAge: 1000*60*60*24
  }
}))


var app = express()
var sess = {
  secret: process.env.SECERT,
  cookie: {}
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))



module.exports={signupUser};