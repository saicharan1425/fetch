 const apiUrl= 'https://jsonplaceholder.typicode.com/todos';

  async function getTodos(){
  const todoRes = await  fetch(apiUrl + '?_limit=10');
  const todos = await todoRes.json()
  todos.forEach(todo => addTodoToDom(todo))
    
  }

  function addTodoToDom(todo){
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(todo.title));
    div.setAttribute('data-id',todo.id);
    div.classList.add('todo')
    
    if(todo.completed){
      div.classList.add('done')
    }
    document.getElementById('todo-list').appendChild(div)
    
  }

  const createTodo = async (e) => {
    e.preventDefault();
      const newTodo = {
        title : e.target.firstElementChild.value,
        completed : false
      }

     const postFetch = await fetch(apiUrl, {
        method : 'Post',
        body: JSON.stringify(newTodo),
        headers : {
          'Content-type' : 'application/json',
        }
      })
      const res = await postFetch.json()
      
      console.log(res);
      addTodoToDom(res)
  }

  const toogleComplete = (e) => {
    if(e.target.classList.contains('todo')){
      e.target.classList.toggle('done')

      updateTodo(e.target.dataset.id, e.target.classList.contains('done'));
    }

  }

  const updateTodo = (id, completed) =>{
    fetch(`${apiUrl}/${id}`,{
      method: 'put',
      body: JSON.stringify({completed}),
      headers: {
        'Content-Type':'application/json'
      }
    })
  }

  const deleteTodo = (e) => {
    if(e.target.classList.contains('todo')){
      const id = e.target.dataset.id;
      fetch(`${apiUrl}/${id}`,{
        method: 'DELETE',
      })
      .then(res => res.json())
      .then(() => e.target.remove())
    }
  }



function init(){
  document.addEventListener('DOMContentLoaded', getTodos);
  document.querySelector('#todo-form').addEventListener('submit',createTodo);
  document.querySelector('#todo-list').addEventListener('click',toogleComplete);
  document.querySelector('#todo-list').addEventListener('dblclick',deleteTodo);
}

  init()