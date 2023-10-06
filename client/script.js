document.addEventListener('DOMContentLoaded', () => {


    const todoInput = document.getElementById('task');
    const todoList = document.getElementById('accordion');
    const newPost = document.getElementById("newPost");
    const categories = document.getElementById('categoriesList');
    const thisDate = document.querySelector("#taskDate");

    // get all tasks from database
    const getAllTask = async () => {
        try {
            const response = await fetch("http://localhost:8080/posts");
            const data = await response.json();
            if (data.length === 0) {
                todoList.innerHTML = 'Your Dairy is empty!'
            }
            data.forEach((task) => {
                const e = addTask(task)
                todoList.appendChild(e)
            })
        } catch (err) {
            console.error(err)
        }
    };
    const getAllCategories = async () => {
        try {
            const response = await fetch("http://localhost:8080/categories");
            const data = await response.json();
            data.forEach((task) => {
                let option = document.createElement('option')
                option.innerHTML = task['category']
                option.value = task['category_id']
                categories.appendChild(option)
            })
        } catch (err) {
            console.error(err)
        }
    }
    getAllCategories()
    newPost.addEventListener('submit', async e => {
        try {
            e.preventDefault()
            const content = todoInput.value
            const date = thisDate.value
            const options = {
                method: "POST",
                body: JSON.stringify({
                    category_id: categories.value,
                    content: content,
                    date: thisDate.value
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }
            const response = await fetch("http://localhost:8080/posts", options);
            const result = await response.json();
            if (!content || categories[0].selected || !date) {
                alert('Fill all fields')
            } else {
                addTask(result)
                window.location.reload();
            }
        } catch (err) {
            console.error(err)
        }
    })


    // adds new task
    const addTask = (task) => {
        const content = document.createElement('div')
        let id = task['id']
        content.classList.add('card', 'mb-2', `card-post-${id}`)
        content.innerHTML = `
            <div id="heading-${id}">
                <div class="btn-group d-flex justify-content-between">
                    <button class="btn dropdown-toggle fst-italic flex-grow-0" data-bs-toggle="collapse" data-bs-target="#collapse-${id}" aria-expanded="true" aria-controls="collapse-${id}">
                        ${new Date(task['date']).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })} // Post in «${task['category']}» category
                    </button >

    <button id="deleteButton-${id}" type="button" class="btn-close my-2 me-2 btn-outline-primary" aria-label="Close"></button>
                </div >
            </div >

    <div id="collapse-${id}" class="collapse multi-collapse" aria-labelledby="heading-${id}" data-bs-parent="#accordion">
        <div class="card-body">
            ${task["content"]}<a href="#" class="my-2 ms-4 btn-link edit-link" id="edit-${id}">Edit</a>
        </div>
    </div>
`
        return content;
    }
    //update
    document.addEventListener('click', event => {
        if (event.target.matches(".edit-link")) {
            const id = (event.target.id).split('-')[1];
            event.preventDefault()

            const editLink = event.target

            editLink.style.display = 'none'
            fetch(`http://localhost:8080/posts/${id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    category_id: categories.value,
                    content: content,
                    date: thisDate.value
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
                .then(response => {

                    // document.getElementById(`heading-${id}`).classList.add('fade')
                    // document.querySelector(`.card-post-${id}`).remove()

                    response.json()
                });

        }
    })

    //Delete post
    document.addEventListener('click', event => {
        if (event.target.matches(".btn-close")) {
            const id = (event.target.id).split('-')[1];
            fetch(`http://localhost:8080/posts/${id}`, { method: "DELETE" })
                .then(response => {
                    document.getElementById(`heading-${id}`).classList.add('fade')
                    setTimeout(() => {
                        document.querySelector(`.card-post-${id}`).remove()
                    }, "300");
                    response.json()
                });

        }
    })
    getAllTask();




})

