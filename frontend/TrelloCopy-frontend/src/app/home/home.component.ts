import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { TaskService } from '../task.service';
import { Project } from '../project';
import { Task } from '../task';
import * as d3 from 'd3';

interface ProjectStatus {
  name: string;
  totalTasks: number;
  completedTasks: number;
  completionPercentage: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('chartContainer') private chartContainer!: ElementRef;
  
  private projectStatuses: ProjectStatus[] = [];
  private svg: any;
  private margin = { top: 20, right: 20, bottom: 100, left: 60 };
  private width = 800;
  private height = 400;

  public currentUserEmail$ = this.authService.currentUserEmail$;
  public selectedProject: Project | null = null;
  public projectTasks: Task[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private projectService: ProjectService,
    private taskService: TaskService
  ) {}

  public get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  ngOnInit() {
    if (this.isAuthenticated) {
      this.loadData();
    }
  }

  private loadData() {
    this.projectService.getProjects().subscribe(projects => {
      this.taskService.getTasks().subscribe(tasks => {
        this.processData(projects, tasks);
        this.createChart();
      });
    });
  }

  private processData(projects: Project[], tasks: Task[]) {
    this.projectStatuses = projects.map(project => {
      const projectTasks = tasks.filter(task => task.projectId === project.id);
      const completedTasks = projectTasks.filter(task => task.isCompleted).length;
      const totalTasks = projectTasks.length;
      const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

      return {
        name: project.name,
        totalTasks,
        completedTasks,
        completionPercentage
      };
    });
  }

  private createChart() {
    if (!this.chartContainer) return;

    // Remove any existing SVG
    d3.select(this.chartContainer.nativeElement).select('svg').remove();

    // Create SVG
    this.svg = d3.select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    // Create scales
    const x = d3.scaleBand()
      .range([0, this.width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .range([this.height, 0]);

    // Set domains
    x.domain(this.projectStatuses.map(d => d.name));
    y.domain([0, 100]); // Percentage scale from 0 to 100

    // Add X axis with enhanced project names
    this.svg.append('g')
      .attr('class', 'x-axis-label')
      .attr('transform', `translate(0,${this.height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('fill', 'black')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)')
      .style('opacity', 1);

    // Add Y axis
    this.svg.append('g')
      .call(d3.axisLeft(y).ticks(10).tickFormat(d => d + '%'));

    // Create bars with tooltips and click handlers
    const bars = this.svg.selectAll('.bar')
      .data(this.projectStatuses)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: ProjectStatus) => x(d.name)!)
      .attr('width', x.bandwidth())
      .attr('y', (d: ProjectStatus) => y(d.completionPercentage))
      .attr('height', (d: ProjectStatus) => this.height - y(d.completionPercentage))
      .attr('fill', (d: ProjectStatus) => this.getColorByCompletion(d.completionPercentage))
      .on('click', (event: any, d: ProjectStatus) => this.onProjectClick(d));

    // Add tooltips
    bars.append('title')
      .text((d: ProjectStatus) => `${d.name}\nCompleted: ${d.completedTasks}/${d.totalTasks} tasks\nCompletion: ${Math.round(d.completionPercentage)}%`);

    // Add labels
    this.svg.selectAll('.label')
      .data(this.projectStatuses)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (d: ProjectStatus) => x(d.name)! + x.bandwidth() / 2)
      .attr('y', (d: ProjectStatus) => y(d.completionPercentage) - 5)
      .attr('text-anchor', 'middle')
      .text((d: ProjectStatus) => `${Math.round(d.completionPercentage)}%`);
  }

  private getColorByCompletion(percentage: number): string {
    if (percentage >= 80) return '#28a745'; // Green for high completion
    if (percentage >= 50) return '#ffc107'; // Yellow for medium completion
    return '#dc3545'; // Red for low completion
  }

  private onProjectClick(projectStatus: ProjectStatus) {
    this.projectService.getProjects().subscribe(projects => {
      const project = projects.find(p => p.name === projectStatus.name);
      if (project && project.id) {
        this.router.navigate(['/project', project.id, 'tasks']);
      }
    });
  }
}
