
let app = null;
let todos = null;
let mainTodos = null;
let filteredTodos = null;

// fetch data from REST API
const fetchAllTodos = async () => {
	const data = 
		await fetch('https://jsonplaceholder.typicode.com/todos');
	return await data.json();
}

// render buttons for todos items
const renderButtons = (item) => {
	return (item) 
	? '<span class="todos__card-badge red">completed</span>'
	: '<span class="todos__card-badge green">not completed</span>';
}

// render todos items
const renderTodosItems = async (todos, data = null) => {
	if (data === null) {
		data = await fetchAllTodos();
		mainTodos = data;
		filteredTodos = data;
	}
	let list = '';
	data.map(item => {
		list += `
			<div 
				class="todos__card red-${item.completed}">
				<div>
					<p class="todos__card-text">
						${item.title}
					</p>
				</div>
				<div>
					${renderButtons(item.completed)}
				</div>
				<div 
					class="todos__card-overlay" 
					data-id="${item.id}"></div>
			</div>
		`
	}); 
	todos.innerHTML = '';
	todos.insertAdjacentHTML(
		'afterbegin',
		list
	);
}
// sorting todos
const todosSortHandler = (target, sortTarget) => {
	(sortTarget === 'up') 
	? target.classList.remove('todos-sort-btn_down')
	: target.classList.remove('todos-sort-btn_up');

	target.classList.add(`todos-sort-btn_${sortTarget}`);
	target.dataset.id = sortTarget;

	filteredTodos.sort((a, b) => {
		if (sortTarget === 'up') {
			if (a.title < b.title) { return -1; }
			if (a.title > b.title) { return 1; }
		} else {
			if (a.title > b.title) { return -1; }
			if (a.title < b.title) { return 1; } 
		}
		return 0; 
	});
}
// handle click on list items
const todoButtonsHandler = ({ target }) => {
	if (target.closest('.todos__card')) {
		filteredTodos.map(item => {
			if (item.id === +target.dataset.id) {
				item.completed = item.completed ? false : true;
			}
		});
		renderTodosItems(todos, filteredTodos)
	} else if (target.closest('.todos-sort-btn')) {
		if (target.dataset.id === 'down') {
			todosSortHandler(target, 'up');
		} else {
			todosSortHandler(target, 'down');
		}
		
		renderTodosItems(todos, filteredTodos);
	}
}

// handle todos search
const todoSearchHandler = ({ target }) => {
	filteredTodos = mainTodos
		.filter(item => 
			item.title.toLowerCase()
			.indexOf(target.value.toLowerCase()) > -1);
	renderTodosItems(todos, filteredTodos);
}
// render todos
const renderTodos = async (app) => {
	const mockup = `
		<div class="todos-container">
			<div class="todos-searchbar">
				<div>
					<input 
						class="todos-searchbar__input"
						type="text" 
						placeholder="search todos" />
					</div>
				<div>
					<button 
						class="todos-sort-btn todos-sort-btn_down" 
						data-id="down"></button>
				</div>
			</div>
			<div class="todos"></div>
		</div>
	`;
	app.insertAdjacentHTML(
		'afterbegin',
		mockup
	);

	const searchBar = document.querySelector('.todos-searchbar');
	todos = document.querySelector('.todos');
	if (searchBar && todos) {
		renderTodosItems(todos);
		app.addEventListener('click', todoButtonsHandler);
		searchBar.addEventListener('input', todoSearchHandler);
	}
}

// waiting until dom content loaded
document.addEventListener("DOMContentLoaded", () => {
	app = document.querySelector('#app');
	if (app) {
		renderTodos(app);
	}
});