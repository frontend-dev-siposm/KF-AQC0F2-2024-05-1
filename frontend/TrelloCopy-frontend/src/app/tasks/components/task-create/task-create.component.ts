import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../../task';
import { TaskService } from '../../../task.service';
import { ProjectService } from '../../../project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../../project';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css'
})
export class TaskCreateComponent implements OnInit {
  taskForm: FormGroup;
  projects: Project[] = [];
  currentProjectId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      projectId: [null, Validators.required],
      isCompleted: [false]
    });
  }

  ngOnInit(): void {
    const projectId = this.route.snapshot.queryParamMap.get('projectId');
    if (projectId) {
      this.currentProjectId = +projectId;
      this.taskForm.patchValue({
        projectId: this.currentProjectId
      });
    }

    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = {
        name: this.taskForm.value.name,
        description: this.taskForm.value.description,
        projectId: Number(this.taskForm.value.projectId), 
        isCompleted: this.taskForm.value.isCompleted,
        hasOwner: false,
        owner: '',
        ownerEmail: ''
      };

      this.taskService.createTask(task).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }
}
