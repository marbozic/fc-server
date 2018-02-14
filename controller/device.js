/**
 * Created by Zeus on 09/01/17.
 */

var Boom = require('boom');
var Property = require('../schema/property').Property;
var Device = require('../schema/property').Device;
var User = require('../schema/user').User;
var async = require('async');
const logger = require('../logger');

exports.upsert = {
  handler: function(request, reply) {
    var hash = request.query.hash;
    if (!hash) {
      return reply(Boom.unauthorized());
    }
    User.findOne(
      {
        _id: hash,
      },
      function(err, user) {
        if (!user) {
          return reply(Boom.unauthorized());
        }
      }
    );

    Property.findOne(
      {
        _id: request.payload.PropertyID,
      },
      function(err, property) {
        if (!err) {
          var _Device = property.Buildings.id(request.payload.BuildingID)
            .Floors.id(request.payload.FloorID)
            .Devices.id(request.payload._id);
          if (!_Device) {
            var _Floor = property.Buildings.id(
              request.payload.BuildingID
            ).Floors.id(request.payload.FloorID);
            var device = new Device(request.payload);
            _Floor.Devices.push(device);
            property.save();
            return reply(property);
          } else {
            _Device.EquipmentType = request.payload.EquipmentType;
            _Device.DeviceType = request.payload.DeviceType;
            _Device.ModelNumber = request.payload.ModelNumber;
            _Device.SerialNumber = request.payload.SerialNumber;
            _Device.InstallationDate = request.payload.InstallationDate;
            _Device.DeviceLocation = request.payload.DeviceLocation;
            _Device.Notes = request.payload.Notes;
            _Device.QRCode = request.payload.QRCode;
            _Device.Picture = request.payload.Picture;
            _Device.Status = request.payload.Status;
            _Device.XPos = request.payload.XPos;
            _Device.YPos = request.payload.YPos;

            _Device.updated_at = request.payload.updated_at;
            property.save();
            return reply(property);
          }
        }

        return reply(Boom.badImplementation(err)); // 500 error
      }
    );
  },
};

exports.batch = {
  handler: function(request, reply) {
    var hash = request.query.hash;
    if (!hash) {
      logger.info('device.batch unauthorized no hash');
      return reply(Boom.unauthorized());
    }
    logger.info(`device.batch ${hash} request`);
    User.findOne(
      {
        _id: hash,
      },
      function(err, user) {
        if (!user) {
          logger.info(`device.batch ${hash} unauthorized no user`);
          return reply(Boom.unauthorized());
        }
      }
    );

    var devices = request.payload.devices;
    async.eachSeries(
      devices,
      function(data, callback) {
        Property.findOne(
          {
            _id: data.PropertyID,
          },
          function(err, property) {
            if (!err) {
              var _Device = property.Buildings.id(data.BuildingID)
                .Floors.id(data.FloorID)
                .Devices.id(data._id);
              if (!_Device) {
                var _Floor = property.Buildings.id(data.BuildingID).Floors.id(
                  data.FloorID
                );
                var device = new Device(data);
                _Floor.Devices.push(device);
                property.save();
              } else {
                _Device.EquipmentType = data.EquipmentType;
                _Device.DeviceType = data.DeviceType;
                _Device.ModelNumber = data.ModelNumber;
                _Device.SerialNumber = data.SerialNumber;
                _Device.InstallationDate = data.InstallationDate;
                _Device.DeviceLocation = data.DeviceLocation;
                _Device.Notes = data.Notes;
                _Device.QRCode = data.QRCode;
                _Device.Picture = data.Picture;
                _Device.Status = data.Status;
                _Device.XPos = data.XPos;
                _Device.YPos = data.YPos;

                _Device.updated_at = data.updated_at;
                property.save();
              }
            } else {
              logger.info(`device.batch ${hash} error ${err}`);
            }
            callback(null);
          }
        );
      },
      function(err) {
        logger.info(`device.batch ${hash} finish`);
        return reply({});
      }
    );
  },
};

exports.create = {
  handler: function(request, reply) {
    var hash = request.query.hash;
    if (!hash) {
      return reply(Boom.unauthorized());
    }
    User.findOne(
      {
        _id: hash,
      },
      function(err, user) {
        if (!user) {
          return reply(Boom.unauthorized());
        }
      }
    );

    Property.findOne(
      {
        _id: request.payload.PropertyID,
      },
      function(err, property) {
        if (!err) {
          var _Floor = property.Buildings.id(
            request.payload.BuildingID
          ).Floors.id(request.payload.FloorID);
          var device = new Device(request.payload);
          _Floor.Devices.push(device);
          property.save();
          return reply(property);
        }

        return reply(Boom.badImplementation(err)); // 500 error
      }
    );
  },
};

exports.update = {
  handler: function(request, reply) {
    var hash = request.query.hash;
    if (!hash) {
      return reply(Boom.unauthorized());
    }
    User.findOne(
      {
        _id: hash,
      },
      function(err, user) {
        if (!user) {
          return reply(Boom.unauthorized());
        }
      }
    );

    Property.findOne(
      {
        _id: request.payload.PropertyID,
      },
      function(err, property) {
        if (!err) {
          var _Device = property.Buildings.id(request.payload.BuildingID)
            .Floors.id(request.payload.FloorID)
            .Devices.id(request.payload._id);
          _Device.EquipmentType = request.payload.EquipmentType;
          _Device.DeviceType = request.payload.DeviceType;
          _Device.ModelNumber = request.payload.ModelNumber;
          _Device.SerialNumber = request.payload.SerialNumber;
          _Device.InstallationDate = request.payload.InstallationDate;
          _Device.DeviceLocation = request.payload.DeviceLocation;
          _Device.Notes = request.payload.Notes;
          _Device.QRCode = request.payload.QRCode;
          _Device.Picture = request.payload.Picture;
          _Device.Status = request.payload.Status;
          _Device.XPos = request.payload.XPos;
          _Device.YPos = request.payload.YPos;

          _Device.updated_at = request.payload.updated_at;
          property.save();
          return reply(property);
        }

        return reply(Boom.badImplementation(err)); // 500 error
      }
    );
  },
};
