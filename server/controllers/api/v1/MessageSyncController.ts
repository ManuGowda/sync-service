import * as restify from 'restify';
import { MessageStore } from '../../../models/MessageStore';
import { logger } from '../../../services/logger';
import { KafkaClient } from '../../../services/KafkaClient';
import { PubSubClient } from '../../../services/PubSub';

export class MessageSyncController {

  private _messageStore: MessageStore;

  constructor() {
    let pubSubClient = new PubSubClient();
    let kafkaClient = new KafkaClient();

    this._messageStore = new MessageStore(kafkaClient);
  }

  public sync(req: restify.Request, res: restify.Response): void {
    this._messageStore.save(req.body)
      .then((data) => {
        logger.info("Successfully published message");
        res.json("success").status(200);
      })
      .catch((err) => {
        logger.info("Failed to published message", err);
        res.json("success").status(200);
      });
  }
}
