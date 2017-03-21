import { Validator } from 'jsonschema';
import { logger } from '../services/logger';
import { schema } from '../config/config';
import { Message } from 'globals';

/**
 * MessageStore
 */

export class MessageStore {

  private _client: any;
  private _validator: Validator;

  constructor(client: any) {
    logger.info("Init: MessageStore Model");
    this._client = client;
    this._validator = new Validator();
  }

  public store(message: Message): Promise<any> {
    try {
      let isValid = this._validator.validate(message, schema);
      let topicName: string;
      if (isValid.errors.length === 0) {
        topicName = "sync-service";
      } else {
        topicName = "invalid-sync-service";
      }
      return this._client.producer(message, topicName);
    } catch (e) {
      logger.error("Error while tracking message: ", e);
    }
  }
}