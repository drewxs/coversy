# Coversy - Server

### Tools

-   [Express](https://www.npmjs.com/package/express)
-   [MongoDB](https://www.mongodb.com)
-   [AWS S3](https://aws.amazon.com/s3/)

### Requirements

This project requires NodeJS (version 8 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/).
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
```

### Installation

```sh
$ npm i
```

### Configuration

Include client .env in root ('/server).
Do not modify .env.test file.

### Development

```sh
$ npm run dev
```

### Troubleshooting

Make sure you have the latest version of NodeJS and NPM.

Run the following for missing modules:

```sh
$ npm i
```

If receiving an error related to nodemon, run the following before trying again:

```sh
$ npm i -g nodemon
```
