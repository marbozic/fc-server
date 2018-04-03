'use strict';

const mongoose = require('mongoose');
const Promise = require('bluebird');
const geocoder = require('node-geocoder')('google', 'http');

const logger = require("../../../../core/logger");
const BaseDAO = require("../../../../core/base.dao");

const PropertyModel = require("../model/property.model");

class PropertyDAO extends BaseDAO {
    constructor() {
        super(PropertyModel);
    }

    all() {
        return PropertyModel.find({}).where('Status').gt(-1);
    }

    async prepareUpdateObject(dataObject) {
        const preparedDataObject = await super.prepareUpdateObject(dataObject);

        const coords = await geocode({
            address: property.Street + ', ' + property.City + ', ' + property.zipcode + ', ' + property.State,
            zipcode: property.ZipCode,
            city: property.City,
        });

        if (coords) {
            preparedDataObject.Latitude = coords.latitude;
            preparedDataObject.Longitude = coords.longitude;
        }

        return preparedDataObject;
    }
}

const geocode = (geoObject) => {
    return new Promise((resolve, reject) => {
        geocoder.geocode(geoObject, function (err, res) {
                if (!err) {
                    if (!err && res.length > 0) {
                        resolve({
                            latitude: res[0].latitude,
                            longitude: res[0].longitude
                        })
                    } else {
                        resolve();
                    }
                } else {
                    logger.error(`gecoder error ${err}, return undefined coordinates`);
                    // reject(err);
                    resolve();
                }
            }
        );
    })
};

module.exports = new PropertyDAO();
