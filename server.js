require('dotenv').config();
const config = require('config');
const appDebugger = require('debug')('app:debug');
const httpDebugger = require('debug')('app:http');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const logger = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const users = require('./routes/users');
const home = require('./routes/home');

// creating server using express
const app = express();

// buit-in middlewares
app.use(express.json()); // to parse req body and put data into req.body
app.use(express.urlencoded({ extended: true })); // to parse data of url and put in req.body
app.use(express.static('public')); // to provide static files

// third-party middlewares
app.use(helmet());
app.use(morgan('tiny'));

// custom middleware
app.use(logger);
app.use(auth);

// App Environments
// export NODE_ENV=production
// dotenv
console.log(process.env.NODE_ENV);
console.log(app.get('env'));

// Configuration settings for an app
console.log(config.get('name'));
console.log(config.get('user.password'));

// Debug
appDebugger('Application Debugger');
httpDebugger('HTTP Debugger');

// using template engines
app.set('view engine', 'pug');
app.set('views', './views');

// routes
app.use('/', home);
app.use('/users', users);

// app.listen runs the app at defined port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('App is running on port ' + PORT));
