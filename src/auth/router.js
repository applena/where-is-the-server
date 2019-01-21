'use strict';

const express = require('express');
const authRouter = express.Router();
const auth = require('./auth-middleware');
const handleSignup = require('./modules/handleSignup');
const handleSignin = require('./modules/handleSignin');


authRouter.post('/signup', handleSignup);
authRouter.post('/signin', auth(), handleSignin);

module.exports = authRouter;