const fs = require("fs");
const http = require("http");

// FS

// // blocking code execution => Synchronous
// const textIn = fs.readFileSync("./txt/read-this.txt", "utf-8");
// console.log(textIn);

// const textOut = `penjelasan tentang alpukat di bahasa inggris : ${textIn}`;
// fs.writeFileSync("./txt/output-penjelasan.txt", textOut);
// e.log("Success");

// non blocking code execution => Asynchronous
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data2) => {
//     fs.readFile("./txt/final.txt", "utf-8", (err, data3) => {
//       fs.writeFile(
//         "./txt/gabungan-dua.txt",
//         `${data2}\n${data3}`,
//         "utf-8",
//         (err) => {
//           console.log("Success menggabungkan data");
//         }
//       );
//     });
//   });
// });
// console.log("Hai fsw 2");

///////////////////////////////////////

// SERVER dengan HTTP

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/hello") {
    res.end("Ini hello ke FSW2!");
  } else if (pathName === "/api") {
    const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else if (pathName === "/overview") {
    const overViewPage = fs.readFileSync(
      `${__dirname}/templates/overview.html`
    );
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end(overViewPage);
  } else if (pathName === "/product") {
    const productPage = fs.readFileSync(`${__dirname}/templates/product.html`);
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end(productPage);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end(`
        <html>
          <head>
            <style>
              h1 {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
            </style>
          </head>
          <body>
            <h1>NGAPAIN BANG!!!???</h1>
          </body>
        </html>
      `);
  }
});

const port = 3001;
const host = "127.0.0.1";

server.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});
