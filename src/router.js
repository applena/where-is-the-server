'use strict';

const express = require('express');
const router = express.Router();
const auth = require('./auth/auth-middleware');
const getOne = require('./modules/getOne');
const runFunction = require('./modules/runFunction');

const handleCreateFunction = require('./modules/handleCreateFunction');
const handleGetUserFunctions = require('./modules/handleGetUserFunctions');

require('mongoose');

router.get('/getOne', auth('r'), getOne);
router.get('/functions/:username/', handleGetUserFunctions);
router.get('/:username/:functionName', runFunction);

router.post('/:username/:functionName', runFunction);

router.post('/createFunction', auth('c'), handleCreateFunction);

module.exports = router;
