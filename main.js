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

let todoTextFormInputValue = "";
let projectFormInputValue = "";
let dueDateInputValue = "";

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
    // this.isActive = true;
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  findTodo(todoId) {
    return this.todos.find(todo => todo.id === todoId);
  }

  // activateProject() {
  //   this.isActive = true
  // }

  // deactivateProject() {
  //   this.isActive = false
  // }

  deleteTodo(todoId) {
    return this.todos.filter(todo => todo.id !== todoId)
  }

  renderTodos() {
    todosList.innerHTML = "";
    this.todos.forEach(todo => {
      const html = `<li class="todo-list-item" data-id="${todo.id}">
                      <p class="todo-list-item-paragraph"><span class="todo-item-number">${this.todos.indexOf(todo) + 1}</span> <span class="todo-item-text">${todo.text}</span> <span class="item-due-date"> Due Date: ${todo.dueDate}</span></p>
                    </li>`;
      todosList.insertAdjacentHTML("beforeend", html)
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
  }

  editTodo(text, dueDate) {
    this.text = text
    this.dueDate = dueDate
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

// provjerit ima li aktivni projekt. 
// ako ima, deaktivirat ga i napravit novi. 
// ako nema, napravit novi

// projectForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   if (!projectFormInput.value) return
//   if (projectManager.findActiveProject() !== undefined) {
//     const activateProject = projectManager.findActiveProject()
//     activateProject.deactivateProject()
//   }
//   const newProject = new Project(projectFormInputValue);
//   clearProjectFormInput()
//   projectManager.addProject(newProject);
//   console.log(projectManager.projects)
//   projectManager.renderProjects();
// })

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!projectFormInput.value) return
  const newProject = new Project(projectFormInputValue);
  projectManager.setActiveProject(newProject);
  clearProjectFormInput();
  projectManager.addProject(newProject);
  projectManager.renderProjects();
  projectsList.querySelector(`.item-${projectManager.getActiveProject().id}`).classList.add("selected");
})

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!todoTextFormInput.value || !dueDateInput.value || !projectManager.getActiveProject()) return // treba ubacit toastify
  const todo = new Todo(todoTextFormInputValue, dueDateInputValue);
  projectManager.getActiveProject().addTodo(todo);
  clearTodoFormInput();
  projectManager.getActiveProject().renderTodos();
})

projectsList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-project-btn")) {
    projectManager.deleteProject(event.target.closest("li").getAttribute("data-id"));
    projectManager.renderProjects();
    if (!projectManager.getProjects()[0]) {
      // ovo treba provjerit
      todosList.innerHTML = "";
      return
    }
    projectManager.setActiveProject(projectManager.getProjects()[0]);
    projectManager.getActiveProject().renderTodos();
    console.log(projectManager.getActiveProject())
    projectsList.querySelector(`.item-${projectManager.getActiveProject().id}`).classList.add("selected")
    // projectsList.querySelector(`.item-${projectManager.getActiveProject().id}`).classList.add("selected");
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