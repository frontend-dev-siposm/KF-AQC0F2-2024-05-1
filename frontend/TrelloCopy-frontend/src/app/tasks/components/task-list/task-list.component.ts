import { Component, OnInit } from '@angular/core';
import { Task } from '../../../../app/task';
import { TaskService } from '../../../../app/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  error: string = '';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks()
      .subscribe({
        next: (tasks) => {
          this.tasks = tasks;
        },
        error: (error) => {
          if (error.status === 0) {
            this.error = 'Unable to connect to the API. Please ensure the backend server is running and check if you have accepted the development certificate (visit https://localhost:7295 directly in browser to accept it).';
          } else if (error.status === 404) {
            this.error = 'API endpoint not found. Please check the API URL.';
          } else {
            this.error = `Error loading tasks: ${error.message || 'Please try again later.'}`;
          }
          console.error('Error loading tasks:', error);
        }
      });
  }
}
