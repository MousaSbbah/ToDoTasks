'use strict';

function Task (todo,time) {

  this.todo = todo;
  this.time=time;
  allTasks.push(this);
}
let allTasks=[];

let form = document.getElementById('form');
form.addEventListener('submit',addNewTask);

function addNewTask (event){
  event.preventDefault();
  let todo = event.target.toDo.value;
  let time = event.target.time.value;
  new Task (todo,time);
  saveInLocal();
  renderList();
}







// Render Functions

function renderList (){
  let mainList = document.getElementById('main_list');
  mainList.innerHTML='';
  for (let i = 0; i < allTasks.length; i++) {
    let taskElement = document.createElement('li');
    mainList.appendChild(taskElement);
    let taskName = document.createElement('div');
    taskName.innerHTML= allTasks[i].todo;
    taskElement.appendChild(taskName);
    let taskTime = document.createElement('div');
    taskTime.textContent= allTasks[i].time;
    taskElement.appendChild(taskTime);
    let xElement = document.createElement('div');
    xElement.textContent= 'X';
    taskElement.appendChild(xElement);
    xElement.setAttribute('onClick',`removeItem(${i})`);

  }
}

function saveInLocal(){
  let data = JSON.stringify(allTasks);
  localStorage.setItem('Tasks',data);
}

function removeItem(num){
  allTasks.splice(num,1);
  renderList();
  saveInLocal();
}

function getFromLocal(){
  let data = localStorage.getItem('Tasks');
  if(data){
    allTasks=JSON.parse(data);
  }
}


// Render Area

getFromLocal();
renderList();