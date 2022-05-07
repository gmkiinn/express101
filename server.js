require('dotenv').config();
const config = require('config');
const appDebugger = require('debug')('app:debug');
const httpDebugger = require('debug')('app:http');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const Joi = require('joi');
const logger = require('./middlewares/logger');
const auth = require('./middlewares/auth');

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

// resource
let users = [
  { id: 1, name: 'Mahesh' },
  { id: 2, name: 'Sandhya' },
  { id: 3, name: 'Chinnodu' },
];

// app has methods which maps  to request types
// app.get(), app.post(), app.put(), app.delete()

// service
// route, path, route handler
app.get('', (req, res) => {
  res.send('Hello from Express App');
});

app.get('/template', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});

// GET
// users get request
app.get('/users', (req, res) => {
  res.status(200).send(users);
});

// GET
// user get request
app.get('/users/:id', (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User with given id is not found');
  res.status(200).send(user);
});

// POST
// add user to resource
app.post('/users', (req, res) => {
  // validate input using joi
  // create schema: It defines the shape of data
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(20),
  });

  // validate the input using schema
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error);

  const user = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(user);
  return res.status(201).send(user);
});

// PUT
// update user
app.put('/users/:id', (req, res) => {
  // confirm user is present or not
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User with given id is not found');

  // validate input using joi
  // create schema: It defines the shape of data
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(20),
  });

  // validate the input using schema
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error);

  // update user and return
  user.name = req.body.name;
  res.status(200).send(user);
});

// DELETE
// delete user
app.delete('/users/:id', (req, res) => {
  // confirm user is present or not
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User with given id is not found');

  // delete user
  users = users.filter((user) => user.id !== parseInt(req.params.id));
  res.status(200).send(user);
});

// to get the req params and query params
// essentical info will send in req params and optional info send in query params
app.get('/:id', (req, res) => {
  const reqParams = req.params;
  const queryParams = req.query;
  res.send({ ...reqParams, ...queryParams });
});

// app.listen runs the app at defined port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('App is running on port ' + PORT));
