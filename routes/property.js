const express = require('express');
const { getProperties } = require('../controllers/property');
const router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

router.get('/property/getProperties/:_areaId/:_propertyTypeId', getProperties);

module.exports = router;
