const apiUrl = 'https://app-de-tarefas-com-crud.onrender.com';

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

async function cadastrar() {
    const username = document.getElementById("nameFormRed").value.trim();
    const email = document.getElementById("emailFormRed").value.trim();
    const password = document.getElementById("passwordFormRed").value.trim();

    if (!username || !isValidEmail(email)) {
        alert("Preencha corretamente os campos.");
        return;
    }

    try {
        const res = await fetch(`${apiUrl}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }) 
        });

        const dados = await res.json();

        if (res.ok) {
            alert("Registro bem-sucedido!");
            window.location.href = "index.html";
        } else {
            alert(dados.msg || dados.error || "Erro no registro.");
        }
    } catch (err) {
        alert("Erro de conexão com o servidor.");
        console.error(err);
    }
}

async function login() {
    const username = document.getElementById("emailFormLog").value.trim(); 
    const password = document.getElementById("passwordFormLog").value.trim();

    try {
        const res = await fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const dados = await res.json();

        if (res.ok) {
            localStorage.setItem("token", dados.access_token);
            alert("Login bem-sucedido!");
            window.location.href = "index.html";
        } else {
            alert(dados.msg || dados.error || "Erro ao fazer login.");
        }
    } catch (err) {
        alert("Erro de conexão com o servidor.");
        console.error(err);
    }
}