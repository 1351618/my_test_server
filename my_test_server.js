const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 3500;

const mimeTypes = {
  ".html": "text/html",
  ".png": "image/png",
  ".css": "text/css",
  ".js": "text/javascript",
};

function staticFile(res, filePath, ext) {
  res.setHeader("Content-Type", mimeTypes[ext]);
  fs.readFile(
    "./public" + filePath,

    (error, data) => {
      if (error) {
        res.statusCode = 404;
        res.end();
      } else {
        res.end(data);
      }
    }
  );
}

http
  .createServer(function (req, res) {
    const url = req.url;
    console.log(url);

    switch (url) {
      case "/":
        console.log("contact page");
        staticFile(res, "/main.html", ".html");
        break;
      case "/contact":
        console.log("contact page");
        staticFile(res, "/contact.html", ".html");
        break;
      default:
        const extname = String(path.extname(url)).toLocaleLowerCase();
        if (extname in mimeTypes) {
          staticFile(res, url, extname);
        } else {
          res.statusCode = 404;
          res.end();
        }
    }
    // res.end("8");
  })
  .listen(PORT);
