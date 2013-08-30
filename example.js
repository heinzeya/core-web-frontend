var
  KabamKernel = require('kabam-kernel'),
  express = require('express'),
  config = require('./config/config.json'),
  path = require('path'),
  kernel = KabamKernel(config);

kernel.extendApp(function (core) {
  core.app.locals.delimiters = '[[ ]]'
});

kernel.usePlugin(require('kabam-plugin-hogan'));
kernel.usePlugin(require('./index.js'));

kernel.start(config.port);


