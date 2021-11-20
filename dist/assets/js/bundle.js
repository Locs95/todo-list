/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/scss/main.scss":
/*!***********************************!*\
  !*** ./src/assets/scss/main.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://pizza-show/./src/assets/scss/main.scss?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("\r\nlet app = null;\r\nlet todos = null;\r\nlet mainTodos = null;\r\nlet filteredTodos = null;\r\n\r\n// fetch data from REST API\r\nconst fetchAllTodos = async () => {\r\n\tconst data = \r\n\t\tawait fetch('https://jsonplaceholder.typicode.com/todos');\r\n\treturn await data.json();\r\n}\r\n\r\n// render buttons for todos items\r\nconst renderButtons = (item) => {\r\n\treturn (item) \r\n\t? '<span class=\"todos__card-badge red\">completed</span>'\r\n\t: '<span class=\"todos__card-badge green\">not completed</span>';\r\n}\r\n\r\n// render todos items\r\nconst renderTodosItems = async (todos, data = null) => {\r\n\tif (data === null) {\r\n\t\tdata = await fetchAllTodos();\r\n\t\tmainTodos = data;\r\n\t\tfilteredTodos = data;\r\n\t}\r\n\tlet list = '';\r\n\tdata.map(item => {\r\n\t\tlist += `\r\n\t\t\t<div \r\n\t\t\t\tclass=\"todos__card red-${item.completed}\">\r\n\t\t\t\t<div>\r\n\t\t\t\t\t<p class=\"todos__card-text\">\r\n\t\t\t\t\t\t${item.title}\r\n\t\t\t\t\t</p>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div>\r\n\t\t\t\t\t${renderButtons(item.completed)}\r\n\t\t\t\t</div>\r\n\t\t\t\t<div \r\n\t\t\t\t\tclass=\"todos__card-overlay\" \r\n\t\t\t\t\tdata-id=\"${item.id}\"></div>\r\n\t\t\t</div>\r\n\t\t`\r\n\t}); \r\n\ttodos.innerHTML = '';\r\n\ttodos.insertAdjacentHTML(\r\n\t\t'afterbegin',\r\n\t\tlist\r\n\t);\r\n}\r\n// sorting todos\r\nconst todosSortHandler = (target, sortTarget) => {\r\n\t(sortTarget === 'up') \r\n\t? target.classList.remove('todos-sort-btn_down')\r\n\t: target.classList.remove('todos-sort-btn_up');\r\n\r\n\ttarget.classList.add(`todos-sort-btn_${sortTarget}`);\r\n\ttarget.dataset.id = sortTarget;\r\n\r\n\tfilteredTodos.sort((a, b) => {\r\n\t\tif (sortTarget === 'up') {\r\n\t\t\tif (a.title < b.title) { return -1; }\r\n\t\t\tif (a.title > b.title) { return 1; }\r\n\t\t} else {\r\n\t\t\tif (a.title > b.title) { return -1; }\r\n\t\t\tif (a.title < b.title) { return 1; } \r\n\t\t}\r\n\t\treturn 0; \r\n\t});\r\n}\r\n// handle click on list items\r\nconst todoButtonsHandler = ({ target }) => {\r\n\tif (target.closest('.todos__card')) {\r\n\t\tfilteredTodos.map(item => {\r\n\t\t\tif (item.id === +target.dataset.id) {\r\n\t\t\t\titem.completed = item.completed ? false : true;\r\n\t\t\t}\r\n\t\t});\r\n\t\trenderTodosItems(todos, filteredTodos)\r\n\t} else if (target.closest('.todos-sort-btn')) {\r\n\t\tif (target.dataset.id === 'down') {\r\n\t\t\ttodosSortHandler(target, 'up');\r\n\t\t} else {\r\n\t\t\ttodosSortHandler(target, 'down');\r\n\t\t}\r\n\t\t\r\n\t\trenderTodosItems(todos, filteredTodos);\r\n\t}\r\n}\r\n\r\n// handle todos search\r\nconst todoSearchHandler = ({ target }) => {\r\n\tfilteredTodos = mainTodos\r\n\t\t.filter(item => \r\n\t\t\titem.title.toLowerCase()\r\n\t\t\t.indexOf(target.value.toLowerCase()) > -1);\r\n\trenderTodosItems(todos, filteredTodos);\r\n}\r\n// render todos\r\nconst renderTodos = async (app) => {\r\n\tconst mockup = `\r\n\t\t<div class=\"todos-container\">\r\n\t\t\t<div class=\"todos-searchbar\">\r\n\t\t\t\t<div>\r\n\t\t\t\t\t<input \r\n\t\t\t\t\t\tclass=\"todos-searchbar__input\"\r\n\t\t\t\t\t\ttype=\"text\" \r\n\t\t\t\t\t\tplaceholder=\"search todos\" />\r\n\t\t\t\t\t</div>\r\n\t\t\t\t<div>\r\n\t\t\t\t\t<button \r\n\t\t\t\t\t\tclass=\"todos-sort-btn todos-sort-btn_down\" \r\n\t\t\t\t\t\tdata-id=\"down\"></button>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"todos\"></div>\r\n\t\t</div>\r\n\t`;\r\n\tapp.insertAdjacentHTML(\r\n\t\t'afterbegin',\r\n\t\tmockup\r\n\t);\r\n\r\n\tconst searchBar = document.querySelector('.todos-searchbar');\r\n\ttodos = document.querySelector('.todos');\r\n\tif (searchBar && todos) {\r\n\t\trenderTodosItems(todos);\r\n\t\tapp.addEventListener('click', todoButtonsHandler);\r\n\t\tsearchBar.addEventListener('input', todoSearchHandler);\r\n\t}\r\n}\r\n\r\n// waiting until dom content loaded\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n\tapp = document.querySelector('#app');\r\n\tif (app) {\r\n\t\trenderTodos(app);\r\n\t}\r\n});\n\n//# sourceURL=webpack://pizza-show/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_modules__["./src/index.js"](0, {}, __webpack_require__);
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/assets/scss/main.scss"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;