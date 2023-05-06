const express = require('express');
const app = express();
// const http = require("http");
// const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
// const tm = require( 'text-miner');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const { connect } = require('http2');

const port = process.env.PORT || 4128;

// const server = http.createServer(app);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// mongoose.set('strictQuery', true);
// mongoose.set('strictQuery', true);
// ip: localhost | 172.104.174.187
// port: 27017
// database: FirstDemo
// mongoose.connect(`mongodb://localhost:27017/FirstDemo`);
//Mongologs

// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log('MongoDB database connection established successfully');
//   isConnected = true;
// });
// const Schema = mongoose.Schema;

// const studentSchema = new Schema({
//   name: { type: String },
//   age: { type: Number }
// });
// const Student = mongoose.model('students', studentSchema);

app.post('/api/signups', async function (req, res) {
  const { ipAdd, portNum, dbName } = req.body;
  const uri = `mongodb://${ipAdd}:${portNum}/${dbName}`;

  MongoClient.connect(uri, {useNewUrlParser: true}, function(err, client) {
    if (err) {
      return console.error(err);
    }
    const db = client.db(`${dbName}`);
    const logs = db.collection('startup_log');
    
    logs.find().toArray(function(err, result) {
      if (err) {
        return console.error(err);
      }
      console.log(result);
      // console.log("result");
      client.close();
      return res.send(result);
    })
  })
  
const mongoUrl = 'mongodb://172.104.174.187:27017/local';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));
db.once('open', () => console.log('Connected to MongoDB'));

app.get('/api/get-data', async (req, res) => {

try {

        const fetched = await startups.find({}).select('startTimeLocal hostname -_id');
        return res.status(200).json(fetched);
} catch (err) {
        console.error(err);
        return res.status(500).json({message: 'Server error'});
}
});
  // mongoose.connect(`mongodb://${ipAdd}:${portNum}/${dbName}`);
  // let isConnected = false;
  // const fluffy = new Student({ name: 'sameer' });
  // await fluffy.save();
  
  // const result
  // mongoose.connect(`mongodb://localhost:27017/FirstDemo`);
  // const result = await Student.find()
  // res.send(result);
});

// app.get('/api/students', async function (req,res) {
//   mongoose.connect(`mongodb://localhost:27017/FirstDemo`);
//   const result = await Student.find({name:'Zain Raza'})
//   res.send(result);
// })

app.listen(port, () => {
  console.log(`App started on port: ${port}`);
  // MongoClient.connect((`mongodb://localhost:27017`,
  // {useNewUrlParser:true , useUnifiedTopology:true}))
})


// server.listen(3054, () => {
//   console.log(`Socket port: ${3054}`)
// })

