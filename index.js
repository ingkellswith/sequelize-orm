import express from 'express';
import {asyncFunction, logFunction} from './database.js';

const app = express()
const port = 3000
app.get('/', function (req, res) { 
  res.send('Hello World!')
})
app.listen(port, function () {
  console.log(`application is listening on port ${port}...`)
})

asyncFunction();
logFunction();