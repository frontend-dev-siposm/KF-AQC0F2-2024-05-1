import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../task.service';
import { ProjectService } from '../../project.service';
import { Task } from '../../task';
import { Project } from '../../project';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.css']
})
export class ProjectTasksComponent implements OnInit {
  project: Project | null = null;
  tasks: Task[] = [];
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const projectIdParam = params.get('id');
      
      if (projectIdParam) {
        const projectId = parseInt(projectIdParam, 10);
        this.projectService.getProject(projectId).subscribe({
          next: (project) => {
            this.project = project;
            this.loadTasks(projectId);
          },
          error: (error) => {
            this.error = 'Error loading project details';
            console.error('Error loading project:', error);
          }
        });
      } else {
        this.error = 'No project ID provided';
      }
    });
  }

  private loadTasks(projectId: number) {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks.filter(task => task.projectId === projectId);
      },
      error: (error) => {
        this.error = 'Error loading tasks';
        console.error('Error loading tasks:', error);
      }
    });
  }

  createTask(): void {
    if (this.project?.id) {
      this.router.navigate(['/tasks/create'], {
        queryParams: { projectId: this.project.id }
      });
    }
  }

  editTask(taskId: number | null | undefined): void {
    if (taskId) {
      this.router.navigate(['/tasks/edit', taskId]);
    }
  }

  deleteTask(taskId: number | null | undefined): void {
    if (taskId && confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          if (this.project?.id) {
            this.loadTasks(this.project.id);
          }
        },
        error: (error) => {
          this.error = 'Error deleting task';
          console.error('Error deleting task:', error);
        }
      });
    }
  }

  assignTask(taskId: number | null | undefined): void {
    if (taskId) {
      this.taskService.assignTask(taskId).subscribe({
        next: () => {
          if (this.project?.id) {
            this.loadTasks(this.project.id);
          }
        },
        error: (error) => {
          this.error = 'Error assigning task';
          console.error('Error assigning task:', error);
        }
      });
    }
  }

  detachTask(taskId: number | null | undefined): void {
    if (taskId) {
      this.taskService.detachTask(taskId).subscribe({
        next: () => {
          if (this.project?.id) {
            this.loadTasks(this.project.id);
          }
        },
        error: (error) => {
          this.error = 'Error detaching task';
          console.error('Error detaching task:', error);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/projects/list']);
  }

  // Helper method to check if task ID is valid
  isValidTaskId(taskId: number | null | undefined): boolean {
    return taskId !== null && taskId !== undefined;
  }
}
