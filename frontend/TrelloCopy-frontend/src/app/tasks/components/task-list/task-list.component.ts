import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selectedFilter: 'all' | 'done' | 'in-progress' = 'all';

  get filteredTasks(): Task[] {
    switch (this.selectedFilter) {
      case 'done':
        return this.tasks.filter(task => task.isCompleted);
      case 'in-progress':
        return this.tasks.filter(task => !task.isCompleted);
      default:
        return this.tasks;
    }
  }

  constructor(
    private taskService: TaskService,
    private router: Router
  ) { }

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

  editTask(taskId: number | null | undefined): void {
    if (taskId === null) {
      console.error('Cannot edit task: Invalid task ID');
      return;
    }
    this.router.navigate(['/tasks/edit', taskId]);
  }

  deleteTask(taskId: number | null | undefined): void {
    if (!taskId) {
      console.error('Cannot delete task: Invalid task ID');
      return;
    }
    
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          this.loadTasks(); 
        },
        error: (error) => {
          this.error = `Error deleting task: ${error.message || 'Please try again later.'}`;
          console.error('Error deleting task:', error);
        }
      });
    }
  }

  assignTask(taskId: number | null | undefined): void {
    if (!taskId) {
      console.error('Cannot assign task: Invalid task ID');
      return;
    }

    this.taskService.assignTask(taskId).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (error) => {
        this.error = `Error assigning task: ${error.message || 'Please try again later.'}`;
        console.error('Error assigning task:', error);
      }
    });
  }
  detachTask(taskId: number | null | undefined): void {
    if (!taskId) {
      console.error('Cannot detach task: Invalid task ID');
      return;
    }

    this.taskService.detachTask(taskId).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (error) => {
        this.error = `Error detaching task: ${error.message || 'Please try again later.'}`;
        console.error('Error detaching task:', error);
      }
    });
  }

  createTask(): void {
    this.router.navigate(['/tasks/create']);
  }
}
