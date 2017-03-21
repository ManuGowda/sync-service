let env = process.env.NODE_ENV || 'development';

import { Config } from 'globals';

export let settings: Config = {
  name: 'sync-service',
  version: '1.0.0',
  port: 8083,
  env: 'development'
};

if (env === 'production') {
  settings.env = 'production';
}

export let schema = {
  "type": "object",
  "properties": {
    "message": { "type": "string" }
  },
  "required": ["app_name"]
};