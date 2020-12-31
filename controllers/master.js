const masterService = require('../services/master');

const getCities = (req, res) => {
    masterService.getCities((cities) => {
        if (cities) {
            res.status(200).send(cities);
        } else {
            res.status(500).send('Error while fetching cities!');
        }
    });
}

// Get Areas on the basis of City Id
const getAreas = (req, res) => {
    masterService.getAreas(req.params._cityId, (areas) => {
        if (areas) {
            res.status(200).send(areas);
        } else {
            res.status(500).send('No areas present for the selected city!');
        }
    });
}

// Get the list of Property Types
const getPropertyTypes = (req, res) => {
    masterService.getPropertyTypes((propertyTypes) => {
        if (propertyTypes) {
            res.status(200).send(propertyTypes);
        } else {
            res.status(500).send('Error while fetching property types!');
        }
    });
}

// Insert a new City
const saveCity = (req, res) => {
    masterService.saveCity(req.body.cityName, (result) => {
        if (result) {
            res.status(200).send('City Inserted Successfully!');
        } else {
            res.status(500).send('Error while inserting City!');
        }
    });
}

// Delete a City
const deleteCity = (req, res) => {
    masterService.deleteCity(req.params._cityId, (result) => {
        if (result) {
            res.status(200).send('City Deleted Successfully!');
        } else {
            res.status(500).send('Error while deleting City!');
        }
    });
}

// Update a City
const updateCity = (req, res) => {
    masterService.updateCity(req.params._cityId, req.body.cityName, (result) => {
        if (result) {
            res.status(200).send('City Updated Successfully!');
        } else {
            res.status(500).send('Error while Updating City!');
        }
    });
}

module.exports = { getCities, getAreas, getPropertyTypes, saveCity, deleteCity, updateCity };