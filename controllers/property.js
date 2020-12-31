const propertyService = require('../services/property');

const getProperties = (req, res) => {
    propertyService.getProperties(req.params._areaId, req.params._propertyTypeId, (properties) => {
        if (properties) {
            res.status(200).send(properties);
        } else {
            res.status(500).send('Error while fetching cities!');
        }
    });
}

module.exports = { getProperties };