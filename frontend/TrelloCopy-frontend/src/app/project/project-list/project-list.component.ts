import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from '../../../app/project';
import { ProjectService } from '../../../app/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  error: string = '';

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects()
      .subscribe({
        next: (projects) => {
          this.projects = projects;
        },
        error: (error) => {
          if (error.status === 0) {
            this.error = 'Unable to connect to the API. Please ensure the backend server is running and check if you have accepted the development certificate (visit https://localhost:7295 directly in browser to accept it).';
          } else if (error.status === 404) {
            this.error = 'API endpoint not found. Please check the API URL.';
          } else {
            this.error = `Error loading projects: ${error.message || 'Please try again later.'}`;
          }
          console.error('Error loading projects:', error);
        }
      });
  }

  editProject(projectId: number | null | undefined): void {
    if (!projectId) {
      console.error('Cannot edit project: Invalid project ID');
      return;
    }
    this.router.navigate([`/projects/edit/${projectId}`]);
  }

  deleteProject(projectId: number | null | undefined): void {
    if (!projectId) {
      console.error('Cannot delete project: Invalid project ID');
      return;
    }
    
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(projectId).subscribe({
        next: () => {
          this.loadProjects(); // Reload the projects after deletion
        },
        error: (error) => {
          this.error = `Error deleting project: ${error.message || 'Please try again later.'}`;
          console.error('Error deleting project:', error);
        }
      });
    }
  }

  createProject(): void {
    this.router.navigate([`/projects/create`]);
  }

  viewTasks(projectId: number | null | undefined): void {
    if (!projectId) {
      console.error('Cannot view tasks: Invalid project ID');
      return;
    }
    console.log('Navigating to tasks for project:', projectId);
    this.router.navigate([`/projects/${projectId}/tasks`]);
  }
}
