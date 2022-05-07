const express = require('express');
const router = express.Router();
const Joi = require('joi');

// resource
let users = [
  { id: 1, name: 'Mahesh' },
  { id: 2, name: 'Sandhya' },
  { id: 3, name: 'Chinnodu' },
];

// app has methods which maps  to request types
// app.get(), app.post(), app.put(), app.delete()

// GET
// users get request
router.get('/', (req, res) => {
  res.status(200).send(users);
});

// GET
// user get request
router.get('/:id', (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User with given id is not found');
  res.status(200).send(user);
});

// POST
// add user to resource
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  // confirm user is present or not
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User with given id is not found');

  // delete user
  users = users.filter((user) => user.id !== parseInt(req.params.id));
  res.status(200).send(user);
});

module.exports = router;
