let inputToDoBox=document.querySelector(".addToDo");
console.log(inputToDoBox);

let inputToDo=document.querySelector(".todo");
console.log(inputToDo);

let addTodo=document.querySelector(".add");
console.log(addTodo);

let tasksDiv=document.querySelector("#tasks");
console.log(tasksDiv);
let deleteTasks,editTasks,tasks;
let updateNote="";
let count;
let ids=Object.keys(localStorage);
window.addEventListener("load",()=>{
    updateNote="";
    console.log(updateNote);
    let val=Object.keys(localStorage);
    console.log(val);
    count=Object.keys(localStorage).length;
    console.log(count);
    displayTasks();
})
function displayTasks(){

    count=Object.keys(localStorage).length;
    console.log(count);
    if(count){
        tasksDiv.style.display="block";
    }else{
        tasksDiv.style.display="none";
    }
    
    tasksDiv.innerHTML="";

    let eachtask=Object.keys(localStorage);
    eachtask=eachtask.sort();

    console.log(eachtask);

    eachtask.forEach(item=>{
      let value=localStorage.getItem(item);
      console.log(value);
      let eachtaskDiv=document.createElement("div");
      eachtaskDiv.classList.add("task");
      eachtaskDiv.setAttribute("id",item);
      eachtaskDiv.innerHTML=`<div id="taskName">${item.split("_")[1]}</div>`;//item=1_always do coding
       let iconsDiv=document.createElement("div");
       iconsDiv.setAttribute("class","icons");
      let editbutton=document.createElement("button");
      editbutton.classList.add("edit");
      editbutton.innerHTML=`<i class="fa-solid fa-pen-to-square"></i>`;
        if(!JSON.parse(value)){
            editbutton.style.visibility="visible";
      }else{
        editbutton.style.visibility="hidden";
        eachtaskDiv.classList.add("completed");
      }
     iconsDiv.appendChild(editbutton);
     
      let trashCan=document.createElement("button");
      trashCan.classList.add("trash");
      trashCan.innerHTML=`<i class="fa-solid fa-trash"></i>`;
      iconsDiv.appendChild(trashCan);
      eachtaskDiv.appendChild(iconsDiv);
      tasksDiv.appendChild(eachtaskDiv);
    });

    tasks=document.querySelectorAll(".task");
    console.log(tasks);
    tasks.forEach((item)=>{
      console.log(item);
      item.addEventListener("click",()=>{
      if(item.classList.contains("completed")){
        console.log(item);
        updateStorage(item.id.split("_")[0],item.innerText,false);
      }else{
        updateStorage(item.id.split("_")[0],item.innerText,true);
      }
    });
    });

    editTasks=document.querySelectorAll(".edit");
    console.log(editTasks);
    editTasks.forEach((item)=>{
      item.addEventListener("click",(e)=>{
        console.log("click");
        e.stopPropagation();
        disableButtons(true);
        let parent=item.parentElement;
        let parentdaddy=parent.parentElement;
        console.log(parent);
        inputToDo.value=parentdaddy.querySelector("#taskName").innerText;
        updateNote=parentdaddy.id;
        parent.remove();
      });
    });

    deleteTasks=document.querySelectorAll(".trash");
    console.log(deleteTasks);
    deleteTasks.forEach((item)=>{
      // console.log(item);
      // let parent = item.parentElement;
      //   console.log(parent);
      item.addEventListener("click",(e)=>{
        e.stopPropagation();
        let parent = item.parentElement;
        let parentdaddy=parent.parentElement;
        console.log(parent);
        removeTask(parentdaddy.id);
        parentdaddy.remove();
        count -= 1;
        console.log(count);
      });
    });
   
}

// localStorage.clear();
const disableButtons = (bool) => {
  let editButtons = document.querySelectorAll(".task");
  editButtons.forEach((element) => {
    element.disabled = bool;
  });
};
//Remove Task from local storage
const removeTask = (taskValue) => {
  localStorage.removeItem(taskValue);
  displayTasks();
};
//Add tasks to local storage
const updateStorage = (index, taskValue, completed) => {
  localStorage.setItem(`${index}_${taskValue}`, completed);
  displayTasks();
};

addTodo.addEventListener("click", () => {
  console.log(inputToDo.value);
  console.log(inputToDo.value.length);
  //Enable the edit button
  disableButtons(false);
  if (inputToDo.value.length == 0) {
    alert("Please Enter A Task");
  } else {
    //Store locally and display from local storage
    if (updateNote == "") {
      //new task
      updateStorage(count, inputToDo.value, false);
    } else {
      //update task
      let existingCount = updateNote.split("_")[0];
      removeTask(updateNote);
      updateStorage(existingCount, inputToDo.value, false);
      updateNote = "";
    }
    count += 1;
    inputToDo.value = "";
    console.log(count);
  }
});
