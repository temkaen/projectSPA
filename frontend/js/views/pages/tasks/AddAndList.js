import Component from '../../../views/Component.js';

import Leads from '../../../models/Leads.js';

class AddAndList extends Component {
	constructor() {
		super();
		
		this.model = new Leads();
	}
	
    render() {
		return new Promise(resolve => {
			this.model.getleadInfo().then(lead => {
				this.lead = lead;
				
				resolve(`
					<h1 class="page-title">Tasks List</h1>
					
					<div class="task-add">
						<input class="task-add__title" type="text" placeholder="Task title">
						<textarea class="task-add__description" placeholder="Task description"></textarea>
					 
						<button class="task-add__btn-add button" disabled>Add Task</button>
					</div>
				 
					<div class="tasks">
						<div class="tasks__additional">
							<p class="tasks__counter"></p>
							
							<button class="tasks__btn-clear button" ${!this.lead.length ? 'disabled' : ''}>Clear Tasks List</button>
						</div>
						
						<div class="tasks__list">
							${this.lead.map(task => this.getTaskHTML(task)).join('\n ')}
						</div>
					</div>
				`);
			});
		});
    }

    afterRender() {
        this.setActions();
        
		this.countTasksAmount();
    }

    setActions() {
        const addTaskTitle = document.getElementsByClassName('task-add__title')[0],
			addTaskDescription = document.getElementsByClassName('task-add__description')[0],
			addTaskBtn = document.getElementsByClassName('task-add__btn-add')[0],
			tasksContainer = document.getElementsByClassName('tasks')[0],
			clearTasksListBtn = tasksContainer.getElementsByClassName('tasks__btn-clear')[0],
			tasksList = tasksContainer.getElementsByClassName('tasks__list')[0];
	
		addTaskTitle.addEventListener('keyup', () => addTaskBtn.disabled = !addTaskTitle.value.trim());
        addTaskBtn.addEventListener('click', () => this.addTask(addTaskTitle, addTaskDescription, addTaskBtn, clearTasksListBtn, tasksList));
	
		tasksContainer.addEventListener('click', event => {
            const target = event.target,
                targetClassList = target.classList;

			if (targetClassList.contains('tasks__btn-clear')) {
            	this.clearTasksList(tasksList, clearTasksListBtn);
			}
			
            if (targetClassList.contains('task') || targetClassList.contains('task__title')) {
                this.redirectToTaskInfo(target.dataset.id);
            }
			
			if (targetClassList.contains('task__btn-done')) {
				this.changeTaskStatus(target.parentNode.parentNode, target.previousElementSibling, target);
			}
			
            if (targetClassList.contains('task__btn-remove')) {
                this.removeTask(target.parentNode.parentNode, clearTasksListBtn);
            }
        });
    }

    addTask(addTaskTitle, addTaskDescription, addTaskBtn, clearTasksListBtn, tasksList) {
        const newTask = {
            title: addTaskTitle.value.trim(),
            description: addTaskDescription.value.trim(),
        };

        this.model.addTask(newTask).then(task => {
			this.tasks.push(task);
	
			this.clearAddTask(addTaskTitle, addTaskDescription, addTaskBtn);
			clearTasksListBtn.disabled && (clearTasksListBtn.disabled = false);
	
			tasksList.insertAdjacentHTML('beforeEnd', this.getTaskHTML(task));
	
			this.countTasksAmount();
		});
    }

    getTaskHTML(task) {
    	const statusDone = task.status === 'Done';
    	
        return `
            <div class="task ${statusDone ? 'task_done' : ''}" data-id="${task.id}">
                <a class="task__title" data-id="${task.id}">${task.title}</a>
                
                <div class="task__buttons">
                	${!statusDone ?
                    	`<a class="task__btn-edit button" href="#/task/${task.id}/edit">Edit</a>
                    	 <a class="task__btn-done button">Done</a>`
					: ''}
                    <a class="task__btn-remove button">Remove</a>   
                </div>                            
            </div>
        `;
    }

    clearAddTask(addTaskTitle, addTaskDescription, addTaskBtn) {
		addTaskTitle.value = '';
		addTaskDescription.value = '';
        addTaskBtn.disabled = true;
    }
	
    clearTasksList(tasksList, clearTasksListBtn) {
    	if (confirm('Are you sure?')) {
    		this.tasks = [];
			localStorage.setItem('tasks', JSON.stringify(this.tasks));
			
			clearTasksListBtn.disabled = true;
			tasksList.innerHTML = '';
		
			this.countTasksAmount();
		}
	}
	
    redirectToTaskInfo(id) {
        location.hash = `#/task/${id}`;
    }

    changeTaskStatus(taskContainer, editTaskBtn, doneTaskBtn) {
		this.tasks.find(task => task.id === taskContainer.dataset.id).status = 'Done';
		localStorage.setItem('tasks', JSON.stringify(this.tasks));
    	
    	taskContainer.classList.add('task_done');
		editTaskBtn.remove();
		doneTaskBtn.remove();
		
		this.countTasksAmount();
	}
	
    removeTask(taskContainer, clearTasksListBtn) {
        if (confirm('Are you sure?')) {
            this.tasks = this.tasks.filter(task => task.id !== taskContainer.dataset.id);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));

            taskContainer.remove();
            !this.tasks.length && (clearTasksListBtn.disabled = true);
	
			this.countTasksAmount();
        }
    }
	
	countTasksAmount() {
		const tasksCounter = document.getElementsByClassName('tasks__counter')[0],
			totalAmount = document.getElementsByClassName('task').length,
			doneAmount = document.getElementsByClassName('task_done').length;
		
		tasksCounter.innerHTML = !totalAmount ?
			'Tasks list is empty' :
			`There are <span class="tasks__counter-done">${doneAmount}</span> tasks of <span class="tasks__counter-total">${totalAmount}</span> are done`;
	}
}

export default AddAndList;