const AddNewTask = document.getElementById("AddNewTask");
const searchTask = document.getElementById("searchTask");
const FormnewTask = document.getElementById("FormnewTask");
const FormTaskSearch = document.getElementById("FormTaskSearch");
const loginform = document.getElementById("loginform");

function rediricionar(){
    window.location.href = "login.html"
}
loginform.addEventListener("click", rediricionar);
loginform.addEventListener("click", function() {
    const elementosParaRemover = [
        AddNewTask,
        searchTask,
        FormnewTask,
        FormTaskSearch
    ];
    elementosParaRemover.forEach(el => {
        el.classList.remove("active");
    });
    loginform.classList.add("active");
});
AddNewTask.addEventListener("click", function() {
    AddNewTask.classList.add("active");
    FormnewTask.classList.add("active");
    searchTask.classList.remove("active");
    FormTaskSearch.classList.remove("active");
    loginform.classList.remove("active");
});

searchTask.addEventListener("click", function() {
    searchTask.classList.add("active");
    FormTaskSearch.classList.add("active");
    FormnewTask.classList.remove("active");
    AddNewTask.classList.remove("active");
    loginform.classList.remove("active");
});

