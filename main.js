import './style.css'

class ProjectManager{
  constructor() {
    this.projects = [];
  }

  findProject(projectId) {
    return this.projects.find(project => project.id = projectId);
  }

  deleteProject(projectId) {
    return this.projects.filter(project => project.id !== projectId)
  }
}

class Project {
  constructor() {
    this.id = crypto.randomUUID();
    this.todos = [];
    this.isActive = true;
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
}