const express = require('express');
const mysql = require('mysql');
const mongoose = require('mongoose');
const startups = require('./db.js');

const app = express();

const pool = mysql.createPool({
          connectionLimit: 10,
          host: 'localhost',
          user: 'root',
          password: 'password',
          database: 'users',
          socketPath: '/var/run/mysqld/mysqld.sock'
});

app.get('/test-connection', (req, res) => {
          pool.getConnection((err, connection) => {
                      if (err) {
                                    console.error('Error connecting to MySQL: ' + err.stack);
                                    return res.status(500).send('Error connecting to MySQL');
                                  }

                      console.log('Connected to MySQL as ID ' + connection.threadId);
                      connection.release();
                      return res.send('Connected to MySQL!');
                    });
});

const mongoUrl = 'mongodb://172.104.174.187:27017/local';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));
db.once('open', () => console.log('Connected to MongoDB'));

app.post('/api/get-data', async (req, res) => {
const { ipAdd, portNum, dbName } = req.body;
try {

        const fetched = await startups.find({}).select('startTimeLocal hostname -_id');
        return res.status(200).json(fetched);
} catch (err) {
        console.error(err);
        return res.status(500).json({message: 'Server error'});
}
});


const PORT = process.env.PORT || 4128;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
