import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TaskManagerComponent } from "./task-manager.component";
import { TaskListComponent } from "./components/task-list/task-list.component";
import { TaskItemComponent } from "./components/task-item/task-item.component";
import { TaskFormComponent } from "./components/task-form/task-form.component";
import { TaskService } from "./services/task.service";

const routes: Routes = [
    {
        path: '', 
        component: TaskManagerComponent,
        children: [
            {path: '', component: TaskListComponent},
            {path: 'nova-tarefa', component: TaskFormComponent},
            {path: ':id/editar-tarefa', component: TaskFormComponent}


        ]
    }
]

@NgModule({
    declarations: [
        TaskManagerComponent,
        TaskListComponent,
        TaskItemComponent,
        TaskFormComponent
    ],
    imports: [
        HttpClientModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes) 
    ],
    providers: [
        TaskService
    ]
})
export class TaskModule {

}