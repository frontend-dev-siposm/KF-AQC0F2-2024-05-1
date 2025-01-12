import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../../task';
import { TaskService } from '../../../task.service';
import { ProjectService } from '../../../project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../../project';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent implements OnInit {
  taskForm: FormGroup;
  taskId: number | null = null;
  projects: Project[] = [];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      projectId: [ Validators.required],
      isCompleted: [false]
    });
  }

  ngOnInit(): void {
    // Get task ID from route params
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskId = +id;
      this.loadTask(this.taskId);
    }

    // Load all projects
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  loadTask(id: number): void {
    this.taskService.getTask(id).subscribe(task => {
      this.taskForm.patchValue({
        name: task.name,
        description: task.description,
        projectId: task.projectId,
        isCompleted: task.isCompleted
      });
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = {
        id: this.taskId,
        name: this.taskForm.value.name,
        description: this.taskForm.value.description,
        projectId: this.taskForm.value.projectId,
        isCompleted: this.taskForm.value.isCompleted,
        hasOwner: false,
        owner: '',
        ownerEmail: ''
      };

      if (this.taskId) {
        // Update existing task
        this.taskService.updateTask(this.taskId, task).subscribe(() => {
          this.router.navigate(['/tasks']);
        });
      } else {
        // Create new task
        this.taskService.createTask(task).subscribe(() => {
          this.router.navigate(['/tasks']);
        });
      }
    }
  }
}
