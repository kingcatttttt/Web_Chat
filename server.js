const http = require("http");
const fs = require("fs");
const path = require("path");

const indexHtmlFile = fs.readFileSync(path.join(__dirname, "statick","index.html"))
const styleCssFile = fs.readFileSync(path.join(__dirname, "statick","style.css"))
const scriptJsFile = fs.readFileSync(path.join(__dirname, "statick","script.js"))
const server = http.createServer((req,res)=> {
    switch (req.url) {
    case "/": return res.end(indexHtmlFile)
    case "/style.css": return res.end(styleCssFile)   
    case "/script.js": return res.end(scriptJsFile)   
    }
    res.statusCode = 404;
    return res.end("eror 404")
});
server.listen(3000);