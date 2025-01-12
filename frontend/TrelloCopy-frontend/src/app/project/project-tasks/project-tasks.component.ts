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

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('ProjectTasksComponent initialized');
    this.route.paramMap.subscribe(params => {
      console.log('Route params:', params);
      const projectIdParam = params.get('id');
      console.log('Project ID param:', projectIdParam);
      
      if (projectIdParam) {
        const projectId = parseInt(projectIdParam, 10);
        console.log('Parsed project ID:', projectId);
        
        this.projectService.getProject(projectId).subscribe({
          next: (project) => {
            console.log('Loaded project:', project);
            this.project = project;
            this.loadTasks(projectId);
          },
          error: (error) => {
            console.error('Error loading project:', error);
          }
        });
      } else {
        console.error('No project ID provided in route');
      }
    });
  }

  private loadTasks(projectId: number) {
    console.log('Loading tasks for project:', projectId);
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        console.log('All tasks:', tasks);
        this.tasks = tasks.filter(task => task.projectId === projectId);
        console.log('Filtered tasks:', this.tasks);
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/projects/list']);
  }
}
