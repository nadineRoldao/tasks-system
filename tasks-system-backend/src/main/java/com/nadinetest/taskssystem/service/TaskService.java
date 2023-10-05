package com.nadinetest.taskssystem.service;


import com.nadinetest.taskssystem.model.Task;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface TaskService {

    List<Task> getTasks();

    Task getTaskById(Long id);

    void deleteTask(Long id);

    Task editTask(Long id, String name, BigDecimal cost, LocalDateTime deadline);

    Task createTask(Task task);

    void changeSequence(Long currentSequence, Long newSequence);

}
