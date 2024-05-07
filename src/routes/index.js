const express = require('express');
const userRouter = require('./userRoute');
const router = express.Router();

// colocar las rutas aquí
router.use(userRouter);


module.exports = router;