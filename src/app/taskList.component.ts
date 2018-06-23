import { Component } from '@angular/core';
import { TaskService } from './tasks.service';
import { Task } from './task';

@Component({
  selector: 'my-task-list',
  template: `
<ul>
<li *ngFor="let task of tasks" 
 [class.selected]="task === selectedTask"
(click)="onSelect(task)">
 <span class="badge">{{task.id}}</span> <span> {{task.name}} </span>
  <button class="delete"
    (click)="delete(task); $event.stopPropagation()">x</button>
</li>
</ul>

<task-detail [task] = "selectedTask"></task-detail>

<div *ngIf="selectedTask">
  <button (click)="save()">Save</button>
</div>


<div >
  <button (click)="newTask()">New task</button>
</div>

  `,
  providers: [TaskService]
})
export class TaskListComponent  { 

selectedTask : Task;
tasks : Task[];
index = 20;

  getTasks(): void {
    this.taskService.getTasks().then(tasks => this.tasks = tasks);
    
  }


  save(): void {
    console.log('update ' + this.selectedTask.id);
    if(this.selectedTask.id != null){
        this.taskService.update(this.selectedTask);
    } else {
        this.add(this.selectedTask);
    }
  }    


add(task: Task): void {
  this.taskService.create(task.name, task.deadline)
    .then(task => {
      console.log('created ' + task.id);
      this.tasks.push(task);
      this.selectedTask = null;
    });
}


newTask(): void{
  this.selectedTask = new Task();
}

delete(task: Task): void {
  this.taskService
      .delete(task.id)
      .then(() => {
        this.tasks = this.tasks.filter(h => h !== task);
        if (this.selectedTask === task) { this.selectedTask = null; }
      });
}

  ngOnInit(): void {    
    this.getTasks();
    this.index = 20; 
  }

  onSelect(task : Task){
    this.selectedTask = task;
  }


constructor(private taskService: TaskService) { 


}

}