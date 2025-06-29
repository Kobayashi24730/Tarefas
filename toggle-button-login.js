const register = document.getElementById("register");
const login = document.getElementById("login");
const redregister = document.getElementById("redregister");
const redlogin = document.getElementById("redlogin");

redregister.addEventListener("click", function(){
    login.classList.remove("active");
    register.classList.add("active");
});
redlogin.addEventListener("click", function(){
    login.classList.add("active");
    register.classList.remove("active");
});
