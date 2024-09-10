'use strict';

exports.logger = {
  consoleLevel: 'DEBUG',
  outputJSON: true,
  disableConsoleAfterReady: false,
};


exports.mongoose = {
  url: 'mongodb://localhost:27017/webkubor',
  options: {
    useUnifiedTopology: true,
  },
};

