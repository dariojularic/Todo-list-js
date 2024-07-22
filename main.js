import './style.css'

const projectsList = document.querySelector(".projects-list");
const todosList = document.querySelector(".todos-list");
const newProjectBtn = document.querySelector(".new-project-btn");
const newTodoBtn = document.querySelector(".new-todo-btn");
const projectForm = document.querySelector(".new-project-form");
const todoForm = document.querySelector(".new-todo-form");
const projectFormInput = document.querySelector(".project-form-input");
const todoTextFormInput = document.querySelector(".todo-text-form-input");
const dueDateInput = document.querySelector(".due-date-input");
const overlay = document.querySelector(".overlay");

let todoTextFormInputValue = "";
let projectFormInputValue = "";
let dueDateInputValue = "";

const heading = document.querySelector("h1")
console.log(heading)
heading.remove()


projectFormInput.addEventListener("input", () => projectFormInputValue = projectFormInput.value);
todoTextFormInput.addEventListener("input", () => todoTextFormInputValue = todoTextFormInput.value);
dueDateInput.addEventListener("input", () => dueDateInputValue = dueDateInput.value)


class ProjectManager{
  constructor() {
    this.projects = [];
    this.activeProject = null
  }

  getProjects() {
    return this.projects
  }

  getActiveProject() {
    return this.activeProject
  }

  setActiveProject(project) {
    this.activeProject = project
  }

  addProject(project) {
    this.projects.push(project)
  }

  findProject(projectId) {
    return this.projects.find(project => project.id === projectId);
  }

  deleteProject(projectId) {
    return this.projects = this.projects.filter(project => project.id !== projectId)
  }

  renderProjects() {
    projectsList.innerHTML = "";
    this.projects.forEach(project => {
      const html = `<li class="project-list-item item-${project.id}" data-id="${project.id}">
                      <p class="project-list-item-paragraph">${project.name} <i class="fa-regular fa-circle-xmark delete-project-btn"></i></p>
                    </li>`;
      projectsList.insertAdjacentHTML("beforeend", html);
    })
  }
}

class Project {
  constructor(name) {
    this.name = name
    this.id = crypto.randomUUID();
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  findTodo(todoId) {
    return this.todos.find(todo => todo.id === todoId);
  }

  deleteTodo(todoId) {
    return this.todos = this.todos.filter(todo => todo.id !== todoId)
  }

  // na klik gumba delete obrisat todo i ponovo renderat
  // na klik gumba edit prikazat formu sa ispunjenim poljima toga todo itema

  // zakacis id na li elemente u todo listi
  // kad kliknes na edit, procitas id sa li elementa
  // odradis logiku isEditing i onda innerhtml samo tog elementa postavis da je forma i onda submit

  // umjesto delete
  renderTodos() {
    todosList.innerHTML = "";
    this.todos.forEach(todo => {
      const form = `<li class="edit-todo-list-item">
                      <form class="edit-form">
                        <input class="edit-form-text-input" type="text">
                        <input class="edit-form-date-input" type="date">
                        <button class="edit-form-submit-btn">Submit</button>
                      </form>
                    </li>`
      const paragraph = `<li class="todo-list-item" id="${todo.id}" data-id="${todo.id}">
                      <p class="todo-list-item-paragraph"><span class="todo-item-number">${this.todos.indexOf(todo) + 1}</span> <span class="todo-item-text">${todo.text}</span> <span class="item-due-date"> Due Date: ${todo.dueDate}</span> <button class="delete-todo-btn">Delete</button> <button class="edit-todo-btn">Edit</button> <input class="checkbox" type="checkbox" ${todo.checked ? "checked" : ""}> </p>
                    </li>`;
      todosList.insertAdjacentHTML("beforeend", `${todo.isEditing ? form : paragraph}`)
    })
  }
}

class Todo {
  constructor(text, dueDate) {
    this.text = text;
    this.dueDate = dueDate;
    this.id = crypto.randomUUID();
    this.checked = false;
    this.time = new Date();
    this.isEditing = false
  }

  // is editing = false kad se
  // kad se klikne na edit, is editing = true
  // u funkciju render todos provjerit ima li koji todo da mu je editing true
  // ako mu je editing true ne renderujes todo koji sad prikazujes, nego formu
  // inputi forme ce bit popunjeni vrijednostima todoa koji se edituje
  // na submit vratim editing na false i za trenutni todo kome je editing true update novim vrijednostima
  // render todos, svi su false i standardno radi

  // provjerit
  editTodo(text, dueDate) {
    this.text = text
    this.dueDate = dueDate
  }

  setIsEditingToTrue() {
    this.isEditing = true;
  }

  setIsEditingToFalse() {
    this.isEditing = false;
  }

  toggleChecked() {
    this.checked = !this.checked
  }

  getTodosText() {
    return this.text
  }

  getTodosDueDate() {
    return this.dueDate
  }

  getTodosTime() {
    return this.time
  }
}

function clearProjectFormInput() {
  projectFormInput.value = "";
}

function clearTodoFormInput() {
  todoTextFormInput.value = "";
  dueDateInput.value = "";
}

const projectManager = new ProjectManager();

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!projectFormInput.value) return
  const newProject = new Project(projectFormInputValue);
  projectManager.setActiveProject(newProject);
  clearProjectFormInput();
  projectManager.addProject(newProject);
  projectManager.renderProjects();
  projectsList.querySelector(`.item-${projectManager.getActiveProject().id}`).classList.add("selected");
  projectForm.style.visibility = "hidden";
  overlay.style.visibility = "hidden";
})

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!todoTextFormInput.value || !dueDateInput.value || !projectManager.getActiveProject()) return // treba ubacit toastify
  const todo = new Todo(todoTextFormInputValue, dueDateInputValue);
  projectManager.getActiveProject().addTodo(todo);
  clearTodoFormInput();
  projectManager.getActiveProject().renderTodos();
  overlay.style.visibility = "hidden";
  todoForm.style.visibility = "hidden";
})

projectsList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-project-btn")) {
    projectManager.deleteProject(event.target.closest("li").getAttribute("data-id"));
    projectManager.renderProjects();
    if (!projectManager.getProjects()[0]) {
      todosList.innerHTML = "";
      return
    }
    projectManager.setActiveProject(projectManager.getProjects()[0]);
    projectManager.getActiveProject().renderTodos();
    console.log(projectManager.getActiveProject())
    projectsList.querySelector(`.item-${projectManager.getActiveProject().id}`).classList.add("selected")
    return
  }

  if (event.target.closest("li").classList.contains("project-list-item")) {
    projectsList.querySelector(".selected").classList.remove("selected")
    event.target.closest("li").classList.add("selected");

    const selectedProject = projectManager.findProject(event.target.closest("li").getAttribute("data-id"));
    projectManager.setActiveProject(selectedProject);
    projectManager.getActiveProject().renderTodos();
  }
})

todosList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-todo-btn") || event.target.classList.contains("edit-todo-btn") || event.target.classList.contains("checkbox")) {
    const currentListItem = event.target.closest("li")

    if (event.target.classList.contains("delete-todo-btn")) {
      projectManager.getActiveProject().deleteTodo(currentListItem.getAttribute("data-id"));
      // projectManager.getActiveProject().renderTodos()
      currentListItem.remove()
    }

    if (event.target.classList.contains("checkbox")) {
      projectManager.getActiveProject().findTodo(currentListItem.getAttribute("data-id")).toggleChecked()
    }

    // edit todo
    // u zavrit css za edit formu
    if (event.target.classList.contains("edit-todo-btn")) {
      projectManager.getActiveProject().findTodo(currentListItem.getAttribute("data-id")).setIsEditingToTrue();
      projectManager.getActiveProject().renderTodos()
    }
  }
})

newProjectBtn.addEventListener("click", () => {
  projectForm.style.visibility = "visible";
  overlay.style.visibility = "visible";
  projectFormInput.focus();
})

newTodoBtn.addEventListener("click", () => {
  todoForm.style.visibility = "visible";
  overlay.style.visibility = "visible";
  todoTextFormInput.focus();
})

overlay.addEventListener("click", () => {
  overlay.style.visibility = "hidden";
  todoForm.style.visibility = "hidden";
  projectForm.style.visibility = "hidden";
  overlay.style.visibility = "hidden";
})
