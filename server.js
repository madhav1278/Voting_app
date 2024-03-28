const express = require('express');
const app = express();
const db = require('./db');
// require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 8000;

app.get('/',function(req,res){
  res.send('welcome');
});

const userroutes = require('./routes/userroutes');
app.use('/user', userroutes);

app.listen(PORT, () => {
    console.log('listening on port 3000');
  })
  