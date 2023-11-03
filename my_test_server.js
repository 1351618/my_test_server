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
      // * =================================================================
      case "/":
        console.log("contact page");
        staticFile(res, "/main.html", ".html");
        break;
      // * =================================================================
      case "/contact":
        console.log("contact page");
        staticFile(res, "/contact.html", ".html");
        break;
      // * =================================================================
      case "/api/data": // Добавленный маршрут для получения JSON данных
        const jsonPath = "./public/data.json"; // Путь к вашему JSON файлу
        res.setHeader("Content-Type", "application/json");
        fs.readFile(jsonPath, (error, data) => {
          if (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "Internal Server Error" }));
          } else {
            res.end(data);
          }
        });
        break;
      // * =================================================================
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
