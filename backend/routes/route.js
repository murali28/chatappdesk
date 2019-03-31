const ctrUser = require('../controllers/controller')
const express = require('express');
const rauth = require('./authorization');
const router = express.Router();

router.use('/auth',rauth);
router.post('/login',ctrUser.login);
router.post('/register', ctrUser.register);
router.post('/forgotPassword',ctrUser.forgotPassword);
router.post('/resetPassword',ctrUser.resetPassword);
router.get('/getAllUser',ctrUser.getAllUser);
module.exports = router;