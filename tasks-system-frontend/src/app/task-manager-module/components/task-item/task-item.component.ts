import { Component, EventEmitter, Input, Output, TemplateRef } from "@angular/core";
import { Task } from "../../models/task.model";
import { TaskService } from "../../services/task.service";
import { TaskChangeSequence } from "../../models/task-change-sequence.model";
import { Router } from "@angular/router";
import { ModalService } from "src/app/services/modal.service";

@Component({
    selector: '[task-item]',
    templateUrl: 'task-item.component.html',
    styleUrls: ['task-item.component.css']
})
export class TaskItemComponent {

    @Input()
    task!: Task

    @Input()
    isLastTask!: boolean

    @Input()
    isFirstTask!: boolean

    @Output()
    taskChangeSequenceEmitter: EventEmitter<TaskChangeSequence> = new EventEmitter()

    constructor(private taskService: TaskService, private modalService: ModalService){}

    changeSequence(sequence: number, direction: 'UP' | 'DOWN'): void {
        this.taskChangeSequenceEmitter.emit({ sequence, direction })
    }

    deleteTask(): void {
        this.modalService
        .open({ size: 'lg', title: 'Deseja mesmo alterar este item?' })
        .subscribe(() => {
            this.taskService.deleteTask(this.task.id).subscribe({
                complete: () => window.location.reload()
            })     
        })
    }
}