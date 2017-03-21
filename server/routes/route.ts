import * as restify from 'restify';
import { MessageSyncController } from '../controllers/api/v1/MessageSyncController';

function route(api: restify.Server): void {
  let trackCtrl = new MessageSyncController();

  api.post('/sync', (req: restify.Request, res: restify.Response) => {
    trackCtrl.sync(req, res);
  });
}

module.exports.routes = route;
