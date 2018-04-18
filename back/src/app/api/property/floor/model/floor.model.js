'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MapSchema = require("../../common/map/model/map.schema");

const FloorSchema = new Schema({
    Title: {type: String},
    Map: MapSchema,
    XPos: {type: Number},
    YPos: {type: Number},
    // Devices: [{ type: Schema.Types.ObjectId, ref: 'Device'}],
    Status: {type: Number},
    created_at: {type: Date},
    updated_at: {type: Date},
    BuildingID: {type: Schema.Types.ObjectId, ref: 'Building'},
    PropertyID: {type: Schema.Types.ObjectId, ref: 'Property'}
}, {
    usePushEach: true
});

FloorSchema.index({PropertyID: 1, BuildingID : 1});


const FloorModel = mongoose.model('Floor', FloorSchema);
module.exports = FloorModel;