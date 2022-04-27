# Coversy

Instructor shift scheduling, shift exchange, and payroll management system.

## Deployments

- [Application](https://coversy.vercel.app/)
- [API](https://coversy.herokuapp.com/)
- [Documentation](https://coversy-docs.vercel.app/)

## Prerequisites

This project requires NodeJS (version 16 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/).
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
```

## Installation

Install dependencies:

```sh
$ npm install
```

## Configuration

Create copies of the .env.example files (/server, /client) and rename them to '.env'.<br>
Update the copies with your database credentials and other configuration options.

## Development

Run development client & server:

```sh
$ npm run dev
```

## Documentation

To generate jsdocs:

```sh
$ npm run doc
```

## Troubleshooting

Check that you have the latest version of NodeJS and NPM. <br>
Check to ensure that environment variables are set correctly.
