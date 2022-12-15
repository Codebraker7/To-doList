// window.localStorage.setItem("list_element", task_element);
// console.log(localStorage);

// var elements = [];
// window.onload = function(){
//     if(localStorage.getItem("to-doElements")==null){
//         elements = JSON.parse(localStorage.getItem("to-doElements"));
//         console.log(elements);
//     }
// }

window.addEventListener('load', function(){
    todos = JSON.parse(localStorage.getItem("todos")) || [];
})

window.addEventListener('load', function () {

    var todos = JSON.parse(localStorage.getItem("todos")) || [];

    const form = document.querySelector("#task-input");
    const input = document.querySelector("#Task-box");
    const list_element = document.querySelector("#tasks");

    form.addEventListener('submit', function (event) {
        event.preventDefault(); //Stops site from refreshing the page
        const Task = input.value;
        if (!Task) {
            alert("Please fill out the task");
            return;
        }

        const task_element = document.createElement("div");
        task_element.classList.add("task");

        const task_element_content = document.createElement("div");
        task_element_content.classList.add("content");
        task_element.appendChild(task_element_content);

        const task_input_element = document.createElement("input");
        task_input_element.classList.add("task-text");
        task_input_element.type = "text";
        task_input_element.value = Task;
        task_input_element.setAttribute("readonly", "readonly");
        task_element_content.appendChild(task_input_element);

        const task_actions_element = document.createElement("div");
        task_actions_element.classList.add("actions");

        const task_actions_edit_el = document.createElement("button");
        task_actions_edit_el.classList.add("edit");
        task_actions_edit_el.innerHTML = "Edit";

        const task_actions_delete_el = document.createElement("button");
        task_actions_delete_el.classList.add("delete");
        task_actions_delete_el.innerHTML = "Delete";

        task_actions_element.appendChild(task_actions_edit_el);
        task_actions_element.appendChild(task_actions_delete_el);
        task_element.appendChild(task_actions_element);

        const todo = {
            content: task_input_element,
            category: task_element_content,
            done: false
        }
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));

        list_element.appendChild(task_element);
        input.value = "";

        task_actions_edit_el.addEventListener("click", function () {
            if (task_actions_edit_el.innerHTML.toLowerCase() == "edit") {
                task_input_element.removeAttribute("readonly");
                task_input_element.focus(); //Puts cursor where we gotta edit
                task_actions_edit_el.innerText = "Save";
            }
            else {
                // console.log("Save");
                task_input_element.setAttribute("readonly", "readonly");
                task_actions_edit_el.innerHTML = "Edit";
            }
        });

        task_actions_delete_el.addEventListener("click", function () {
            list_element.removeChild(task_element);
        });

        // elements.push(task_input_element.value)
        // if(localStorage.getItem("to-doElements")==null){
        //     localStorage.setItem("to-doElements", JSON.stringify(elements));
        // } else{
        //     localStorage.setItem("to-doElements", JSON.stringify(elements));
        // }
        // console.log(localStorage.getItem("to-doElements"));
    });
});