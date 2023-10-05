
document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('task');
    const taskButton = document.getElementById('addTask');
    const todoList = document.getElementById('todoList');
    
    console.log(todoList);
    taskButton.addEventListener('click', () => {
        console.log('add todo clicked')
    })
    
    // adds new task
    const addTask = (task) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = task["content"]
    //   const deleteButton = listItem.querySelector('.delete-button');
    // //   deleteButton.addEventListener('click', () => deleteTask(listItem));
        console.log(listItem);
    }

    // const deleteTask = (listItem) => {
        
    // }

    // get all tasks from database
    const getAllTask =  async () => {
        try {
            const response = await fetch ("http://localhost:8080/posts");
            const data = await response.json();
            console.log(data);

            data.forEach((task) => {
                const e = addTask(task)
                todoList.appendChild(e)
            })
        } catch (err) {
            console.error("error fetching data", err)
        }
    };
    


    getAllTask();
});
