import * as PubSub from 'pubsub-js';

let mySubscriber = function (msg, data) {
    console.log(msg, data);
};
setTimeout(function () {


    let message = PubSub.subscribe('sync-service', mySubscriber);
    console.log("Hogeee", message);
}, 3000);
