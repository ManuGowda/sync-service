"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PubSub = require("pubsub-js");
var logger_1 = require("../services/logger");
var PubSubClient = (function () {
    function PubSubClient() {
    }
    PubSubClient.prototype.producer = function (message, topicName) {
        return new Promise(function (resolve, reject) {
            try {
                PubSub.publish(topicName, message);
                logger_1.logger.info("Successfully published message to topic %s", topicName);
                resolve("success");
            }
            catch (err) {
                reject(err);
            }
        });
    };
    PubSubClient.prototype.subscriber = function (message, topicName) {
        return new Promise(function (resolve, reject) {
            try {
                var mySubscriber = function (msg, data) {
                    resolve(data);
                };
                var token = PubSub.subscribe(topicName, mySubscriber);
            }
            catch (err) {
                reject(err);
            }
        });
    };
    return PubSubClient;
}());
exports.PubSubClient = PubSubClient;
