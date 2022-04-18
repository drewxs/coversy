# Coversy

Instructor shift scheduling, shift exchange, and payroll management system. For internal use only.

### Prerequisites

This project requires NodeJS (version 16 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/).
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
```

### Installation

Install base dependencies:

```sh
$  npm i
```

Install server/client dependencies:

```sh
$  npm run i-all
```

### Configuration

Include the server .env file in /server. <br>
Include the client .env file in /client.

### Development

To run the server and client in parallel:

```sh
$ npm run s-all
```

To start the server:

```sh
$ npm run dev --prefix ./server
```

To start the client:

```sh
$ npm start --prefix ./client
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
