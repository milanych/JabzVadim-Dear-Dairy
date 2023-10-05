
document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('task');
    const taskButton = document.getElementById('addTask');
    const todoList = document.getElementById('todoList');
    
    taskButton.addEventListener('click', () => {
        console.log('add todo clicked')
    })
    
    // adds new task
    const addTask = (task) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        //   data to go in here
      `;

      const deleteButton = listItem.querySelector('.delete-button');
      deleteButton.addEventListener('click', () => deleteTask(listItem));

    }

    const deleteTask = (listItem) => {
        
    }

    // get all tasks from database
    const getAllTask =  async () => {
        try {
            const response = await fetch ("todo.json");
            const data = await response.json();
            console.log(data);
            data.forEach((task) => addTask(task))
        } catch (err) {
            console.error("error fetching data", err)
        }
    };
    


    getAllTask();
});

