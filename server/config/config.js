"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env = process.env.NODE_ENV || 'development';
exports.settings = {
    name: 'sync-service',
    version: '1.0.0',
    port: 8083,
    env: 'development'
};
if (env === 'production') {
    exports.settings.env = 'production';
}
exports.schema = {
    "type": "object",
    "properties": {
        "message": { "type": "string" }
    },
    "required": ["app_name"]
};
