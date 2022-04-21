# Coversy

Instructor shift scheduling, shift exchange, and payroll management system.

## Deployments

-   [Application](https://coversy.vercel.app/)
-   [API](https://coversy.herokuapp.com/)
-   [Documentation](https://coversy-docs.vercel.app/)

## Prerequisites

This project requires NodeJS (version 16 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/).
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
```

## Installation

Install CLI dependencies:

```sh
$ npm run i-cli
```

Install Base/Server/Client dependencies:

```sh
$  npm run i-all
```

## Configuration

Include the server .env file in /server. <br>
Include the client .env file in /client.

## Development

To run the server and client in parallel:

```sh
$ npm run s-all
```

Alternate run script utilizing nodemon for server:

```sh
$ npm run d-all
```

To start the server:

```sh
$ npm run dev --prefix ./server
```

To start the client:

```sh
$ npm start --prefix ./client
```

## Documentation

To generate jsdocs:

```sh
$ npm run doc
```

## Troubleshooting

Check that you have the latest version of NodeJS and NPM. <br>
Check to ensure that environment variables are set correctly.
