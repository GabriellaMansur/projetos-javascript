const tasks = document.querySelectorAll(".tasks li");
let draggedTask = null;

for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    task.addEventListener("dragstart", function (event) {
        draggedTask = task;
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/html", task.innerHTML);
        task.classList.add("dragging");
    });

    task.addEventListener("dragend", function() {
        draggedTask.classList.remove("dragging");
        draggedTask = null;
    });
}

const columns = document.querySelectorAll(".tasks");