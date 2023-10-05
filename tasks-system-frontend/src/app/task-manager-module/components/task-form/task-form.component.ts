import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TaskService } from "../../services/task.service";
import { Task } from "../../models/task.model";
import { switchMap, of, map } from "rxjs";
import { FormControl, FormGroup } from "@angular/forms";
import { ErrorResponse } from "../../models/error-response.model";
import { HttpErrorResponse } from "@angular/common/http";
      
@Component({
    selector: 'task-form',
    templateUrl: 'task-form.component.html',
    styleUrls: ['task-form.component.css']
})
export class TaskFormComponent implements OnInit {

    isUpdate = false
    taskForm!: FormGroup
    taskBeforeUpdate!: Task
    errors: ErrorResponse[] = []

    constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) {}

    ngOnInit(): void {
        this.buildForm(null)

        this.route.paramMap.pipe(
            switchMap((data: any) => !data.params.id ? of() : this.taskService.getTaskById(data.params.id))
        ).subscribe((data: Task) => {
            this.isUpdate = true
            this.buildForm(data)
            this.taskBeforeUpdate = data

        })
    }

    buildForm(task: Task | null): void {
        let id = null
        if (!!task) {
            id = task.id
        }

        let name = null
        if (!!task) {
            name = task.name
        }

        let cost = null
        if (!!task) {
            cost = task.cost
        }

        let deadline = null
        if (!!task) {
            deadline = task.deadline
        }

        let sequence = null
        if (!!task) {
            sequence = task.sequence
        }

        this.taskForm = new FormGroup({
            id: new FormControl(id),
            name: new FormControl(name),
            cost: new FormControl(cost),
            deadline: new FormControl(deadline),
            sequence: new FormControl(sequence)
        })
    }

    insertOrUpdate(): void {

        if (this.taskForm.invalid) {
            return
        }

        if (this.isUpdate) {
            this.taskService.editTask(this.task, this.taskBeforeUpdate).subscribe({
                complete: () => this.router.navigate(['/tarefas']),
                error: (httpError: HttpErrorResponse) => this.errors = httpError.error
                
            })
        } else {
            this.taskService.createTask(this.task).subscribe({
                complete: () => this.router.navigate(['/tarefas']),
                error: (httpError: HttpErrorResponse) => this.errors = httpError.error
            })
        }
    }

    get name() {
        return this.taskForm.get('name')
    }

    get cost() {
        return this.taskForm.get('cost')
    }

    get deadline() {
        return this.taskForm.get('deadline')
    }

    get task(): Task {
        return {
            id: this.taskForm.get('id')?.value,
            name: this.taskForm.get('name')?.value,
            cost: this.taskForm.get('cost')?.value,
            deadline: this.taskForm.get('deadline')?.value,
            sequence: this.taskForm.get('sequence')?.value
        }
    }


}