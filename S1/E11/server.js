const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/getSecretData") {
    res.end("We have no secret data");
  }
  res.end("Hello DevX");
});

server.listen(8080, () => {
  console.log("Server is listening");
});
