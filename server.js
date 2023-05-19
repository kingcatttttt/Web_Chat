const http = require("http");
const fs = require("fs");
const path = require("path");
const db = require("./database");


const indexHtmlFile = fs.readFileSync(path.join(__dirname, "static", "index.html"));
const styleCssFile = fs.readFileSync(path.join(__dirname, "static", "style.css"));
const scriptJSFile = fs.readFileSync(path.join(__dirname, "static", "script.js"));
const regHtmlFile = fs.readFileSync(path.join(__dirname, "static", "reg.html"));
const authJSlFile = fs.readFileSync(path.join(__dirname, "static", "auth.js"));
const server = http.createServer((req, res) => {
    if(req.url == "GET"){
        switch (req.url) {
            case "/reg.": return res.end(regHtmlFile);
            case "/": return res.end(indexHtmlFile);
            case "/style.css": return res.end(styleCssFile);
            case "/script.js": return res.end(scriptJSFile);
            case "/auth.js": return res.end(authJSlFile);
        }    
    }
    if(req.url == "POST") {
        case "/api/register": return registerUser(req, res);
    }
    res.statusCode = 404;
    return res.end("Error 404");
});

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
function registerUser() {
    let data = "";
    req.on("data", (chunk) => {
        data += chunk;
    })
    req.on("end", async() => {
        try {
            const user = JSON.parse(data);
            if(!user.login || !user.password) {
                return res.end("Empty")
            }
            if(await db.isUserExsist) {
                return res.end("!ban")
            } await db.addUser(user);
            return res.end(201, "good")
        } catch(error) {
            return res.end("error" + e);

        },
        isUserExsist: async(login) => {
            const candidate = await db.all("SELECT * FROM  uset WHERE login = ?",[login]);
            return candidate.lenght
        },
        addUser: async (user) => {
            "INSERT INTO user (login, password) VALUES(?,?)",[user.login, user.login]
        }
    })
}