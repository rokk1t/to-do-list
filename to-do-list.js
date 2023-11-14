// #variables
const inputJS = document.getElementById(`input-html`);
const addBtnJS = document.getElementById(`add-btn-html`);
const ulJS = document.getElementById(`ul-html`);

const notes = [
  {
    title: `Note#1`,
    completed: false,
  },
  {
    title: `Note#2`,
    completed: true,
  },
];

// #functions
function render() {
  // 5. ...и функция выплёвывет результат цикла на страницу.
  ulJS.innerHTML = ``;
  if (notes.length === 0) {
    ulJS.classList.add("text-center");
    ulJS.innerHTML = `Empty list`;
  } else {
    ulJS.classList.remove("text-center");
  }
  for (let i = 0; i < notes.length; i++) {
    // 4. Цикл получает все html с нужными подстановками
    ulJS.insertAdjacentHTML(`beforeend`, getNote(notes[i], i));
  }
}
function getNote(note, i) {
  // 1. ulJS.insertAdjacentHTML запускает getNote()
  // 2. Передаёт параметры: 1 ) note в виде notes[i] и 2) i.
  // 3. getNote возвращает для ulJS.insertAdjacentHTML втроой параметр в виде html.
  return `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      
      <span ms-auto style="font-family: 'Agbalumo', 'Lobster', serif; font-size: 24px" class="text-body-secondary ${
        note.completed ? `text-decoration-line-through` : ``
      }" data-index="${i}"> 
        ${note.title}
      </span>

      <span class="ms-auto">

        <span class="btn btn-small btn-outline-secondary rounded-4 btn-${
          note.completed ? `success-emphasis` : ``
        }" data-index="${i}" data-type="done">
          ✓
        </span>

        <span class="btn btn-small btn-outline-secondary rounded-4" data-index="${i}" data-type="remove">
          ✗
        </span>

      </span>
    </li>
  `;
}

// #events
render();
addBtnJS.onclick = function () {
  // Проверка на пустое поле ввода
  if (inputJS.value.length === 0) {
    return;
  }
  const newNote = {
    title: inputJS.value,
    completed: false,
  };
  notes.push(newNote);
  render();
  inputJS.value = "";
};
ulJS.onclick = function (event) {
  if (event.target.dataset.index) {
    const index = event.target.dataset.index;
    const type = event.target.dataset.type;

    if (type === `done`) {
      console.log(`done`, index);
    }
    if (type === `remove`) {
      console.log(`remove`, index);
    }
  }
};

ulJS.onclick = function (event) {
  if (event.target.dataset.index) {
    const index = event.target.dataset.index;
    const type = event.target.dataset.type;

    if (type === `done`) {
      notes[index].completed = !notes[index].completed;
    } else if (type === `remove`) {
      notes.splice(index, 1);
    }
  }
  render();
};
