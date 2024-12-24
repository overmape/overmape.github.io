document.getElementById('mainButton').addEventListener('click', function() {
    const taskName = document.getElementById('task_name').value;
    const taskBody = document.getElementById('task_body').value;

    if (taskName && taskBody) {
        const task = {
            name: taskName,
            body: taskBody,
            completed: false
        };

        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));

        document.getElementById('task_name').value = '';
        document.getElementById('task_body').value = '';

        displayTasks();

        alert('Задача добавлена!');
    } else {
        alert('Пожалуйста, заполните все поля.');
    }
});
function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const sectionTwo = document.getElementById('two');
    sectionTwo.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.className = 'sec_task';
        taskElement.innerHTML = `
            <div class="left_two_sec">
                <span class="spanDownOrange ${task.completed ? 'completed' : ''}">${task.name}</span>
                <span class="SpanDown ${task.completed ? 'completed' : ''}">${task.body}</span>
            </div>
            <div class="right_two_sec">
                <button id="complete_${index}" class="white-button">Выполненно</button>
                <button id="delete_${index}" class="white-button">Удалить</button>
            </div>
        `;
        sectionTwo.appendChild(taskElement);
        document.getElementById(`complete_${index}`).addEventListener('click', function() {
            task.completed = !task.completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayTasks();
        });
        document.getElementById(`delete_${index}`).addEventListener('click', function() {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayTasks();
        });
    });
}
displayTasks();