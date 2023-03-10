'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OccupancyTypeSchema = new Schema({
    OccupancyTypeID: {type: Number},
    Title: {type: String, required: true}
});

const OccupancyTypeModel = mongoose.model('OccupancyType', OccupancyTypeSchema);
module.exports = OccupancyTypeModel;
