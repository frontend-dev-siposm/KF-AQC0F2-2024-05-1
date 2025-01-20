import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../../app/project';
import { ProjectService } from '../../../app/project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  projectForm: FormGroup;
  projectId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projectId = +id;
      this.loadProject(this.projectId);
    }
  }

  loadProject(id: number): void {
    this.projectService.getProject(id).subscribe(project => {
      this.projectForm.patchValue({
        name: project.name
      });
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const project: Project = {
        id: this.projectId,
        name: this.projectForm.value.name
      };

      if (this.projectId) {
        this.projectService.updateProject(this.projectId, project).subscribe(() => {
          this.router.navigate(['/projects']);
        });
      } else {
        this.projectService.createProject(project).subscribe(() => {
          this.router.navigate(['/projects']);
        });
      }
    }
  }
}
