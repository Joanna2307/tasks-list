{
  const tasks = [];

  const addNewTask = (newTaskContent) => {
    tasks.push({ content: newTaskContent });
    render();
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  };

  
  
  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
              <li class="section__listItem">
                <button class="section__button js-done">
                  ${task.done ? "&#10004" : "&#x1F5D1"}
                </button>
                <span class="${task.done ? "section__listItem--done" : ""}">
                  ${task.content}
                </span>
                <button class="section__button section__buttonRemove js-remove">
                  &#x1F5D1
                </button>
              </li>
            `;
    }
    document.querySelector(".js-taskList").innerHTML = htmlString;

    const removeButtons = document.querySelectorAll(".js-remove");
  
  removeButtons.forEach(removeButtons, index) => {
    removeButton.addEventLitsener("click", () => {
      removeTask(index);
    }); 
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);
    document.querySelector(".js-newTask").value = ""; // Wyczyść pole tekstowe
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
