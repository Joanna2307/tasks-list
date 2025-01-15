{
  let tasks = [];
  let hideTasksDone = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const markTasksAsDone = () => {
    tasks = tasks.map((task) => ({ ...task, done: true }));
    render();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li class="section__listItem ${
          hideTasksDone && task.done ? "section__listItem--hidden" : ""
        }">
          <button class="section__button js-done">
            ${task.done ? "&#10004;" : ""}
          </button>
          <span class="${task.done ? "section__listItem--done" : ""}">
            ${task.content}
          </span>
          <button class="section__button section__buttonRemove js-remove">
            &#x1F5D1;
          </button>
        </li>
      `;
    }

    document.querySelector(".js-taskList").innerHTML = htmlString;
  };

  const toggleHideTasksDone = () => {
    hideTasksDone = !hideTasksDone;
    console.log("hideTasksDone:", hideTasksDone);
    render();
  };

  const bindButtonsEvents = () => {
    const toggleHideTasksDoneButton = document.querySelector(
      ".js-toggleHideTasksDone"
    );
    const markTasksAsDoneButton = document.querySelector(".js-markTasksAsDone");

    if (toggleHideTasksDoneButton) {
      toggleHideTasksDoneButton.addEventListener("click", toggleHideTasksDone);
    }

    if (markTasksAsDoneButton) {
      markTasksAsDoneButton.addEventListener("click", markTasksAsDone);
    }
  };

  const renderButtons = () => {
    let htmlButtons = "";

    if (tasks.length) {
      htmlButtons += `
        <button class="section__tasksButtons js-toggleHideTasksDone">
          ${hideTasksDone ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="section__tasksButtons js-markTasksAsDone" ${
          tasks.every(({ done }) => done) ? "disabled" : ""
        }>
          Ukończ wszystkie
        </button>
      `;
    }

    document.querySelector(".js-tasksButtons").innerHTML = htmlButtons;
  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindEvents();
    bindButtonsEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskInput = document.querySelector(".js-newTask");
    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      newTaskInput.focus();
      return;
    }

    addNewTask(newTaskContent);
    newTaskInput.value = "";
    newTaskInput.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
