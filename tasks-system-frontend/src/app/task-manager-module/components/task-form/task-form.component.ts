import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TaskService } from "../../services/task.service";
import { Task } from "../../models/task.model";
import { switchMap, of, map } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ErrorResponse } from "../../models/error-response.model";
import { HttpErrorResponse } from "@angular/common/http";
import { DateFormatCustomPipe } from "src/app/pipes/date-format-custom.pipe";
import { DecimalFormatterCustomPipe } from "src/app/pipes/decimal-formatter-custom.pipe";

@Component({
    selector: 'task-form',
    templateUrl: 'task-form.component.html',
    styleUrls: ['task-form.component.css']
})
export class TaskFormComponent implements OnInit {

    isUpdate = false
    costFormatted = ''
    taskForm!: FormGroup
    taskBeforeUpdate!: Task
    errors: ErrorResponse[] = []
    dateFormat = new DateFormatCustomPipe()
    decimalFormat = new DecimalFormatterCustomPipe()

    constructor(private route: ActivatedRoute, 
                private taskService: TaskService, 
                private router: Router) {}

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

        let deadline = "15/02/2023"
        if (!!task) {
            deadline = task.deadline
        }

        let sequence = null
        if (!!task) {
            sequence = task.sequence
        }

        this.taskForm = new FormGroup({
            id: new FormControl(id),
            name: new FormControl(name, [Validators.required]),
            cost: new FormControl(cost, [Validators.required]),
            deadline: new FormControl(deadline, [Validators.required, Validators.pattern(/^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g)]),
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
            cost: this.decimalFormat.convert(this.costFormatted),
            deadline: this.dateFormat.transform(this.taskForm.get('deadline')?.value),
            sequence: this.taskForm.get('sequence')?.value
        }
    }

    updateCostValue(value: any | string): void {
        this.costFormatted = value
    }


}