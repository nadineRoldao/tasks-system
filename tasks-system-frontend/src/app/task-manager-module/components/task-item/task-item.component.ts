import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Task } from "../../models/task.model";
import { TaskService } from "../../services/task.service";
import { TaskChangeSequence } from "../../models/task-change-sequence.model";
import { Router } from "@angular/router";

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

    constructor(private taskService: TaskService, private router: Router){}

    deleteTask():void {
        this.taskService.deleteTask(this.task.id).subscribe({
            complete: () => this.router.navigate(['/tarefas'])
        })
    }

    changeSequence(sequence: number, direction: 'UP' | 'DOWN'): void {
        this.taskChangeSequenceEmitter.emit({ sequence, direction })
        
    }

}