const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require("cors");
const host = "0.0.0.0";
const path = require("path");
const socketIO = require("socket.io");
const fetch = require("node-fetch");
const port = process.env.PORT || 3002;


const app = express()
    app.use(express.static(path.join(__dirname, "public")))
	app.use(express.json())
	.post("/alchemyhook", (req, res) => {
		notificationReceived(req);
		res.status(200).end();
	})
	.get("/*", (req, res) => res.sendFile(path.join(__dirname + "/index.html")))
	.listen(port, () => console.log(`Listening on ${port}`));

// start the websocket server
const io = socketIO(app);

// listen for client connections/calls on the WebSocket server
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
  socket.on('register address', (msg) => {
    //send address to Alchemy to add to notification
    addAddress(msg);
  });
});


// notification received from Alchemy from the webhook. Let the clients know.
const notificationReceived = async (req, res) => {
  console.log("notification received!");
  console.log("event hereeeeeeeeee", req?.body?.event?.activity[0]?.toAddress);


  io.emit('notification', JSON.stringify(req.body));

}

// add an address to a notification in Alchemy
async function addAddress(new_address) {
  console.log("adding address " + new_address);
  const body = { webhook_id: 'wh_eddaxijt09kqs3zh', addresses_to_add: [new_address], addresses_to_remove: [] };
  try {
    fetch("https://dashboard.alchemyapi.io/api/update-webhook-addresses", {
			method: "PATCH",
			body: JSON.stringify(body),
			headers: { "Content-Type": "application/json" },
			headers: { "X-Alchemy-Token": "2CxWNMpNMB3IeHKVJBROFv-19LQ3LKKQ" },
		})
			.then((res) => res.json())
			.then((json) => console.log("Successfully added address:", json))
			.catch((err) => console.log("Error! Unable to add address:", err));
  }
  catch (err) {
    console.error(err);
  }
}


require('dotenv').config();
require('./configs/db.js')()
app.use(cors());
app.use(express.json())

app.set('view engine', 'html')
// serve the views 
app.use(express.static(__dirname + '/views'))


app.use((req, res, next) => {
    console.log(req.user)
    return next()
})
/* Requests */


app.use('/api/users', require('./routes/users.js'))

app.listen(port, host, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
