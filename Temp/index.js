let employeesArr = [];
let id = 1;
let messageSection = document.getElementsByClassName("message-section")[0];

// -------for adding new user----------------------------
function addUser() {
  let inputs = document.getElementsByTagName("input");
  let name = inputs[0].value;
  let profession = inputs[1].value;
  let age = inputs[2].value;

  inputs[0].value="";
  inputs[1].value="";
  inputs[2].value="";
  // if()
  if (name && profession && age) {
    let ob = {
      id: id++,
      name: name,
      profession: profession,
      age: age,
    };
    employeesArr.push(ob);
    success();
    // console.log(employeesArr);
    updateEmployeeList();
  } else {
    failed();
  }
}

// -----if user doesnt fill all field, it will show error message---
function failed() {
  let message = document.createElement("p");
  message.innerText =
    "Error : Please Make sure All the fields are filled before adding in an employee !";
  message.className = "error";
  messageSection.innerHTML = "";
  messageSection.append(message);
  setTimeout(()=>{
    messageSection.innerHTML = "";
  },5000);

}

// ---if the employee data is successfully added !--------
function success() {
  let message = document.createElement("p");
  message.innerText = "Success : Employee Added!";
  message.className = "success";
  messageSection.innerHTML = "";
  messageSection.append(message);
  setTimeout(()=>{
    messageSection.innerHTML = "";
  },3000);

}

// ------for updating the listof Employees------------------
function updateEmployeeList() {
  let employees = document.getElementsByClassName("employees-info")[0];

  employees.innerHTML = "";
  employeesArr.forEach((employee) => {
    employees.innerHTML += `
       <div class="employee-details" id="user-${employee.id}">
        <section class="details">
        <span>${employee.id}.&nbsp;</span>
        <span >Name: ${employee.name}&nbsp;</span>
        <span>Profession: ${employee.profession}&nbsp;</span>
        <span>Age:${employee.age}&nbsp;</span>
    </section>
    <button class="delete-user" onclick="deleteUser(event)">Delete User</button>
    </div> 
        `;
  });
}

// ------------for deleting User-----------------------
function deleteUser(event) {
  let deleteBtn = event.target;
  let user = deleteBtn.parentElement;
  let userId = parseInt(user.id.split("-")[1]);
  // console.log(userId);
  user.remove();
  let removeIndex = -1;

  for (let i = 0; i < employeesArr.length; i++) {
    if (employeesArr[i].id === userId) {
      employeesArr.splice(i, 1);
      removeIndex = i;
      break;
    }
  }
  // console.log(removeIndex);

  //after removing we will update the id of all employee to maintain continuous sequence-----

  for (let i = removeIndex; i < employeesArr.length; i++) {
    employeesArr[i].id = i + 1;
  }

  id = employeesArr.length>0?(employeesArr[employeesArr.length - 1].id + 1):1;
  updateEmployeeList();
}
