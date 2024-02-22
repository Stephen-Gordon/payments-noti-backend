const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");
const socketIO = require("socket.io");
const fetch = require("node-fetch");
const port = process.env.PORT || 3002;

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());

// Routes
app.post("/alchemyhook", (req, res) => {
	notificationReceived(req);
	res.status(200).end();
});

app.get("/*", (req, res) => res.sendFile(path.join(__dirname, "/index.html")));

// WebSocket server
const server = app.listen(port, () => {
	console.log(`Listening on ${port}`);
});

const io = socketIO(server);

io.on("connection", (socket) => {
	console.log("Client connected");
	socket.on("disconnect", () => console.log("Client disconnected"));
	socket.on("register address", (msg) => {
		addAddress(msg);
	});
});

// Notification received from Alchemy from the webhook. Let the clients know.
const notificationReceived = async (req, res) => {
	console.log("Notification received!");
	console.log("Event:", req?.body?.event?.activity[0]?.toAddress);
    const response = await fetch(
			`https://payments-backend-01-0651b5f97107.herokuapp.com/api/users/${req?.body?.event?.activity[0]?.fromAddress}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
        
    if (response) {
			console.log("response sub:", response.subscription);
			try {
				await fetch("https://payments-lyart.vercel.app/notification", {
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						subscription: response.subscription,
						message: `Hello from server, ${req?.body?.event?.activity[0]?.fromAddress}!`,
					}),
				});
				console.log("Notification sent!");
			} catch (error) {
				console.log(error);
			}
		}



	io.emit("notification", JSON.stringify(req.body));
};

// Add an address to a notification in Alchemy
async function addAddress(new_address) {
	console.log("Adding address:", new_address);
	const body = {
		webhook_id: "wh_dnf6zvqpsvkd2p7t",
		addresses_to_add: [new_address],
		addresses_to_remove: [],
	};
	try {
		const response = await fetch(
			"https://dashboard.alchemyapi.io/api/update-webhook-addresses",
			{
				method: "PATCH",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
					"X-Alchemy-Token": "2CxWNMpNMB3IeHKVJBROFv-19LQ3LKKQ",
				},
			}
		);
		const json = await response.json();
		console.log("Successfully added address:", json);
	} catch (err) {
		console.error("Error! Unable to add address:", err);
	}
}

require("dotenv").config();
require("./configs/db.js")();

// Additional configurations
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "views")));

app.use((req, res, next) => {
	console.log(req.user);
	return next();
});

app.use("/api/users", require("./routes/users.js"));

console.log(`Example app listening at http://localhost:${port}`);
