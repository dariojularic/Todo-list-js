import './style.css'

class ProjectManager{
  constructor() {
    this.projects = [];
  }

}

class Project {
  constructor() {
    this.todos = [];
    this.isActive = true
  } 
}

class Todo {
  constructor(text, dueDate) {
    this.text = text;
    this.id = crypto.randomUUID();
    this.checked = false;
    this.time = new Date();
    this.dueDate = dueDate;
  }
}