# Sync-service

RESTful NodeJS api to achive Basic synchronization mechanism in NodeJS using pub/sub model.

### Messaging setup
I have choosen Apache Kafka has pub/sub messaging system for this test. Apache Kafka is a fast, scalable, durable, and fault-tolerant publish-subscribe messaging system. Kafka is often used in place of traditional message brokers like JMS and AMQP because of its higher throughput, reliability and replication.

We can easily switch the messaging system from kafka to other client, that code is demonstrated here [Messaging tools/software should be interchangeable easily](https://github.com/ManuGowda/sync-service/blob/master/server/controllers/api/v1/MessageSyncController.ts)

## Setup Apache Kafka
# Prerequisites
Java 8, Maven 3.0 and above
Download Kafka from [Apache Kafka](http://kafka.apache.org/downloads.html)

```sh
Step 1: Extract the kafka
    $ tar -xzf kafka_2.11-0.9.0.0.tgz 
    $ cd kafka_2.11-0.9.0.0
Step 2: Start the zookeeper
    $ bin/zookeeper-server-start.sh config/zookeeper.properties &
Step 3: Start the Kafka server
    $ bin/kafka-server-start.sh config/server.properties
Step 4: Create the topics
    $ bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic sync-service
    $ bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic invalid-sync-service
```

### Installation

Requires [Node.js](https://nodejs.org/) v4+ to run.
Required git [plugins/github/README.md] [PlGh]

Install the dependencies and devDependencies and start the server.

```sh
$ git clone https://github.com/ManuGowda/sync-service
$ cd sync-service
$ npm install
$ npm install -g gulp
```

### Build

Build the solution with test cases.

```sh
$ cd sync-service
$ gulp
```

### Start server

```sh
$ cd sync-service
$ node server/app.js
```

### Start client

```sh
$ cd sync-service
$ node client/consumer.js
```