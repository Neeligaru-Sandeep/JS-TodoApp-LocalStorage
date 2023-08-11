window.addEventListener("load",()=>{ 
    displayTodos();
})

let uname = document.getElementById("name");
let userName = localStorage.getItem("userName")||"";
uname.value = userName;
uname.addEventListener("change",(e)=>{
    localStorage.setItem("userName",e.target.value);
});

todos = JSON.parse(localStorage.getItem("todos"))||[];
let form = document.getElementById("todo-form");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const todo = {
        content:e.target.elements.content.value 
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
    e.target.reset()
    displayTodos();
});


function displayTodos(){
    let todo_list = document.getElementById("todo-list");
    todo_list.innerText = "";
    todos.forEach((todo)=>{
        let div = document.createElement("div");
        let actions = document.createElement("div");
        let del = document.createElement("button");
        let edit = document.createElement("button");
            del.innerText = "Delete";
            edit.innerText = "Edit";
        div.innerHTML = `<input type="text" value="${todo.content}" readonly>` 
        div.classList.add("todo-info");
        edit.classList.add("edit_action");
        del.classList.add("del_action");
        actions.appendChild(del);
        actions.appendChild(edit);
        actions.classList.add("actions");
        div.appendChild(actions)       
        todo_list.appendChild(div);



        del.addEventListener("click",(e)=>{
            todos = todos.filter(t=>t != todo)
            localStorage.setItem("todos",JSON.stringify(todos))
            displayTodos();
        });
        

        edit.addEventListener('click', (e) => {
			const input = div.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {	
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				displayTodos()

			})
		})
    })   
}



