const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
	console.log("Registering user");
	console.log(req.body);

	try {
		// Check if a user with the same address already exists
		const existingUser = await User.findOne({ address: req.body.address });

		if (existingUser) {
			// If user with the same address already exists, return a response indicating that
			return res
				.status(400)
				.json({ error: "User with this address already exists" });
		}

		// If user with the address doesn't exist, proceed with registering the new user
		const newUser = new User(req.body);
		await newUser.save();
		return res.status(201).json(newUser); // Return the newly registered user
	} catch (error) {
		console.error("Error registering user:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

const profile = (req, res) => {
	let address = req.params.id; // Assuming the address is passed in as a parameter
	console.log("Hello from user route");
	User.findOne({ address: address }) // Searching for a user with the specified address
		.then((data) => {
			if (!data) {
				res.status(404).json({ msg: `User with address ${address} not found` });
			} else {
				console.log("found user ", data)
				res.status(200).json(data);
			}
		})
		.catch((err) => {
			// Handle errors
			res.status(500).json({ msg: `Internal server error: ${err.message}` });
			console.error(`Error: ${err.message}`);
		});
};

const readOne = async (req, res) => {
	console.log("Reading user by address");
	console.log(req.params); // Assuming address is passed as a route parameter

	try {
		// Find the user with the provided address
		const user = await User.findOne({ address: req.params.id });

		if (!user) {
			// If no user with the provided address is found, return a response indicating that
			return res.status(404).json({ error: "User not found" });
		}

		// If user is found, return it in the response
		return res.status(200).json(user);
	} catch (error) {
		console.error("Error reading user:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};


module.exports ={
    register,
    profile,
    readOne

};