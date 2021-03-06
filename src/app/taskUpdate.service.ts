import { Injectable, Output, EventEmitter } from '@angular/core';
import {TaskService} from './tasks.service';
import {Task} from './task';
import { Subject }    from 'rxjs';

@Injectable()
export class TaskUpdateService {

  @Output() emiter: EventEmitter<Task[]> = new EventEmitter();
  @Output() taskRefreshEmiter: EventEmitter<String> = new EventEmitter();
  
  updateList(tasks : Task[]) {
    this.emiter.emit(tasks);
  }

  updateTask(id : String) {
    this.taskRefreshEmiter.emit(id);
  }
}