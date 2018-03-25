# NodeJS and MongoDB Boilerplate

This is designed for someone who needs a simple backend API to take HTTP request and interact with MongoDB using [Mongoose](http://mongoosejs.com/)

Much Source Code from: https://github.com/uwmadisonieee/Server-And-Database-Workshop 

## How to run

1. Open terminal and `cd` to the directory
2. run `npm install`
3. make sure your `mongod` is up and running or it will crash on startup
4. run `node server.js`
	
If you get something like `failed to connect to server [127.0.0.1:27017] on first connect [MongoError: connect ECONNREFUSED 127.0.0.1:27017]` then good change your MongoDB Daemon is not up and running.

## How to use

If you have an application you just need to point it to the URL of this machine and add the port.

> Example: http://localhost:8000

[Postman](https://www.getpostman.com/) is a tool used to call HTTP Request and see the response. This will be used to test that our server is correctly handling all various HTTP Request.
