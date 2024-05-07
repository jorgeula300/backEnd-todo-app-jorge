const { getAll,create,deleteOne,getOne, update} = require('../controllers/user.controllers');
const express = require('express');

const userRoute = express.Router();

userRoute.route("/users")
		.get(getAll)
		.post(create);
userRoute.route("/users/:id")
		.get(getOne)
		.put(update)
		.delete(deleteOne);

module.exports = userRoute;