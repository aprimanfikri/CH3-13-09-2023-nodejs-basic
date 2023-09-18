const fs = require("fs");
const http = require("http");
const url = require("url");

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

const replaceTemplate = (template, product) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTIONS%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOTORGANIC%}/g, "not-organic");

  return output;
};

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const overViewPage = fs.readFileSync(`${__dirname}/templates/overview.html`);

const productPage = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);

const prodCardTemplate = fs.readFileSync(
  `${__dirname}/templates/template.html`,
  "utf-8"
);

const server = http.createServer((req, res) => {
  const { query, pathname: pathName } = url.parse(req.url, true);

  //HELLO PAGE
  if (pathName === "/hello") {
    res.end("Ini hello ke FSW2!");

    //API PAGE
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);

    //OVERVIEW PAGE
  } else if (pathName === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const prodCardHTML = dataObj.map((el) =>
      replaceTemplate(prodCardTemplate, el)
    );
    const output = overViewPage
      .toString()
      .replace("%PRODUCTCARD%", prodCardHTML.join(""));
    res.end(output);

    //PRODUCT PAGE
  } else if (pathName === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(productPage, product);
    res.end(output);
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
