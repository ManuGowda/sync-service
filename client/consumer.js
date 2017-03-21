"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PubSub = require("pubsub-js");
var mySubscriber = function (msg, data) {
    console.log(msg, data);
};
setTimeout(function () {
    var message = PubSub.subscribe('sync-service', mySubscriber);
    console.log("Hogeee", message);
}, 3000);
