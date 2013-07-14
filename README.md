MyWebClass Core Web Frontend
============================

## Goals
* Handles resource management
* Handles user authentication
* Handles initial display like the home, about page or alike

## Required tools

You must have this tools installed:

* [Node.js](http://nodejs.org/)
* [npm](http://npmjs.org/)

This core web frontend is built based on the Yeoman workflow, so you must install the following tools to get started:

* [yo](https://github.com/yeoman/yo)
* [bower](http://bower.io/)
* [Grunt](http://gruntjs.com/)
* [generator-angular](https://github.com/yeoman/generator-angular)
 
Once you have successfully install the required tools you move along.

## Get started

### Clone

Clone the repository:

```
$ git clone git@github.com:mywebclass/core-web-frontend.git
```

### Install the dependencies

Install the dependencies:

```
$ npm install && bower install
```
Or to run it in development mode:

```
$ grunt server
```

## Running Tests

We assume you already install the dependencies. To run the test:

```
$ grunt test
```
