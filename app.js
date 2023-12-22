
const bottom = document.querySelector(".bottom");
const input = document.querySelector('#input');
const form = document.querySelector('form');
const updateInput = document.querySelector('#update-input');
const updateForm = document.querySelector('.update-form');
const closeUpdate = document.querySelector("#close-update");

let theme = "light";

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
  });

let formValidation = () => {
    if (input.value === "") {
      alert("field is empty"); 
    } else {
      acceptData();
      input.value = '';
    }
  };

let data = [];

let acceptData = () =>{
  data.push(input.value);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);

  createTask();
};

let createTask = () =>{
  bottom.innerHTML = "";
  if(theme === "light"){
    data.map((element,index)=>{
      return(bottom.innerHTML +=`
      <div id=${index} class="bubble" draggable="true">
      <div class="task-name">${element}</div>
      <button onClick ="editTask(this)">Edit</button>
      <button onClick ="deleteTask(this);createTask()">Delete</button>
      </div>
      `
        
        );
    });
  }else{
    data.map((element,index)=>{
      return(bottom.innerHTML +=`
      <div id=${index} class="bubble dark-3" draggable="true">
      <div class="task-name">${element}</div>
      <button class="dark-4" onClick ="editTask(this)">Edit</button>
      <button class="dark-4" onClick ="deleteTask(this);createTask()">Delete</button>
      </div>
      `
        
        );
    });
  }
  
};

let deleteTask = (e) =>{
  e.parentElement.remove();
  data.splice(e.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
};

let edited = undefined;
let editTask = (e) =>{
  updateForm.classList.remove('hide');
  updateInput.value = e.parentElement.children[0].innerHTML;
  edited = e.parentElement.id; 
  console.log(edited);
  //deleteTask(e);
};


updateForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  updateFormValidation();
});

let updateFormValidation = () => {
  if (updateInput.value === "") {
    alert("field is empty"); 
  } else {
    acceptUpdatedData();
  }
};

let acceptUpdatedData = () =>{
  data.splice(edited,1,updateInput.value);
  //data.push(updateInput.value);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  createTask();
  updateForm.classList.add('hide');
};



let closeUpdateWindow = () =>{
  updateForm.classList.add('hide');
};

closeUpdate.addEventListener("click",closeUpdateWindow);



(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
  createTask();
})();




////////////DARK MODE STUFF/////////////////////
const darkModeBtn = document.querySelector("#dark-btn");
const body = document.querySelector('body');
const header = document.querySelector('.title');
const darkContainer = document.querySelector('.dark-container');
const appContainer = document.querySelector('.app-container');
const topBox = document.querySelector('.top');
const buttons = document.querySelectorAll('button');
const bottomDivs = document.querySelectorAll('.bubble');
const buttonMsg = document.querySelector('#btn-message');


let darkMode = () =>{
 body.classList.toggle("dark");
 header.classList.toggle("dark-2");
 darkContainer.classList.toggle("dark-3");
 appContainer.classList.toggle("dark-2");
 topBox.classList.toggle('dark-3');
 input.classList.toggle('dark-4');
 input.classList.toggle("dark-text");
 updateInput.classList.toggle('dark-4');
 updateInput.classList.toggle("dark-text");

 buttons.forEach((button)=> 
  button.classList.toggle('dark-4'));
 
  bottomDivs.forEach((div)=>
  div.classList.toggle('dark-3'));

 updateForm.classList.toggle("dark-5");

 if(theme === "light"){
  theme = "dark";
  darkModeBtn.innerHTML = "Back to light mode!";
  buttonMsg.innerHTML = "Tired of the Darkness?"
 }else{
  theme = "light";
  darkModeBtn.innerHTML = "Try dark mode!";
  buttonMsg.innerHTML = "Don't like all the colors?";

 };
 localStorage.setItem("theme", theme);
 console.log(theme);
 createTask();
};

const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  darkMode();
}


darkModeBtn.addEventListener("click",darkMode);