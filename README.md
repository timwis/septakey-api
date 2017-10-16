# septakey-api
A REST API providing basic functions of [septakey.org](https://septakey.org).
Uses [Puppeteer](https://github.com/GoogleChrome/puppeteer) for web scraping.

## local development
```bash
npm install
npm start
```
Then make a `POST` request to `localhost:3000/register` with a JSON body
following [this schema](lib/schemas.js).

Set `NODE_ENV=production` to go fully headless.
