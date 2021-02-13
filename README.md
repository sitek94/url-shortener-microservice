# URL Shortener Microservice

A simple URL shortener that allows to reduce long links, just paste the long URL and click **Shorten**.

This project is my solution for [APIs and Microservices Projects - URL Shortener Microservice] and it's a part of APIs and Microservices Certification by [freeCodeCamp].

## Requirements

✅ You can POST a URL to `/api/shorturl/new` and get a JSON response with original_url and short_url properties.

✅ When you visit `/api/shorturl/<short_url>`, you will be redirected to the original URL.

✅ If you pass an invalid URL that doesn't follow the valid `http://www.example.com` format, the JSON response will contain `{ error: 'invalid url' }`

[apis and microservices projects - url shortener microservice]: https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/url-shortener-microservice
[freecodecamp]: https://www.freecodecamp.org/

## Installation

### MongoDB Atlas

Use your existing account or create a new one. If you don't know how to do that, you can
follow [step by step tutorial by freeCodeCamp](https://www.freecodecamp.org/learn/apis-and-microservices/mongodb-and-mongoose/).

Once you have connected to your cluster, use `.env.example` to create your `.env` file.

```env
MONGO_URI_PROD=mongodb+srv://<user>:<password>@<cluster#-dbname>.mongodb.net/test

MONGO_URI_DEV=mongodb://localhost:27017/<db_name>
```

### Install dependencies

```bash
$ npm install
```

### Start the server

```bash
$ npm run dev
```

### Test

```bash
$ npm test
```
