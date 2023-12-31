package com.nadinetest.taskssystem.controller;

import com.nadinetest.taskssystem.model.Task;
import com.nadinetest.taskssystem.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("tasks")
@CrossOrigin(origins = {"http://192.168.176.155:4200", "http://localhost:4200", "http://149.100.154.83", "http://149.100.154.83:80", "http://149.100.154.83:4200"})
public record TaskController(TaskService taskService) {

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Task> getTasks() {
        System.out.println("http://192.168.176.155:4200, http://localhost:4200");
        return taskService.getTasks();
    }

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public Task getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public Task editTask(@PathVariable Long id,
                         @RequestParam(value = "name", required = false) String name,
                         @RequestParam(value = "cost", required = false) BigDecimal cost,
                         @RequestParam(value = "deadline", required = false) LocalDateTime deadline) {
        return taskService.editTask(id, name, cost, deadline);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @PatchMapping("{currentSequence}/change-sequence")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void changeSequence(@PathVariable Long currentSequence,
                               @RequestParam Long newSequence) {
        taskService.changeSequence(currentSequence, newSequence);
    }


}
