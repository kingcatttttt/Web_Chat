const http = require("http");
const fs = require("fs");
const path = require("path");
const db = require("./database");

const indexHtmlFile = fs.readFileSync(path.join(__dirname, "static", "index.html"));
const styleCssFile = fs.readFileSync(path.join(__dirname, "static", "style.css"));
const scriptJSFile = fs.readFileSync(path.join(__dirname, "static", "script.js"));
const registerHtmlFile = fs.readFileSync(path.join(__dirname, "static", "register.html"));
const authJSFile = fs.readFileSync(path.join(__dirname, "static", "auth.js"));

const server = http.createServer((req, res) => {
    if (req.method == "GET") {
        switch (req.url) {
            case "/": return res.end(indexHtmlFile);
            case "/style.css": return res.end(styleCssFile);
            case "/script.js": return res.end(scriptJSFile);
            case "/register": return res.end(registerHtmlFile);
            case "/auth.js": return res.end(authJSFile);
        }
    }

    if (req.method == "POST") {
        switch (req.url) {
            case "/api/register": return registerUser(req, res);
        }
    }

    res.statusCode = 404;
    return res.end("Error 404");
});

function registerUser(req, res) {
    let data = "";
    req.on("data", (chunk) => {
        data += chunk;
    })
    req.on("end", async () => {
        try {
            const user = JSON.parse(data);
            if (!user.login || !user.password) {
                return res.end("Empty login or password");
            }
            if (await db.isUserExist(user.login)) {
                return res.end("User already exist");
            } 
            await db.addUser(user);
            return res.end("Register is successful");
        } catch (error) {
            return res.end("Error: " + error);
        }
    })
}

server.listen(3000);

const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", async (socket) => {
    console.log("a user connected. id - " + socket.id);

    let username = "admin";
    let messages = await db.getMessages();

    socket.on("new_message", (msg) => {
        db.addMessage(msg, 1);
        io.emit("message", username + ": " + msg);
    });

    socket.emit("all_messages", messages);
})