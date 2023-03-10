'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = require("./photo.schema");

const updatedAtValidator = require("../../../../core/validators/updated-at.validator");
const validateUpdatedAt = [updatedAtValidator, 'newer version of entity already stored, updated_at > new value'];

const InspectionSchema = new Schema({
    Frequency: {type: String},
    DeviceStatus: {type: Number},
    Reason: {type: String},
    Note: {type: String},
    InspectionDate: {type: Date},
    Status: {type: Number},
    StaticPSI: {type: Number}, // device type : RISERS 56fa30a9dfe0b7562268265f
    ResidualPSI: {type: Number}, // device type : RISERS 56fa30a9dfe0b7562268265f
    ReturnToStaticPSI: {type: Number}, // device type : RISERS 56fa30a9dfe0b7562268265f
    User: {type: Schema.Types.ObjectId, ref: 'User'},
    Photos: [PhotoSchema],
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, validate: validateUpdatedAt},
    DeviceID: {type: Schema.Types.ObjectId, ref: 'Device'},
    FloorID: {type: Schema.Types.ObjectId, ref: 'Floor'},
    BuildingID: {type: Schema.Types.ObjectId, ref: 'Building'},
    PropertyID: {type: Schema.Types.ObjectId, ref: 'Property'}
});

InspectionSchema.index({PropertyID: 1, BuildingID: 1, FloorID: 1, DeviceID: 1});

const InspectionModel = mongoose.model('Inspection', InspectionSchema);
module.exports = InspectionModel;
