"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bunyan = require("bunyan");
var stream = require("stream");
var infoStream = new stream.Writable();
infoStream.writable = true;
infoStream.write = function (info) {
    console.log(JSON.parse(info).msg);
    return true;
};
exports.logger = bunyan.createLogger({ name: 'sync-service' });
