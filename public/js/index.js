// create task form
function createForm() {
  const backdrop = document.createElement("div");
  backdrop.classList.add("create-form");

  const addForm = `
    <form class="form" method="POST" action="http://localhost:8000/task/add">
      <div class="form-title">
        <div class="close-form"><i class="fa fa-arrow-left"></i></div>
        <div>Add Task</div>
      </div>
      <div class="form-text">
        <label for="task_text" hidden>Text</label>
        <textarea name="task_text" autofocus></textarea>
      </div>
      <div class="form-band">
        <label for="band">Band</label>
        <select name="band">
          <option value="" disabled>pick color band</option>
          <option value="1">Maroon</option>
          <option value="2">Fuschia</option>
          <option value="3">Olive</option>
          <option value="4">aqua</option>
          <option value="5" selected>teal</option>
        </select>
      </div>
      <div class="task-done">  
         <label for="completed">Completed</label>
        <select name="completed">
          <option value="1">True</option>
          <option value="0" selected>False</option>
        </select>
      </div>
      <div class="form-priority">
        <label for="priority">Priority</label>
        <select name="priority">
          <option disabled>pick priority</option>
          <option value="1" selected>Low (L)</option>
          <option value="2">Medium (M)</option>
          <option value="3">High (H)</option>
        </select>
      </div>
      <button type="submit">Add</button>
    </form>
  `;
  backdrop.innerHTML = addForm;

  // append form to body
  document.body.append(backdrop);

  // removes form
  const close = document.querySelector(".close-form");
  close.addEventListener("click", function() {
    backdrop.remove();
  });
}

function main() {
  const task = document.querySelector("#task");

  // run on task page
  if (task) {
    // add task
    const addTask = document.querySelector(".create");
    addTask.addEventListener("click", function() {
      createForm();
    });
  }
}

// main
main();
