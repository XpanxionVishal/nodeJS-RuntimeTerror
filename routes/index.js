const express = require('express');
const router = express.Router();
const master = require('./master');
const swagger = require('./swagger');
const property = require('./property');

router.use(master);
router.use(property);
router.use('/', swagger);


router.use((req, res, next) => {
  next('Route Not Found!');
});

module.exports = router;
