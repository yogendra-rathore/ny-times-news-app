const cors_proxy = require('cors-anywhere');

const host = 'localhost';
const port = 8080; // You can change this to any port of your choice

cors_proxy
  .createServer({
    originWhitelist: [], // Allow all origins
  })
  .listen(port, host, () => {
    console.log(`CORS Anywhere proxy server started on http://${host}:${port}`);
  });
