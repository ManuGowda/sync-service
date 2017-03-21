import * as PubSub from 'pubsub-js';
import { logger } from '../services/logger';
import { Message } from 'globals';

export class PubSubClient {

  public producer(message: Message, topicName: string): Promise<any> {

    return new Promise(function (resolve, reject) {
      try {
        PubSub.publish(topicName, message);
        logger.info("Successfully published message to topic %s", topicName);
        resolve("success");
      } catch (err) {
        reject(err);
      }
    });
  }

  public subscriber(message: Message, topicName: string): Promise<any> {

    return new Promise(function (resolve, reject) {
      try {
        let mySubscriber = function (msg, data) {
          resolve(data);
        };
        let token = PubSub.subscribe(topicName, mySubscriber);
      } catch (err) {
        reject(err);
      }
    });
  }
}