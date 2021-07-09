const ALL = 1;

const ACTIVE = 2;

const COMPLETED = 3;

let todoDatas = [];

let btnAdd = document.getElementById('add');

let newTodo = document.getElementById('todo');

let contentBox = document.getElementById('content');

let checkList = document.getElementsByClassName('toggle-todo');

let filterBtn = document.querySelectorAll('.filter-btn');

let clearCompletedData = document.getElementById('clear-completed');

let numberTodoActive = document.getElementById('number-todo');

let filterStatus = ALL;


btnAdd.onclick = () => {
    addNewTodo();
};

newTodo.onkeypress = (event) => {
    if (event.key === 'Enter') {
        addNewTodo();
    }
};

window.onload = function () {
    const dataStorage = localStorage.getItem('data');
    if (dataStorage !== null) {
        todoDatas = JSON.parse(dataStorage);
    }
    displayTodoes();
    countItemLeft();
}

clearCompletedData.onclick = () => {
    clearCompleted();
}

function addNewTodo() {
    let value = {
        id: generateId(),
        todo: newTodo.value.trim(),
        active: true
    };

    if (newTodo.value !== '' && newTodo.value.trim()) {
        todoDatas.unshift(value);
        displayTodoes();
        newTodo.value = '';
        saveData();
        countItemLeft();
    }
}

function generateId() {
    return Math.floor(Math.random() * 10000);
}

function displayTodoes() {
    let html = getDataFilter().map(todo =>
        `<li class="content__todo" id="" ondblclick="showInput(${todo.id})">
            <div class="todo-box">
                <input type="checkbox" id="${todo.id}" class="toggle-todo" onclick="toggleTodo(${todo.id})">
                <span>${todo.todo}</span>
                <button class="btn-delete" onClick="deleteTodo(${todo.id})">&times;</button>        
            </div>
            <input autocomplete="off" class="edit-field" type="text" id="field-${todo.id}" value="${todo.todo}" onkeypress="editEnter(event,${todo.id})" onBlur="editTodo(${todo.id})" />
        </li>`
    );
    let htmlToString = html.join('');
    contentBox.innerHTML = htmlToString;
    if (todoDatas.length > 0) {
        for (let i = 0; i < checkList.length; i++) {
            for (let j = 0; j < todoDatas.length; j++) {
                if (parseInt(checkList[i].id) === todoDatas[j].id) {
                    if (!todoDatas[j].active) {
                        checkList[i].setAttribute("checked", "checked");
                    }
                }
            }
        }
    }
}

function getDataFilter() {
    switch (filterStatus) {
        case ALL:
            return todoDatas;
        case ACTIVE:
            return todoDatas.filter(todo => todo.active);
        case COMPLETED:
            return todoDatas.filter(todo => !todo.active);
        default:
            return todoDatas;
    }
}

function deleteTodo(id) {
    todoDatas = todoDatas.filter(todo => todo.id !== id);
    displayTodoes();
    saveData();
    countItemLeft();
}

function editEnter(event, id) {
    if (event.key === 'Enter') {
        editTodo(id);
    }
}

function editTodo(id) {
    let editField = document.getElementById('field-' + id);
    let value = editField.value;
    todoDatas = todoDatas.map(todo => {
        if (todo.id === id) {
            return {
                ...todo,
                todo: value
            };
        } else {
            return todo;
        }
    });
    displayTodoes();
    editField.style.display = 'none';
    saveData();
}

function showInput(id) {
    let editField = document.getElementById('field-' + id);
    editField.style.display = 'block';
    setCaretPosition(editField, editField.value.length);
}

// Xử lý chỏ chuột xuống cuối câu
function setCaretPosition(ctrl, pos) {
    // Modern browsers
    if (ctrl.setSelectionRange) {
        ctrl.focus();
        ctrl.setSelectionRange(pos, pos);
        // IE8 and below
    } else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}

function toggleTodo(id) {
    todoDatas = todoDatas.map(todo => {
        if (todo.id === id) {
            return {
                ...todo,
                active: !todo.active
            };
        } else {
            return todo;
        }
    });
    saveData();
    countItemLeft();
}

function saveData() {
    localStorage.setItem('data', JSON.stringify(todoDatas));
}

function clearCompleted() {
    todoDatas = todoDatas.filter(todo => todo.active !== false);
    displayTodoes();
    saveData();
    countItemLeft();
}

function onClickBtnFilter(e) {
    document.querySelector('.filter-btn.active')?.classList.remove('active');
    if (e === ALL) {
        document.getElementById('all').classList.add('active');
        filterStatus = ALL;
    }
    else if (e === ACTIVE) {
        document.getElementById('active').classList.add('active');
        filterStatus = ACTIVE;
    }
    else if (e === COMPLETED) {
        document.getElementById('completed').classList.add('active');
        filterStatus = COMPLETED;
    }
    displayTodoes();
}

function countItemLeft() {
    let temp = todoDatas.filter(todo => todo.active === true).length;
    numberTodoActive.innerHTML = temp + " ";
}

function changeStatus() {

}




