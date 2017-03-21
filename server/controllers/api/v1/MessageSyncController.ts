import { MessageStore } from '../../../models/MessageStore';
import { logger } from '../../../services/logger';
import * as restify from 'restify';
import { KafkaClient } from '../../../services/KafkaClient';
import { PubSubClient } from '../../../services/PubSub';

export class MessageSyncController {

  private _analyticsEvent: MessageStore;

  constructor() {
    let pubSubClient = new PubSubClient();
    let kafkaClient = new KafkaClient();

    this._analyticsEvent = new MessageStore(kafkaClient);
  }

  public sync(req: restify.Request, res: restify.Response): void {
    this._analyticsEvent.store(req.body)
      .then((data) => {
        logger.info("Successfully published event");
        res.json("success").status(200);
      })
      .catch((err) => {
        logger.info("Failed to published event", err);
        res.json("success").status(200);
      });
  }
}
