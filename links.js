const apiUrl = 'https://app-de-tarefas-com-crud.onrender.com/tasks';
const apiUrl2 = 'https://app-de-tarefas-com-crud.onrender.com/complete';
//🗑️ ✅ `${apiUrl2}/${}`

// Carrega todas as tarefas
async function loadTasks() {
    const res = await fetch(apiUrl);
    const tasks = await res.json();
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        if (task.complete) li.classList.add("complete");
        if (task.done) li.classList.add("done");
        

        const span = document.createElement("span");
        span.className = task.done ? "done" : "";
        span.textContent = task.title;
        span.onclick = () => togglebutton(task.id, !task.done);

        // Botão de editar
        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        editBtn.onclick = () => {
            const input = document.createElement("input");
            input.value = task.title;

            input.onblur = async () => {
                const newTitle = input.value.trim();
                if (newTitle && newTitle !== task.title) {
                    await fetch(`${apiUrl}/${task.id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ title: newTitle })
                    });
                    loadTasks();
                } else {
                    li.replaceChild(span, input); // Volta ao original se nada for alterado
                }
            };

            li.replaceChild(input, span);
            input.focus();
        };

        // Botão de deletar
        const delBtn = document.createElement("button");
        delBtn.textContent = "🗑️";
        delBtn.onclick = (e) => {
            e.stopPropagation();
            deleteTask(task.id);
        };

        // Botão de completar
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "✅";
        completeBtn.onclick = (e) => {
            e.stopPropagation();
            completeTask(task.id, !task.complete);
        };

        // Agrupa botões
        const actions = document.createElement("div");
        actions.className = "task-actions";
        actions.appendChild(editBtn);
        actions.appendChild(delBtn);
        actions.appendChild(completeBtn);

        li.appendChild(span);
        li.appendChild(actions);
        list.appendChild(li);
        
        showCounter(tasks)
    });
}

// Adiciona nova tarefa
async function addTask() {
    const title = document.getElementById("taskInput").value.trim();
    if (!title) return;

    await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    });
    
    document.getElementById("taskInput").value = "";
    loadTasks();
}

// Atualiza status done
async function togglebutton(id, done) {
    await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done })
    });

    loadTasks();
}

// Deleta tarefa
async function deleteTask(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}

// Marca como completa
async function completeTask(id, complete) {
    await fetch(`${apiUrl2}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complete })
    });

    loadTasks();
}

// Busca por título
async function searchTasks() {
    const search = document.getElementById("searchInput").value.trim();
    const NoResults = document.getElementById("NoResultsMessage");
    if (!search){
        NoResults.style.display = "none";
        loadTasks();
        return;
    }    
    const response = await fetch(`${apiUrl}/search?q=${encodeURIComponent(search)}`);
    const tasks = await response.json();
    if (tasks.length === 0){
        NoResults.style.display = "block";
    }else{
        NoResults.style.display = "none";
    }
    renderTaskList(tasks);
}
function clearSearch(){
    document.getElementById("searchInput").value = "";
    document.getElementById("NoResultsMessage").style.display = "none";
    loadTasks();
}
// Re-renderiza a lista
function renderTaskList(tasks) {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        if (task.complete) li.classList.add("complete");
        if (task.done) li.classList.add("done");

        li.textContent = task.title;

        const delbtn = document.createElement("button");
        delbtn.textContent = "🗑️";
        delbtn.onclick = (e) => {
            e.stopPropagation();
            deleteTask(task.id);
        };

        const completebtn = document.createElement("button");
        completebtn.textContent = "✅";
        completebtn.onclick = (e) => {
            e.stopPropagation();
            completeTask(task.id, !task.complete);
        };

        const actions = document.createElement("div");
        actions.className = "task-actions";
        actions.appendChild(delbtn);
        actions.appendChild(completebtn);

        li.appendChild(actions);
        list.appendChild(li);
    });
}
// counter-tarefas
function showCounter(tasks){
    const total = tasks.length;
    const completa = tasks.filter(t => t.complete).length;
    const pendentes = total - completa;
    document.getElementById("counter").textContent = `Total: ${total} | Completas: ${completa} | Pendentes ${pendentes}`;
}

// Carrega as tarefas na inicialização
loadTasks();