const express = require('express');
// const mysql = require('mysql');
const mongoose = require('mongoose');
const startups = require('./db.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const pool = mysql.createPool({
//           connectionLimit: 10,
//           host: 'localhost',
//           user: 'root',
//           password: 'password',
//           database: 'users',
//           socketPath: '/var/run/mysqld/mysqld.sock'
// });

// app.get('/test-connection', (req, res) => {
//           pool.getConnection((err, connection) => {
//                       if (err) {
//                                     console.error('Error connecting to MySQL: ' + err.stack);
//                                     return res.status(500).send('Error connecting to MySQL');
//                                   }

//                       console.log('Connected to MySQL as ID ' + connection.threadId);
//                       connection.release();
//                       return res.send('Connected to MySQL!');
//                     });
// });

const mongoUrl = 'mongodb://mongouser:password@172.104.174.187:27017/local';

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));
db.once('open', () => console.log('Connected to MongoDB'));

app.post('/api/get-data', async (req, res) => {
        const { ipAdd, portNum, dbName } = req.body;
        const currentTime = moment().format('MMMM Do YYYY hh:mm:ss a');          
        axios.post("http://172.104.174.187:4000/api/add-history", 
        {
                id: ipAdd, 
                con_type: "mongodb", 
                timestamp: currentTime
        });
        try {

                const fetched = await startups.find({}).select('startTimeLocal hostname -_id');
                const strResult = JSON.stringify(fetched);  
                axios.post("http://172.104.174.187:4000/api/set/arch-logs", 
                { 
                  user_id: ipAdd,
                  data_src: "mongodb",
                  log_data: strResult
                });
                console.log("MongodB Data Archived!")

                return res.status(200).json(fetched);
        } catch (err) {
                console.error(err);
                return res.status(500).json({message: 'Server error'});
        }
});


const PORT = process.env.PORT || 4128;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
