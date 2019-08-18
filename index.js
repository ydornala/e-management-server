var env = process.env.NODE_ENV =  process.env.NODE_ENV || 'dev';

if(env === 'dev' || env === 'test') {
    require('babel-register');
}

exports = module.exports = require('./server');