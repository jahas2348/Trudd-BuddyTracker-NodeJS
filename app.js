const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = require('./routers/leaderRouter');
const userRouter = require('./routers/userRouter');
const dotenv = require('dotenv');
const http = require('http');
const app = express();
const server = http.createServer(app);
const path = require('path');
const SpotModel = require('./models/spotModel');
const SpotUserModel = require('./models/spotUserModel');

//For Websocket
const mongoose = require('mongoose');
const WebSocket = require('ws');
const cors = require('cors');


//For Websocket
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/',leaderRouter);
app.use('/',userRouter);

app.get('/',(req,res)=>{
  res.send('Welcome to Trudd');
});


//For Websocket
const DataSchema = new mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  userId : String,
});
const DataModel = mongoose.model('Data', DataSchema);
app.post('/add', async (req, res) => {
  try {
    const { name, latitude, longitude, userId } = req.body;
    const newData = new DataModel({ name, latitude, longitude, userId });
    await newData.save();
    res.status(200).send(newData);
    broadcast(newData.toObject());
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/data/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await DataModel.find({ _id: userId });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { latitude, longitude } = req.body;

    const updatedData = await DataModel.findByIdAndUpdate(
      id,
      { $set: { latitude, longitude } },
      { new: true }
    );

    if (!updatedData) {
      console.log('Data not found for update');
      return res.status(404).send({ error: 'Data not found' });
    }

    console.log('Data updated successfully:', updatedData);
    res.status(200).send(updatedData.toObject());
    broadcast(updatedData.toObject());
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).send(error);
  }
});

const wss = new WebSocket.Server({ noServer: true });

function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});


module.exports = server;