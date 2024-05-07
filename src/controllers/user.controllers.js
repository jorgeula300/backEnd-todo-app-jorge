const catchError = require('../utils/catchError');
const User = require('../models/User.models');

const getAll = catchError(async(req, res) => {
    // Operaciones...
    const users = await User.findAll();
    return res.json(users)
});

const create = catchError(async(req, res) => {
    const { first_name, last_name, email, password, birthday } = req.body;
    const validateEmail = await User.findOne({ where: {email} });
    if(validateEmail) return res.status(400).json({ message: "Email already exists" });
    const user = await User.create({ first_name, last_name, email, password, birthday });
    return res.status(201).json(user);
});

const deleteOne = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({ where: {id} });
    return res.sendStatus(204);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if(!user) return res.sendStatus(404);
    return res.json(user);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    deleteOne,
    getOne,
    update
}