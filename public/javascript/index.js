// add and update
// create form
function createForm(action, { id, text, band, priority, completed } = {}) {
  const backdrop = document.createElement("div");
  backdrop.classList.add("form-backdrop");

  // options default
  let selected = action === "Add" ? "selected" : "";

  // form action and method
  const endPoint = action === "Add" ? "/task/add" : "/task/update";

  const form = `
    <form class="form" method="POST" action=${endPoint}>
      <div class="form-title">
        <div class="close-form"><i class="fa fa-arrow-left"></i></div>
        <div>${action} Task</div>
      </div>
      <div hidden>
        <label for="task_id" hidden>Text</label>
        <input name="task_id" type="text" value=${id || ""}>
      </div>
      <div class="form-text">
        <label for="task_text" hidden>Text</label>
        <textarea style="line-height: 1.3" name="task_text" maxlength="35" autofocus>${text ||
          ""}</textarea>
        <div class="char-count">
          <span class="current">${text ? text.length : 0}</span>
          <span class="maximum">  / 35</span>
        </div>
      </div>
      <div class="form-band">
        <label for="band">Band</label>
        <select name="band">
          <option value="" disabled>pick color band</option>
          <option value="1" ${
            band === "1" ? "selected" : ""
          }>LightSkyBlue</option>
          <option value="2" ${
            band === "2" ? "selected" : ""
          }>LightSalmon</option>
          <option value="3" ${
            band === "3" ? "selected" : ""
          }>PaleTurquoise</option>
          <option value="4" ${band === "4" ? "selected" : ""}>LightPink</option>
          <option value="5" ${band === "5" ? "selected" : ""}>PaleGreen</option>
          <option value="7" ${band === "7" ? "selected" : ""}>LightGray</option>
          <option value="6" ${
            band === "6" ? "selected" : selected
          }>White</option>
        </select>
      </div>
      <div class="task-done">  
        <label for="completed">Completed</label>
        <select name="completed">
          <option value="1"  ${
            completed === "1" ? "selected" : ""
          }>True</option>
          <option value="0" ${
            completed === "0" ? "selected" : selected
          }>False</option>
        </select>
      </div>
      <div class="form-priority">
        <label for="priority">Priority</label>
        <select name="priority">
          <option disabled>pick priority</option>
          <option value="1" ${
            priority === "1" ? "selected" : ""
          }>Low (L)</option>
          <option value="2" ${
            priority === "2" ? "selected" : ""
          }>Normal (N)</option>
          <option value="3" ${
            priority === "3" ? "selected" : ""
          }>High (H)</option>
          <option value="4" ${
            priority === "4" ? "selected" : selected
          }>None</option>
        </select>
      </div>
      <button type="submit">${action.toUpperCase()}</button>
    </form>
  `;

  // append form to body
  document.body.append(backdrop);
  document.body.insertAdjacentHTML("beforeend", form);

  // character counts
  const textarea = document.querySelector(".form-text textarea");
  const current = document.querySelector(".current");

  textarea.addEventListener("keyup", function() {
    const count = this.value.length || 0;
    current.textContent = count;
  });

  // removes backdrop and form
  const close = document.querySelector(".close-form");
  close.addEventListener("click", function() {
    backdrop.remove();
    document.querySelector(".form").remove();
  });
}

// format date
function formatDate(day) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];

  const now = new Date();
  const year = now.getFullYear();
  let date = now.getDate();
  let month = now.getMonth();
  month = months[month];

  if (day === "today") {
    return `${date} ${month}, ${year}`;
  }

  if (day === "yesterday") {
    return `${date - 1} ${month}, ${year}`;
  }
}

// fetch api
async function fetchApi(url, method, data) {
  const response = await fetch(url, {
    method,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data)
  });
  return await response.json();
}

function main() {
  const task = document.querySelector("#task");

  // run on task page
  if (task) {
    // show title and list
    // if not empty
    const taskList = document.querySelectorAll(".task-list .content");
    for (let list of taskList) {
      if (list.children.length) {
        const listHeader = list.previousElementSibling;
        listHeader.style.display = "flex";
        list.style.display = "grid";

        // show dates
        // today's and yesterday's
        const titles = document.querySelectorAll(".task-list .title");
        for (let title of titles) {
          let span = title.children[1];
          let day = title.children[0].textContent;
          if (day === "today") {
            span.textContent = formatDate(day);
          }

          if (day === "yesterday") {
            span.textContent = formatDate(day);
          }
        }
      }
    }

    // show priority
    // if not none
    const priorities = document.querySelectorAll(".task .priority");
    for (let priority of priorities) {
      if (priority.children.length) {
        priority.style.boxShadow = "0 1px 3px #ccc";
        priority.style.display = "block";
      }
    }

    // add task
    const addTask = document.querySelector(".add-btn");
    addTask.addEventListener("click", function() {
      const action = "Add";
      createForm(action);
    });

    // delete task
    const deleteTask = document.querySelectorAll(".delete");
    for (let btn of deleteTask) {
      btn.addEventListener("click", async function() {
        const taskId = this.dataset.id;

        const url = "/task/remove";
        const method = "DELETE";
        const data = { id: taskId };

        try {
          const result = await fetchApi(url, method, data);
          if (result.result.changes) {
            location.reload();
          }
        } catch (e) {}
      });
    }

    // complete task
    const toggleComplete = document.querySelectorAll(".complete");
    for (let toggle of toggleComplete) {
      toggle.addEventListener("click", async function() {
        const taskId = this.dataset.id;
        const completed = parseInt(this.dataset.completed);

        const method = "PATCH";
        const data = { id: taskId };
        let url;

        if (completed) {
          url = "/task/redo";
        } else {
          url = "/task/complete";
        }

        try {
          const result = await fetchApi(url, method, data);
          if (result.result.changes) {
            location.reload();
          }
        } catch (e) {}
      });
    }

    // update task
    const updateTask = document.querySelectorAll(".edit");
    for (let edit of updateTask) {
      edit.addEventListener("click", function() {
        const action = "Update";
        const data = this.dataset;
        createForm(action, data);
      });
    }

    // clear tasks
    const clearTasks = document.querySelectorAll(".task-list .clear-list");
    for (let clearBtn of clearTasks) {
      clearBtn.addEventListener("click", async function() {
        const title = this.dataset.title;
        const page = this.dataset.page.toLowerCase();

        const method = "DELETE";
        const data = { title, page };
        let url;

        // create destroy end points
        function createRoute(page) {
          if (title === "today") {
            url = `/task/r/${page}/today`;
          }

          if (title === "yesterday") {
            url = `/task/r/${page}/yesterday`;
          }

          if (title === "past") {
            console.log(page, title);
            url = `/task/r/${page}/past`;
          }

          if (title === "active") {
            url = `/task/r/${page}/active`;
          }

          if (title === "completed") {
            url = `/task/r/${page}/completed`;
          }
        }

        if (page === "activetask") {
          createRoute("active");
        } else if (page === "completedtask") {
          createRoute("completed");
        } else {
          createRoute("all");
        }

        try {
          const result = await fetchApi(url, method, data);
          if (result.result.changes) {
            location.reload();
          }
        } catch (e) {}
      });
    }
  }
}

// main
main();
