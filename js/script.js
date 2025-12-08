/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
const students = data;
const studentsPerPage = 9;
/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

console.log(students);

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

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
  const paginationBtnList = document.querySelector(".link-list");
  paginationBtnList.innerHTML = "";

  for (let i = 1; i <= btnsNeeded; i++) {
    let pageBtn = `<li class="mx-2 p-1"><button type="button">${i}</button>`;
    paginationBtnList.insertAdjacentHTML("beforeend", pageBtn);
  }

  paginationBtnList.querySelector("button").classList.add("active");

  paginationBtnList.addEventListener("click", (evt) => {
    const activeBtn = paginationBtnList.querySelector(".active");
    const btnClicked = evt.target.closest("button");

    if (activeBtn && btnClicked) {
      activeBtn.classList.remove("active");
    }

    if (btnClicked) {
      btnClicked.classList.add("active");
      showPage(array, btnClicked.innerHTML);
    }
  });
}

// Call functions
paginationControl(students);
showPage(students, 1);
