The `express-expires` function creates Express.js middleware to reject requests
that don't have an `Expires` header or have an `Expires` header too far in the
future.

Usage
=====
```js
const express = require("express");
const expires = require("@zingle/express-expires");
const app = express();

app.post("/foo", expires(1000 * 60 * 30), (req, res) => {
    // can assume expires header is set and less than 30 mins in the future
    const expires = new Date(req.get("expires"));
});
```
