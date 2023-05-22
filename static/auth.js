const registerForm = document.getElementById("register-form");

registerForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const { login, password, passwordRepeat } = registerForm;

    if (password.value != passwordRepeat.value) {
        return alert("Passwords not match");
    }

    const user = JSON.stringify({
        login: login.value,
        password: password.value
    });

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "api/register");
    xhr.send(user);
    xhr.onload = function () {
        alert(xhr.response)
        if (xhr.response == "Register is successful") {
            window.open("/login", "_self");
        }
    }
})