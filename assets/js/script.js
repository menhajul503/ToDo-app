const form = document.querySelector('.todo-form');
const input = form.querySelector('input[type="text"]');
const list = document.querySelector('.todo-list');
const badge = document.querySelector('.badge');

function updateTaskCount() {
    const count = list.querySelectorAll('.todo-item').length;
    badge.textContent = `${count} task${count === 1 ? '' : 's'}`;
}

function createTodoItem(text) {
    const item = document.createElement('li');
    item.className = 'todo-item';

    const label = document.createElement('label');
    label.className = 'checkbox';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const span = document.createElement('span');
    span.textContent = text;

    checkbox.addEventListener('change', () => {
        item.classList.toggle('completed', checkbox.checked);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.type = 'button';
    deleteBtn.textContent = '×';
    deleteBtn.addEventListener('click', () => {
        item.remove();
        updateTaskCount();
    });

    label.append(checkbox, span);
    item.append(label, deleteBtn);

    return item;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value.trim();

    if (!value) {
        input.focus();
        return;
    }

    const todoItem = createTodoItem(value);
    list.prepend(todoItem);
    input.value = '';
    input.focus();
    updateTaskCount();
});

list.querySelectorAll('.delete-btn').forEach((button) => {
    button.addEventListener('click', () => {
        button.closest('.todo-item').remove();
        updateTaskCount();
    });
});

updateTaskCount();
