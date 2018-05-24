'use strict';
window.onload = ()=> {
	loadStorage();

	renderTasks (arrTasks);


	if (arrTasks.length <=1) {
		sortTasksBtn.disabled = true;
		deleteAllItems.disabled = true; 
	}

	if (localStorage.length === 1) {
		counter = 0
	};
}

let addTaskBtn     = document.querySelector('.add-btn')
, inpValue         = document.querySelector('.header input')
, uncompletedItems = document.getElementById('uncompleted')
, completedItems   = document.getElementById('completed')
, sortTasksBtn     = document.getElementById('sort-tasks-button')
, deleteAllItems   = document.getElementById('delete-all')
, inputSearch      = document.getElementById('inputSearch')
, searchBtn        = document.querySelector('.search')
, removeBtn        = `<svg width="24" height="24" viewBox="-20 -20 623 623"  xmlns:xlink="http://www.w3.org/1999/xlink"><circle class="remove-circle" cx="256" cy="256" r="256"/><path class="minus" d="M381.6,244.2H130.4c-6.5,0-11.8,5.3-11.8,11.8c0,6.5,5.3,11.8,11.8,11.8h251.1c6.5,0,11.8-5.3,11.8-11.8 C393.3,249.5,388,244.2,381.6,244.2z"/></svg>`
, completeBtn      = `<svg width="27" height="27" viewBox="-50 -50 623 623" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="circle" d="M489,255.9c0-0.2,0-0.5,0-0.7c0-1.6,0-3.2-0.1-4.7c0-0.9-0.1-1.8-0.1-2.8c0-0.9-0.1-1.8-0.1-2.7 c-0.1-1.1-0.1-2.2-0.2-3.3c0-0.7-0.1-1.4-0.1-2.1c-0.1-1.2-0.2-2.4-0.3-3.6c0-0.5-0.1-1.1-0.1-1.6c-0.1-1.3-0.3-2.6-0.4-4 c0-0.3-0.1-0.7-0.1-1C474.3,113.2,375.7,22.9,256,22.9S37.7,113.2,24.5,229.5c0,0.3-0.1,0.7-0.1,1c-0.1,1.3-0.3,2.6-0.4,4 c-0.1,0.5-0.1,1.1-0.1,1.6c-0.1,1.2-0.2,2.4-0.3,3.6c0,0.7-0.1,1.4-0.1,2.1c-0.1,1.1-0.1,2.2-0.2,3.3c0,0.9-0.1,1.8-0.1,2.7 c0,0.9-0.1,1.8-0.1,2.8c0,1.6-0.1,3.2-0.1,4.7c0,0.2,0,0.5,0,0.7c0,0,0,0,0,0.1s0,0,0,0.1c0,0.2,0,0.5,0,0.7c0,1.6,0,3.2,0.1,4.7 c0,0.9,0.1,1.8,0.1,2.8c0,0.9,0.1,1.8,0.1,2.7c0.1,1.1,0.1,2.2,0.2,3.3c0,0.7,0.1,1.4,0.1,2.1c0.1,1.2,0.2,2.4,0.3,3.6 c0,0.5,0.1,1.1,0.1,1.6c0.1,1.3,0.3,2.6,0.4,4c0,0.3,0.1,0.7,0.1,1C37.7,398.8,136.3,489.1,256,489.1s218.3-90.3,231.5-206.5 c0-0.3,0.1-0.7,0.1-1c0.1-1.3,0.3-2.6,0.4-4c0.1-0.5,0.1-1.1,0.1-1.6c0.1-1.2,0.2-2.4,0.3-3.6c0-0.7,0.1-1.4,0.1-2.1 c0.1-1.1,0.1-2.2,0.2-3.3c0-0.9,0.1-1.8,0.1-2.7c0-0.9,0.1-1.8,0.1-2.8c0-1.6,0.1-3.2,0.1-4.7c0-0.2,0-0.5,0-0.7 C489,256,489,256,489,255.9C489,256,489,256,489,255.9z"/><g class="arrow"><line x1="213.6" x2="369.7" y1="344.2" y2="188.2"/><line x1="233.8" x2="154.7" y1="345.2" y2="266.1"/></g></svg>`
, arrTasks         = []
, counter


if(!localStorage.getItem('counter')){
	localStorage.setItem('counter', 0);
	counter = 0;
} else {
	counter = localStorage.getItem('counter') - 0;
}

deleteAllItems.addEventListener('click', () => {
	uncompletedItems.innerHTML = '';
	completedItems.innerHTML = '';
	arrTasks.length = 0;
	localStorage.clear();

	if (arrTasks.length <=1) {
		sortTasksBtn.disabled = true;
		deleteAllItems.disabled = true; 
	}
})

inputSearch.addEventListener('keyup', search)

sortTasksBtn.addEventListener('click', () => {
	sortTasks(arrTasks);
	renderTasks (arrTasks);
})

inpValue.addEventListener('keydown',  (event) => {
	if (event.keyCode === 13) {
		if(inpValue.value) {
	  		let createTime = Date.now();
	  		saveLocal (createTime);
			renderTask (inpValue.value);
			inpValue.value = '';
		} else {
			alert('Add tasks');
		}

		if (arrTasks.length > 1) {
			sortTasksBtn.disabled = false;
			deleteAllItems.disabled = false; 
		}
	}	
})

addTaskBtn.addEventListener('click', () => {
	if(inpValue.value) {
  		let createTime = Date.now();
  		saveLocal (createTime);
		renderTask (inpValue.value);
		inpValue.value = '';
	} else {
		alert('Add tasks');
	}

	if (arrTasks.length > 1) {
		sortTasksBtn.disabled = false;
		deleteAllItems.disabled = false; 
	}
});

function renderTask (value, id, isCompleted = false) {
	let item = document.createElement('div');
	item.classList.add('item-todo');

	let span = document.createElement('span');
	span.id = id || `task:${counter}`;
	span.innerText = value;


	let buttons = document.createElement('div');
	buttons.classList.add('buttons');

	let remove = document.createElement('button');
	remove.classList.add('remove');


	//remove item 	
	remove.addEventListener('click', removeItem);

	let complete = document.createElement('button');
	complete.classList.add('complete');


	//complete task
	complete.addEventListener('click', comleteTask);

	buttons.appendChild(remove);
	remove.innerHTML = removeBtn;
	buttons.appendChild(complete);
	complete.innerHTML = completeBtn;

	item.appendChild(span);
	item.appendChild(buttons);


	if (!isCompleted){
		uncompletedItems.insertBefore(item, uncompletedItems.firstChild);
	} else {
  		completedItems.insertBefore(item, completedItems.firstChild);
	}
}

function removeItem () {
	let parent = this.parentNode.parentNode;
	parent.remove();
	let span = parent.querySelector('span');
	localStorage.removeItem(span.id)

	for (let i = 0; i < arrTasks.length; i++) {
		if(arrTasks[i]['id'] === span.id) {
			arrTasks.splice(i,1);

		}
	}

	if (arrTasks.length <= 1) {
	  sortTasksBtn.disabled = true;
	  deleteAllItems.disabled = true; 
	}

}

function comleteTask () {
	let target = this.parentNode.parentNode.parentNode;
	let parent = this.parentNode.parentNode;
	let span = parent.querySelector('span');

	if(target.id === 'uncompleted') {
		uncompletedItems.removeChild(parent);
		completedItems.appendChild(parent);

		let a =	localStorage.getItem(span.id);
		let b = JSON.parse(a);
		b['isCompleted'] = true;
		localStorage.setItem(span.id,JSON.stringify(b));

		for (let i = 0; i < arrTasks.length; i++) {
			if (arrTasks[i]['id'] === span.id) {
				arrTasks[i]['isCompleted'] = true;
			}

		}

	} else {
		completedItems.removeChild(parent);
		uncompletedItems.appendChild(parent);

	    let a =	localStorage.getItem(span.id);
	    let b = JSON.parse(a);
	    b['isCompleted'] = false;
	    localStorage.setItem(span.id,JSON.stringify(b));

		    for (let i = 0; i < arrTasks.length; i++) {
	       		if (arrTasks[i]['id'] === span.id) {
	          	arrTasks[i]['isCompleted'] = false;
	    	}
    	}
	}
}


function loadStorage () {
  for (let count = 0; count <= counter;count++) {
    let localStorageTask =	localStorage.getItem(`task:${count}`);
    if (localStorageTask != null) {
      let a = JSON.parse(localStorageTask);
      arrTasks.push(a)
    }
  }
}

function saveLocal (time) {
  counter++;
  let task = {
    id: `task:${counter}`,
    text: inpValue.value,
    isCompleted: false,
    dateCreation: time,
  }

  localStorage.setItem(`task:${counter}`,JSON.stringify(task));
  localStorage.setItem('counter',counter - 0);

  arrTasks.push(task);
}

function sortTasks (array) {
	if(array[0].dateCreation > array[1].dateCreation) {
	 	arrTasks = array.sort(function (a, b) {
   			return a.dateCreation > b.dateCreation;
	 	});
	} else {
	  	arrTasks = array.sort(function (a, b) {
	    	return a.dateCreation < b.dateCreation;
	  	});
	}
}

function renderTasks (arr) {
	uncompletedItems.innerHTML = '';
	completedItems.innerHTML = '';
	for (let i = 0; i < arr.length; i++) {
  		renderTask (arr[i]['text'],arr[i]['id'],arr[i]['isCompleted']);
	}
}

function search () {
  let arr = [];

  if (inputSearch.value.length === 0) {
  	renderTasks(arrTasks); 
  	return;
	 
  	}

	for (let i = 0; i < arrTasks.length; i++) {
		if (arrTasks[i]['text'].startsWith(inputSearch.value)) {
			arr.push(arrTasks[i]);
		
		}
	}
	renderTasks(arr);
}



