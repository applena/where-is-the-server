'use strict';

/**
 * API Server module.
 * @module src/app
 */

const cwd = process.cwd();

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require( `${cwd}/src/middleware/error.js`);
const notFound = require( `${cwd}/src/middleware/notFound.js` );
const router = require( `${cwd}/src/router.js` );
const authRouter = require(`./auth/router.js`);
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../documentation/swagger/swagger.json');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Static Routes
app.use('/docs', express.static('docs'));

// Swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use(authRouter);
app.use(router);


// Catchalls
app.use('*', notFound);
app.use(errorHandler);

/**
 * Exported Function start
 * @param {integer} port (defaults to process.env.PORT)
 */
let start = (port = process.env.PORT) => {
  app.listen(port, () => {
    console.log(`Server Up on ${port}`);
  });
};
  
 
module.exports = {app,start};