"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageStore_1 = require("../../../models/MessageStore");
var logger_1 = require("../../../services/logger");
var KafkaClient_1 = require("../../../services/KafkaClient");
var PubSub_1 = require("../../../services/PubSub");
var AnalyticsTrackController = (function () {
    function AnalyticsTrackController() {
        logger_1.logger.info("Init: AnalyticsTrackController");
        var pubSubClient = new PubSub_1.PubSubClient();
        var kafkaClient = new KafkaClient_1.KafkaClient();
        this._analyticsEvent = new MessageStore_1.MessageStore(kafkaClient);
    }
    AnalyticsTrackController.prototype.track = function (req, res) {
        this._analyticsEvent.store(req.body)
            .then(function (data) {
            logger_1.logger.info("Successfully published event");
            res.json("success").status(200);
        })
            .catch(function (err) {
            logger_1.logger.info("Failed to published event", err);
            res.json("success").status(200);
        });
    };
    return AnalyticsTrackController;
}());
exports.AnalyticsTrackController = AnalyticsTrackController;
