'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
    Title: {type: String, required: true}
});

const OrganizationModel = mongoose.model('Organization', OrganizationSchema);

module.exports = OrganizationModel;