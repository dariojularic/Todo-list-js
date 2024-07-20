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

  // set activeProject

  addProject(project) {
    this.projects.push(project)
  }

  findActiveProject() {
    return this.projects.find(project => project.isActive === true);
  }

  deleteProject(projectId) {
    return this.projects.filter(project => project.id !== projectId)
  }
}

class Project {
  constructor(name) {
    this.name = name
    this.id = crypto.randomUUID();
    this.todos = [];
    this.isActive = true;
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  findTodo(todoId) {
    return this.todos.find(todo => todo.id === todoId);
  }

  activateProject() {
    this.isActive = true
  }

  deactivateProject() {
    this.isActive = false
  }

  deleteTodo(todoId) {
    return this.todos.filter(todo => todo.id !== todoId)
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

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!projectFormInput.value) return
  if (projectManager.findActiveProject() !== undefined) {
    const activateProject = projectManager.findActiveProject()
    activateProject.deactivateProject()
  }
  const newProject = new Project(projectFormInputValue);
  clearProjectFormInput()
  projectManager.addProject(newProject);
  console.log(projectManager.projects)
})

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!todoTextFormInput.value || !dueDateInput.value) return
  if (projectManager.findActiveProject() !== undefined) {
    const activateProject = projectManager.findActiveProject()
    activateProject.deactivateProject()
  }
  
  const activeProject = projectManager.findActiveProject();
  const todo = new Todo(todoTextFormInputValue, dueDateInputValue)
  activeProject.addTodo(todo)
  console.log(activeProject)
  clearTodoFormInput()
})