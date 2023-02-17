const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://saksham4801be21:54Z6B1uXtkvfKYhp@cluster0.m9erqgc.mongodb.net/mydb' , {useNewUrlParser: true, useUnifiedTopology: true });
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


const Device = require('./models/device'); 

const port = 5003;

app.get('/api/test', (req, res) => {
    res.send('The API is working!');
});


app.get('/api/devices', (req, res) => {
    Device.find({}, (err, devices) => {
        return err
        ? res.send(err)
        : res.send(devices);
    });
});

app.post('/api/devices', (req, res) => {
    const { name, user, sensorData } = req.body;
    const newDevice = new Device({
      name,
      user,
      sensorData
    });
    newDevice.save(err => {
      return err
        ? res.send(err)
        : res.send('successfully added device and data');
    });
  });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});