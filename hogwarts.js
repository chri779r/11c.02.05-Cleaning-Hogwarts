"use strict";

window.addEventListener("DOMContentLoaded", beginSemester);

const allStudents = [];
const Student = {
  firstname: "",
  nickname: "",
  middlename: "",
  lastname: "",
  house: "",
};

function beginSemester() {
  console.log("Achio!");

  loadJSON();
}

function loadJSON() {
  fetch("https://petlatkea.dk/2021/hogwarts/students.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach((jsonObject) => {
    const studentCreate = Object.create(Student);

    const firstSpace = jsonObject.fullname.trim().indexOf(" ");
    const lastSpace = jsonObject.fullname.trim().lastIndexOf(" ");
    const firsteLetter = jsonObject.fullname.substring(0, 1);

    //Seperate names
    studentCreate.firstName = jsonObject.fullname.trim().substring(0, firstSpace);
    studentCreate.middleName = jsonObject.fullname.substring(firstSpace, lastSpace);

    if (studentCreate.middleName.includes('""')) {
      studentCreate.nickName = studentCreate.middleName;
      studentCreate.middleName = "";
    }

    studentCreate.lastName = jsonObject.fullname.trim().substring(lastSpace).trim();

    //UPPERCASElowercase
    studentCreate.firstNameCap = studentCreate.firstName.substring(0, 1).toUpperCase() + studentCreate.firstName.substring(1, firstSpace).toLowerCase();
    studentCreate.middleNameCap = studentCreate.middleName.substring(0, 1).toUpperCase() + studentCreate.middleName.substring(1, studentCreate.lenght).toLowerCase();
    studentCreate.lastNameCap = studentCreate.lastName.substring(0, 1).toUpperCase() + studentCreate.lastName.substring(1, studentCreate.lenght).toLowerCase();
    studentCreate.nickNameCap = studentCreate.middleName.substring(0, 1).toUpperCase() + studentCreate.middleName.substring(1, studentCreate.lenght).toLowerCase();

    //Genders
    studentCreate.gender = jsonObject.gender.substring(0).trim();
    studentCreate.genderCap = studentCreate.gender.substring(0, 1).toUpperCase() + studentCreate.gender.substring(1).toLowerCase();

    //House
    studentCreate.house = jsonObject.house.substring(0).trim();
    studentCreate.houseCap = studentCreate.house.substring(0, 1).toUpperCase() + studentCreate.house.substring(1).toLowerCase();

    //Push to prototype
    studentCreate.firstname = studentCreate.firstNameCap;
    studentCreate.middlename = studentCreate.middleNameCap;
    studentCreate.lastname = studentCreate.lastNameCap;
    studentCreate.nickname = studentCreate.nickNameCap;
    studentCreate.gender = studentCreate.genderCap;
    studentCreate.house = studentCreate.houseCap;

    allStudents.push(studentCreate);
    console.log(studentCreate);
  });

  showAllStudents();
}

function showAllStudents() {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  allStudents.forEach(cloneStudentData);
}

function cloneStudentData(student) {
  //create clone
  const clone = document.querySelector("template#student").content.cloneNode(true);
  // set clone data

  clone.querySelector("[data-field=firstname]").textContent = student.firstNameCap;
  clone.querySelector("[data-field=middlename]").textContent = student.middleNameCap;
  clone.querySelector("[data-field=lastname]").textContent = student.lastNameCap;
  clone.querySelector("[data-field=nickname]").textContent = student.nickNameCap;
  clone.querySelector("[data-field=gender]").textContent = student.genderCap;
  clone.querySelector("[data-field=house]").textContent = student.houseCap;
  clone.querySelector("img").src = `/images/${student.lastName}_${student.firstName.charAt(0)}.png`;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
