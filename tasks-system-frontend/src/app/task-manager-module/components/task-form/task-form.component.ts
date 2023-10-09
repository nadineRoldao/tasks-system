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
import { constants } from 'src/app/utils/app-util'

@Component({
    selector: 'task-form',
    templateUrl: 'task-form.component.html',
    styleUrls: ['task-form.component.css']
})
export class TaskFormComponent implements OnInit {

    isUpdate = false
    costFormatted!: string
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
            cost = `R$ ${this.decimalFormat.transform(task.cost)}`
        }

        let deadline = null
        if (!!task) {
            deadline = this.dateFormat.convert(task.deadline)
        }

        let sequence = null
        if (!!task) {
            sequence = task.sequence
        }

        this.taskForm = new FormGroup({
            id: new FormControl(id),
            name: new FormControl(name, [Validators.required]),
            cost: new FormControl(cost, [Validators.required]),
            deadline: new FormControl(deadline, [Validators.required]),
            sequence: new FormControl(sequence)
        })
    }

    insertOrUpdate(): void {        
        if (!this.taskForm.get('deadline')?.value.match(constants.dateValidatorRegex)) {
            this.taskForm.get('deadline')?.setErrors({ isCustomDateInvalid: true })
        }

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
            cost: this.decimalFormat.convert(!!this.costFormatted ? this.costFormatted : this.taskForm.get('cost')?.value),
            deadline: this.dateFormat.transform(this.taskForm.get('deadline')?.value),
            sequence: this.taskForm.get('sequence')?.value
        }
    }

    updateCostValue(value: any | string): void {
        this.costFormatted = value
    }


}