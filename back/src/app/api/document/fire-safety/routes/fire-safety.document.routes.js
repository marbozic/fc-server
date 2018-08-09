'use strict';

const FireSafetyDocumentController = require("../controller/fire-safety.document.controller");

const DOCUMENT_ROUTES = [
    {method: 'GET', path: '/documents/fire-safety', config: FireSafetyDocumentController.getDocument},
    {method: 'POST', path: '/documents/fire-safety/generate', config: FireSafetyDocumentController.generateDocument},
    {method: 'GET', path: '/documents/fire-safety/{DocumentID}', config: FireSafetyDocumentController.get},
];

module.exports = DOCUMENT_ROUTES;
