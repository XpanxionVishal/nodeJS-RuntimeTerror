const express = require('express');
const { getCities, getAreas, getPropertyTypes, saveCity, deleteCity, updateCity } = require('../controllers/master');
const router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

router.get('/master/getCities', getCities);
router.get('/master/getAreas/:_cityId', getAreas);
router.get('/master/getPropertyTypes', getPropertyTypes);
router.post('/master/saveCity', jsonParser, saveCity);
router.delete('/master/deleteCity/:_cityId', deleteCity);
router.put('/master/updateCity/:_cityId', jsonParser, updateCity);

module.exports = router;
