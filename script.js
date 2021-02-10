"use strict";

document.addEventListener("DOMContentLoaded", listStudents);

async function listStudents() {
  console.log("start");

  let theStudents;
  let theFilter = "all";
  let popup = document.querySelector("#popup");

  let url = "https://petlatkea.dk/2020/hogwarts/students.json";
  let jsonData = await fetch(url);
  theStudents = await jsonData.json();
  console.log(theStudents);

  document.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", buttonClick);
  });

  showStudents();
  function showStudents() {
    console.log("showStudents");

    let dest = document.querySelector("#students");
    let temp = document.querySelector("#student_template");
    dest.innerHTML = "";

    theStudents.forEach((student) => {
      const firstSpace = student.fullname.indexOf(" ");
      const lastSpace = student.fullname.indexOf(" ");
      const firstName = student.fullname.substring(0, firstSpace).trim();
      //const nickName = student.fullname.substring(firstSpace, lastSpace).trim();
      const middleName = student.fullname.substring(firstSpace, lastSpace).trim();
      const lastName = student.fullname.substring(lastSpace).trim();
      const firstLetter = student.fullname.substring(0, 1);

      const split = new Set([firstName, middleName, lastName]);
      let nameSplit = Array.from(split);
      console.log(nameSplit);

      if (theFilter == "all" || theFilter == student.house) {
        //console.log(student);
        let clone = temp.cloneNode(true).content;
        clone.querySelector("h3").textContent = student.fullname;
        clone.querySelector("#house").textContent = student.house;
        clone.querySelector("#gender").textContent = student.gender;
        clone.querySelector("#photo").src = "images/" + lastName + "_" + firstLetter + ".png";
        clone.querySelector(".student").addEventListener("click", () => showDetails(student));
        dest.appendChild(clone);
      }
    });
  }

  function showDetails(student) {
    const firstSpace = student.fullname.indexOf(" ");
    const lastName = student.fullname.substring(firstSpace, 400).trim();
    const firstLetter = student.fullname.substring(0, 1);
    console.log(student);
    popup.style.display = "block";
    document.querySelector(".close").addEventListener("click", () => (popup.style.display = "none"));
    popup.querySelector("h3").textContent = student.fullname;
    popup.querySelector("#house").textContent = student.house;
    popup.querySelector("#gender").textContent = student.gender;
    popup.querySelector("#photo").src = "images/" + lastName + "_" + firstLetter + ".png";
  }

  function buttonClick() {
    //console.log("buttonClick");
    theFilter = this.dataset.student;
    //console.log(theFilter);
    document.querySelector(".section_header").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach((button) => {
      button.classList.remove("clicked");
    });
    this.classList.add("clicked");
    showStudents(theFilter);
  }
}
