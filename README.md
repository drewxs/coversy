# Coversy

Instructor shift scheduling, shift exchange, and payroll management system. For internal use only.

### Prerequisites

This project requires NodeJS (version 8 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/).
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
```

### Installation

```sh
$ npm i && npm i --prefix server && npm i --prefix client
```

### Configuration

Include the server .env file in /server. <br>
Include the client .env file in /client.

### Development

To start the server:

```sh
$ npm --prefix ./server run dev
```

To start the client:

```sh
$ npm --prefix ./client start
```

### Documentation

To generate jsdocs:

```sh
$ npm run doc
```

### Troubleshooting

Check that you have the latest version of NodeJS and NPM. <br>
Check if your environment variables are set correctly.

```

```
