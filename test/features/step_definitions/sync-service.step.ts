import cucumber = require('cucumber');
import Callback = cucumber.CallbackStepDefinition;
import { api as server } from '../../../server/app';
import * as supertest from 'supertest';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

export = function () {

  let message = {};
  this.Given(/^a valid json$/, (callback: Callback) => {
    message = {
      message: 'sync-service'
    };
    callback();
  });

  this.When(/^sync api is invoke with POST$/, (callback: Callback) => {
    supertest(server)
      .post('/sync')
      .send(message)
      .set('Accept', 'application/json')
      .end((err: any, response: supertest.Response) => {
        if (err) {
          callback(err);
        } else {
          expect(response.status).to.equal(200);
          callback();
        }
      });
  });

  this.Then(/^message should be validated and published to broker$/, (callback: Callback) => {
    callback();
  });
};