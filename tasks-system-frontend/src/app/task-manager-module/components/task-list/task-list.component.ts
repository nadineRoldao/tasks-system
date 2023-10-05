import { Component, OnInit } from "@angular/core";
import { Task } from "../../models/task.model";
import { TaskService } from "../../services/task.service";
import { TaskChangeSequence } from "../../models/task-change-sequence.model";

@Component({
    selector: 'task-list',
    templateUrl: 'task-list.component.html',
    styleUrls: ['task-list.component.css']
})
export class TaskListComponent implements OnInit {
    
    tasks: Task[] = []

    constructor(private taskService: TaskService){}
    
    ngOnInit(): void {
       this.taskService.getTasks().subscribe((taskResponse: Task[]) => {
            this.tasks = taskResponse
       })
    }

    changeTaskSequence(event: TaskChangeSequence): void {
        let currentTask: Task = {} as Task
        let newTask: Task = {} as Task

        for(let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].sequence === event.sequence) {
                currentTask = this.tasks[i]
                newTask = event.direction === 'UP' ? this.tasks[i - 1] : this.tasks[i + 1]
                
                break;
            }
        }

        this.taskService.changeSequence(currentTask.sequence, newTask.sequence).subscribe({
            complete: () => {
                const seqAux = currentTask.sequence
                currentTask.sequence = newTask.sequence
                newTask.sequence = seqAux
                this.tasks.sort((t1, t2) => t1.sequence > t2.sequence ? 1 : -1)
            }
        })
    }
}