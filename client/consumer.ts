import * as kafkaNode from 'kafka-node';
import { logger } from '../server/services/logger';

let HighLevelConsumer = kafkaNode.HighLevelConsumer;
let Client = kafkaNode.Client;
let argv = require('optimist').argv;
let consumerClient = new Client('localhost:2181', 'consumer');
let topics = [{ topic: "sync-service" }];
let options = { autoCommit: true, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };
let consumer = new HighLevelConsumer(consumerClient, topics, options);

consumer.on('message', function (message) {
  logger.info(message);
});

consumer.on('error', function (err) {
  logger.info('error', err);
});