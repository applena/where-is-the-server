![CF](http://i.imgur.com/7v5ASc8.png) LAB
=================================================

## WALDO

### Author: Lena Eivy, Caity Heath, Fletcher LaRue

### Links and Resources
[![Build Status](https://travis-ci.com/applena/where-is-the-server.svg?branch=master)](https://travis-ci.com/applena/where-is-the-server.svg)
* [repo](https://github.com/applena/where-is-the-server)
* [travis](https://travis-ci.com/applena/where-is-the-server.svg?branch=master)
* [back-end](https://waldo-server.herokuapp.com/) (when applicable)

#### Documentation
* [swagger](/swagger)
* [jsdoc](/docs) 

---
### Project Description 
Wouldn't it be nice to be able to host a site without needing to build, maintain, or house a server? This project provides users with a server so that they can focus on the experience of their clients. Waldo is known in the industry as a cloud or serverless system. Our team of three built this technology as a way of learning about serverless systems. After all the best way to learn about something is to build it! 

---
## Running Waldo
WALDO was written for two tpes of users. 

### The Admin User
The first type is the admin user who will make an account on our app, and use our server to connect their functions and their routes. The Admin User should go through the following steps to create an account.

#### 1. Authentication
The first step is to sign-up  by making an account with waldo. To do so enter the following command.<br><br>
`http post :3000/signup username='username' password='password'` Replace the quoted 'username' and 'password' with your own username and password without quotes. 

This will return you a token which you can use later to signin.

<br>

#### 2. Authorization
Once you've created an account you are assigned permissions to visit pages that consumers are not. You will have the ability to deploy functions to our database. You may also read your deployed functions. To sign in,  you have two choices:
* sign in with your username and password:
`http post :3000/signin -a 'username':'password'`

-or

* sign in with your bearer token that you got when you signed up. 
`http POST :3000/signin authorization:bearer\ 'token'`

#### 3. Deploy a function
You must be signed in to deploy a function. 

* go to `/createFunction` route
- you will need to put your authorization token in the header to verify your identity
- add the following information to the body of your request:
  - functionName = 'function name'
  - functionCode = 'your function'
* an example httpie request will look like the following:
`http :3000/createFunction authorization:bearer\ 'token' functionName='functionTest' functionCode="module.exports=()=>{return 'hello world';};"`
* Functions can send in 'context' as a parameter that holds the following information: `{body:request.body, env:process.env, param:request.params, query:request.query}`
* NOTE: you will need to remove the white space from your function if using httpie and you must have the double quotes around your code.

Congratulations! Your funciton is now hooked up and will be run by your consumers when they go to the following path: /'username'/'functionName'

### The Consumer
Our app is also built to support a consumer user. This is a user who will be visiting the paths that our admin users create

#### Using the App as a Consumer
Our app is designed to be easily used by any consumer. No security is needed to visit any path that has been estabilished by the admin user. Simply navigate to /'username'/'functionName' to access the function that you want to access. You will recieve the output of the function in your terminal.



<!-- ### Modules
#### `models/mongo.js`
##### Exported Values and Methods
###### `Model(schema) -> Class`
Builds a Class according to the schema that is passed to it to model data.

#### `middleware/500.js`
##### Exported Values and Methods
###### `(err, req, res, next) -> res.status(500)`
Catches server errors and displays 500 status message with error information.

#### `middleware/404.js`
##### Exported Values and Methods
###### `(req, res, next) -> res.status(404)`
Catches route errors and displays 404 status message with error information.

#### `middleware/model-finder.js`
##### Exported Values and Methods
###### `(req, res, next) -> require(string for filepath)`
Parses request object for model parameter. Requires in correct file using template literal and this param.

#### `auth/middleware.js`
##### Exported Values and Methods
###### `(req, res, next) -> (req, res, next)`
Processes functions based on request header content. Authorizes and issues JWT tokens.

#### `auth/router.js`
##### Exported Values and Methods
###### `express router`
Builds authentication based routes for signup, signin,create new role, oauth, and create key.

#### `api/v1.js`
##### Exported Values and Methods
###### `express router`
Buildes API routes for accessing database information to get, get all, post, put, and delete.

#### `auth/roles-model.js`
##### Exported Values and Methods
###### `mongoose schema and model`
Schema/Model for creating new roles and assigning role based capabilities.

#### `auth/users-model.js`
##### Exported Values and Methods
###### `instance of user class using schema`
Model for creating new users.

#### `models/players/players-model.js`
##### Exported Values and Methods
###### `instance of player class using schema`
Model for creating new players.

#### `models/players/players-schema.js`
##### Exported Values and Methods
###### `mongoose schema`
Schema for formatting data for use in the database.

#### `models/teams/teams-model.js`
##### Exported Values and Methods
###### `instance of teams class using schema`
Model for creating new teams and 

#### `models/teams/teams-schema.js`
##### Exported Values and Methods
###### `mongoose schema`
Schema for formatting data for use in the database. -->

### Setup
#### `.env` requirements
* `PORT` - port 3000 or connect to heroku
* `MONGODB_URI` - URL to the running mongo instance/db/ `MONGODB_URI=mongodb://localhost:27017/waldo`

#### Running the app
* `npm start`
* Endpoint: `/signup`
  * Returns a token after successful signup providing a username and passwords
* Endpoint: `/signin`
  * Can either use Basic signup with a username and password or use a bearer token
  * Returns a token after successfully signing in
* Endpoint: `/createFunction`
  * Once you are signed in, you can create a function and an endpoint. Your endpoint will be your `/${username}/${functionName}`
  * To create a function, navigate to /createFunction and send your auth token in the header. Send functionName and functionCode in the body as key value pairs. Functions can send in 'context' as a parameter that holds the following information: `{body:request.body, env:process.env, param:request.params, query:request.query}`
* Endpoint: `/${username}/${functionName}`
  * endpoints that are accessed by the consumer. They will do what the associated function tells them to do and produce what it tells them to produce.

# Tests

## Create User

```bash
# Create an admin user who can add functions and routes

USER_NAME=bob
CAPABILITIES='["c", "r", "u", "d"]'

USER_TOKEN=$(http POST :3000/signup username=$USER_NAME password=yo role=user)

```

## Add a funciton

```bash

#first sign up a new user
USER_NAME=bob1
CAPABILITIES='["c", "r", "u", "d"]'
FUNCTIONNAME=testFunction
FUNCTIONCODE="module.exports=()=>{return 'hello world';};"

USER_TOKEN=$(http POST :3000/signup username=$USER_NAME password=yo role=user)

#create a new function and route
ROUTE=$(http POST :3000/createFunction authorization:bearer\ $USER_TOKEN functionName=$FUNCTIONNAME functionCode=$FUNCTIONCODE)

```

## Run a function on a route

```bash

RUN_FUNCTION=$(http :3000/$USER_NAME/$FUNCTIONNAME)

echo $RUN_FUNCTION
#will produce 'hello world'
```

## RUNNING THE UNIT TESTS
* `npm test`
* asserting that all routes are reachable and deliver what we think they should
* asserting that the signup route signs up a user
* asserting that the signin route sings in a user
* asserting that the create function route does indeed create a function that excutes when a comsumer hits the path `/${username}/${functionName}`
* asserting that all user created routes run user created functions when hit


## How do I setup my .env? How do I set that up remotely?
* To set up your .env, you will need to specify the following variable:
```
MONGODB_URI=mongodb://localhost:27017/users
PORT=3000
SECRET=changeit
TOKEN_LIFETIME=900000
```

## What routes are supported?
* user routes:
/signup
/signin
/createFunction
/${username}/${functionName}


## How do I call them and what data do they expect?
* To call the routes, go to the heroku site or your local host and add the route to the end of the URL

## expected data
/signup => a token
/signin => a token
/createFunction => status 200
/${username}/${functionName} => whatever the user function specifies

## What format does data come back?
* Data is returned in the form that the admin user specifes in their function