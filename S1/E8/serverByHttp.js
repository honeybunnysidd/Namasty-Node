const http = require("http");

const app = http.createServer((req, res) => {
  if (req.url === "/secret") {
    res.end("This is no secret data");
  }
  res.end("Hello Developers");
});






app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
