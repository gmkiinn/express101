_What is Express?_

Express is framework built on top of Node.js. It helps to create web application fast and maintainable.

_How to create an express application?_

To create express application:

- `mkdir express-basics`
- `cd express-basics`
- `npm init -y`
- `git init`
- `npm i express`
- `touch .gitignore`
- `touch readme.md`
- `touch server.js`

In server.js file

```
const express = require('express');

// creating application using express
const app = express();

// app has methods which maps  to request types
// app.get(), app.post(), app.put(), app.delete()

// service
// route, path, route handler
app.get('', (req, res) => {
  res.send('Hello from Express App');
});

// app.listen starts and runs the app at defined port
app.listen(3000, () => console.log('App is running on port 3000'));
```

Run the application through terminal using `node server.js`

_What is nodemon?_

nodemon is npm package, used to run the app automatically by detecting the changes in application.

To istall nodemon as dev dependency in app.
`npm i nodemon -D`

In package.json

```
"scripts": {
  "start": "node srver.js",
  "dev": "nodemon server.js"
},
```

Run the app using `nodemon run dev`

_What is middleware?_

Middleware or middleware function takes request object, process it and either terminates the req-res cycle by sending response to client or passes control to the next middleware. Middleware are used for cross cutting functionalities.

_What is request-processing-pipeline?_

The process of request going into bunch of middleware functions.
