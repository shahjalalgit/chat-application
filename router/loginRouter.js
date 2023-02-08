//external imports
const express = require('express');
const router = express.Router();

// internal import
const {getLogin} = require('../controller/loginController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
//get login page
router.get('/', decorateHtmlResponse("Login"), getLogin); // decorateHtmlResponse is generate page title for every route

module.exports = router;