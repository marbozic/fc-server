'use strict';

const BuildingController = require("../controller/building.controller");

const BUILDING_ROUTES = [
    {method: 'GET', path: '/buildings', config: BuildingController.all},
    {method: 'GET', path: '/buildings/{BuildingID}', config: BuildingController.get},
    {method: 'POST', path: '/buildings/{BuildingID}', config: BuildingController.update},
    {method: 'POST', path: '/buildings/batch', config: BuildingController.batch},
    {method: 'POST', path: '/buildings/getBatch', config: BuildingController.getBatch},
];

module.exports = BUILDING_ROUTES;
