import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "../models/task.model";

@Injectable()
export class TaskService {

    urlBase = "http://192.168.176.155:8088/tasks"

    constructor(private http: HttpClient) {

    }

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.urlBase)
    }

    deleteTask(id: number): Observable<any> {
        return this.http.delete<any>(`${this.urlBase}/${id}`)
    }

    createTask(task: Task): Observable<Task> {
        return this.http.post<Task>(this.urlBase, task)
    }

    editTask(task:Task, oldTask: Task): Observable<Task> {
        let editUri = ''

        if (task.name !== oldTask.name) {
            editUri = `${editUri}name=${task.name}&`
        }
        if (task.cost !== oldTask.cost) {
            editUri = `${editUri}cost=${task.cost}&`
        }
        if (task.deadline !== oldTask.deadline) {
            editUri = `${editUri}deadline=${task.deadline}`
        }

        return this.http.put<Task>(`${this.urlBase}/${task.id}?${editUri}`, {})
    }

    getTaskById(id: number): Observable<Task> {
        return this.http.get<Task>(`${this.urlBase}/${id}`)
    }

    changeSequence(currentSequence: number, newSequence: number): Observable<any> {
        const changeSeqUrl = `${this.urlBase}/${currentSequence}/change-sequence?newSequence=${newSequence}`
        return this.http.patch<any>(changeSeqUrl, {})
    }

}