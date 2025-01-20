import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectTasksComponent } from './project-tasks/project-tasks.component';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectEditComponent,
    ProjectCreateComponent,
    ProjectTasksComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProjectModule { }
