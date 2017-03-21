/* istanbul ignore next */
import * as bunyan from 'bunyan';
import * as stream from 'stream';
import { settings } from '../config/Config';

let infoStream = new stream.Writable();
infoStream.writable = true;

infoStream.write = (info: any): boolean => {

  console.log(JSON.parse(info).msg);
  return true;
};

export let logger = bunyan.createLogger({name: 'sync-service'});
