const registerForm = document.querySelector(".register-form");

registerForm?.addEventListener("sumbit",(e) => {
    e.preventDefault();
    const {login,password,passwordRepeat} = registerForm;

    if(password.value != passwordRepeat.value) {
        return alert("Ban")
    }
    const user = JSON.stringify({
        login: login.value,
        password: password.value
    });
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "api/register");
    xhr.send(user)
    alert(xhr.response)
    if(xhr.response == "!ban") {
        window.open("/login","self");
    }
})