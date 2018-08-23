'use strict';

const _ = require('underscore');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const BaseDAO = require('../../../../core/base.dao');
const PropertyDAO = require('../../../property/property/dao/property.dao');

class DocumentDAO extends BaseDAO {
    constructor(model) {
        super(model);
    }

    forProperty(PropertyID) {
        return this.model.find({PropertyID});
    }

    getDocumentsBeforeNotifiedAt(prevNotifiedAt, limit = 10) {
        return PropertyDAO
            .all({Status: 1})
            .then(properties => {
                    const propertyById = _.indexBy(properties, '_id');
                    return this.model.find({
                        PropertyID: {$in: Object.keys(propertyById)},
                        $or: [
                            {notified_at: {$lt: prevNotifiedAt}},
                            {notified_at: {$eq: null}},
                        ],
                        Status: 1
                    }).limit(limit)
                        .sort('-notified_at')
                        .then(docs => {
                            return docs.map(d => {
                                d.property = propertyById[d.PropertyID];
                                return d;
                            });
                        });
                }
            );
    }
}

module.exports = DocumentDAO;