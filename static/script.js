const socket = io();
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit("new_message", input.value);
        input.value = "";
    }
})

socket.on("message", (msg) => {
    let item = document.createElement("li");
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})

socket.on("all_messages", (msgArray) => {
    msgArray.forEach((msg) => {
        let item = document.createElement("li");
        item.textContent = msg.login + ": " + msg.content;
        messages.appendChild(item);
    })
    window.scrollTo(0, document.body.scrollHeight);
})
let countDark = 0;
let darkButton = document.querySelector(".darkButton").addEventListener("click", dark => {
    const header = document.querySelector(".header")
    const body = document.querySelector("body")
    const li = document.querySelectorAll("li")
    const input = document.getElementById("input")
    const submit = document.querySelector(".submit")
    const menu__box = document.querySelector(".menu__box")
    let DarkMode = document.querySelector(".darkButton")
    if(countDark == 0) {
        countDark++;
        document.querySelector(".darkButton").innerHTML = "Dark Mode";
        DarkMode.style.color = "white"
        DarkMode.style.background = "black"
        //darkMode
        header.style.background = "lightslategray";
        header.style.color = "white";
        body.style.background = "lightslategray"
        li.style.background = "black"


    } else {
        countDark = 0;
        document.querySelector(".darkButton").innerHTML = "Light Mode";
        DarkMode.style.color = "darkgray"
        DarkMode.style.background = "whitesmoke"
        //lightMode
        header.style.background = "whitesmoke"
        body.style.background = "white"
        header.style.color = "black";

    }

})