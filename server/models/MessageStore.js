"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonschema_1 = require("jsonschema");
var logger_1 = require("../services/logger");
var config_1 = require("../config/config");
var MessageStore = (function () {
    function MessageStore(client) {
        logger_1.logger.info("Init: MessageStore Model");
        this._pubSubClient = client;
        this._validator = new jsonschema_1.Validator();
    }
    MessageStore.prototype.store = function (message) {
        try {
            var isValid = this._validator.validate(message, config_1.schema);
            var topicName = void 0;
            if (isValid.errors.length === 0) {
                topicName = "sync-service";
            }
            else {
                topicName = "invalid-sync-service";
            }
            return this._pubSubClient.producer(message, topicName);
        }
        catch (e) {
            logger_1.logger.error("Error while tracking event: ", e);
        }
    };
    return MessageStore;
}());
exports.MessageStore = MessageStore;
