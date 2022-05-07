const express = require('express');
const router = express.Router();

// service
// route, path, route handler
router.get('/', (req, res) => {
  res.send('Hello from Express App');
});

router.get('/template', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});

// to get the req params and query params
// essentical info will send in req params and optional info send in query params
router.get('/:id', (req, res) => {
  const reqParams = req.params;
  const queryParams = req.query;
  res.send({ ...reqParams, ...queryParams });
});

module.exports = router;
