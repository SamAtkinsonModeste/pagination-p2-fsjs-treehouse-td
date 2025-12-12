/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
const students = data;
let currentStudents = students;
const studentsPerPage = 9;
const header = document.querySelector(".header-elements");
const studentPage = document.querySelector(".students-page");
const paginationBtnList = document.querySelector(".link-list");

/**
 * Displays a single page of students by inserting their details into the page container.
 *
 * Limits the number of students shown based on the students-per-page setting,
 * builds the HTML for each student, and appends it to the page.
 *
 * @param {Array} array - The full list of student data.
 * @param {number} page - The page number to display.
 */
function showPage(array, page) {
  const firstStudent = page * studentsPerPage - studentsPerPage;
  const lastStudent = page * studentsPerPage - 1;
  studentPage.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    if (i >= firstStudent && i <= lastStudent) {
      const student = `<div class="col-12 col-sm-6 col-lg-4">
       <div class="student-wrap">
      <div class="student-container silver-border mx-auto my-auto">
          <div class="student d-flex flex-column justify-content-center align-items-center">
                <div class="student-avatar">
                  <img class="round" src="${array[i].picture.large}">
                </div>
                <div class="student-name">
                <h3>${array[i].name.first} ${array[i].name.last}</h3>
                </div>
                <div class="student-details">
                <span class="student-email">${array[i].email}</span>
                <div class="student-joined">
                 <span class="student-join-date">Joined ${array[i].registered.date}</span>
                </div>
                </div>
          </div>
        </div>
        </div>
       </div>`;
      studentPage.insertAdjacentHTML("beforeend", student);
    }
  }
}

/**
 * Builds the pagination controls for the student list and handles button interaction.
 *
 * This function calculates how many pagination buttons are needed based on the
 * length of the given data array. It clears any existing buttons, generates new
 * page number buttons, applies the initial active state, and sets up the click
 * handler so that selecting a button updates the active state and displays the
 * correct page of students.
 *
 * @param {Array} array - The full list of student data used to determine pagination.
 */
function paginationControl(array) {
  const btnsNeeded = Math.ceil(array.length / studentsPerPage);
  paginationBtnList.innerHTML = "";
  for (let i = 1; i <= btnsNeeded; i++) {
    let pageBtn = `<li class="mx-2 p-1"><button type="button">${i}</button>`;
    paginationBtnList.insertAdjacentHTML("beforeend", pageBtn);
  }
  paginationBtnList.querySelector("button").classList.add("active");
}

/**
 * Handles pagination button clicks using event delegation.
 *
 * - Highlights the active pagination button
 * - Uses currentStudents to load the correct page of results
 * - Ensures only one active button is visible at a time
 */
const paginationBtnClicked = () => {
  paginationBtnList.addEventListener("click", (evt) => {
    const activeBtn = paginationBtnList.querySelector(".active");
    const btnClicked = evt.target.closest("button");
    if (activeBtn && btnClicked) {
      activeBtn.classList.remove("active");
    }
    if (btnClicked) {
      btnClicked.classList.add("active");
      showPage(currentStudents, btnClicked.innerHTML);
    }
  });
};

//NOTE - Dynamic Search Input attached to Header element
const searchElements = ` <div class="input-container input-height position-relative" role="search" aria-label="Student directory search">
        <input class="input-height full-width" type="text" name="search" id="student-search">
        <label class="up-label" for="student-search">Search by name...</label>
        <span class="search-icon"><img src="img/icn-search.svg" alt="" aria-hidden="true"></span>
      </div>`;
header.insertAdjacentHTML("beforeend", searchElements);

/**
 * Filters the full student list based on user input
 * and updates the page and pagination with the results.
 *
 * - Reads the current value of the search input
 * - Filters the full students array by first name
 * - Updates currentStudents to the filtered result
 * - Shows page 1 of results or a “not found” message
 * - Rebuilds pagination for the filtered list
 */
const findStudent = () => {
  const inputValue = searchInput.value.toLowerCase();
  const studentFound = students.filter((student) => {
    let studentName = student.name.first.toLowerCase();
    return studentName.includes(inputValue);
  });
  currentStudents = studentFound;
  if (currentStudents.length > 0) {
    showPage(currentStudents, 1);
    paginationControl(currentStudents);
  } else {
    studentPage.innerHTML = ` <div class="student-not-found silver-border mx-auto my-5 p-3">
    <h3 class="text-center">Student Not Found</h3>
    <p  class="text-center">Please check you have typed the correct name.</p>
    <p  class="text-center">If the name is correct the student is no longer a student at <span class="uniName">LT University</span>.</p>
    </div>`;
    paginationBtnList.innerHTML = "";
  }
};
//NOTE - FUNCTION CALL STACK
showPage(currentStudents, 1);
paginationControl(currentStudents);
paginationBtnClicked();

//NOTE - SEARCH FUNCTIONALITY
const searchInput = document.querySelector("#student-search");
searchInput.addEventListener("input", findStudent);
