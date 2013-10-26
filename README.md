# Kabam Core Web Frontend [![Build Status](https://travis-ci.org/mykabam/core-web-frontend.png?branch=master)](https://travis-ci.org/mykabam/core-web-frontend)

## Goals

This is the web frontend project for [Kabam Framework](https://github.com/mykabam/kabam) developed using
[AngularJS](http://angularjs.org). This project can only be run from [Kabam Framework](https://github.com/mykabam/kabam),
although it has independent unit tests.

The main features provided by this module are:

 * The main client-side web-based Kabam Framework, initialized as an Angular Application.
 * Authentication UI module, including sign-up, login, logout, reset passwords and profile updating.
 * Groups (Organizational Units) Management
 * Users Management
 * Video, audio and text-based communication tools based on [WebRTC](http://www.webrtc.com)
 * Search Engine inteface
 * Events Management

*Kabam Framework* users can extend this basic UI Framework and add more features. The packaged tools provided in this
project are:

 * [AngularJS](http://angularjs.org) as base framework
 * [jQuery](http://jquery.com)
 * [Twitter Bootstrap](http://getbootstrap.com) provides standard theme layouting framework
 * [Angular-UI](http://angular-ui.github.io) provides many helper tools and advanced widgets
 * Real-time event system based on [Socket-IO](http://socket.io).

## Development tools

You must have this tools installed:

* [Node.js](http://nodejs.org/)
* [npm](http://npmjs.org/)

This core web frontend is built based on the Yeoman workflow, so you must install the following tools to get started:

* [bower](http://bower.io/)
* [Grunt](http://gruntjs.com/)

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

## Running Tests

We assume you already install the dependencies. To run the unit tests:

```
$ grunt test
```

## Running the Application

This application can only be run from the [kabam](http://github.com/mykabam/kabam) project or
any other application that is developed using kabam.

In development mode you can link the two project to get a running application with live updates:

```
$ cd core-web-frontend
$ bower link

$ cd ../kabam
$ bower link kabam-core-web-frontend
$ node-dev skel/index.js
```

## License

Licensed under the MIT License.
