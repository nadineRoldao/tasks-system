package com.nadinetest.taskssystem.service.impl;

import com.nadinetest.taskssystem.config.AppMessages;
import com.nadinetest.taskssystem.exception.BadRequestException;
import com.nadinetest.taskssystem.model.Task;
import com.nadinetest.taskssystem.repository.TaskRepository;
import com.nadinetest.taskssystem.response.ErrorResponse;
import com.nadinetest.taskssystem.service.TaskService;
import com.nadinetest.taskssystem.validator.TaskValidator;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
public record TaskServiceImpl(TaskRepository taskRepository, TaskValidator validator) implements TaskService {

    @Override
    public List<Task> getTasks() {
        return taskRepository.findAllByOrderBySequenceAsc();
    }

    @Override
    public Task getTaskById(Long id) {
        Task task = taskRepository
                .findById(id)
                .orElseThrow(() -> new BadRequestException(AppMessages.TASK_NOT_FOUND_ERROR));
        return task;
    }

    @Override
    public void deleteTask(Long id) {
        Task task = taskRepository
                .findById(id)
                .orElseThrow(() -> new BadRequestException(AppMessages.TASK_NOT_FOUND_ERROR));

        taskRepository.delete(task);
    }

    @Override
    public Task editTask(Long id, String name, BigDecimal cost, LocalDateTime deadline) {
        Task task = taskRepository
                .findById(id)
                .orElseThrow(() -> new BadRequestException(AppMessages.TASK_NOT_FOUND_ERROR));

        if (Objects.nonNull(name)) {
            if (taskRepository.findByName(name).isPresent()) {
                throw new BadRequestException(AppMessages.TASK_NAME_ALREADY_EXISTS_ERROR);
            }
            task.setName(name);
        }

        if (Objects.nonNull(cost)) {
            if (task.getCost().compareTo(BigDecimal.ZERO) < 0) {
                throw new BadRequestException(AppMessages.TASK_NEGATIVE_COST_ERROR);
            }
            task.setCost(cost);
        }

        if (Objects.nonNull(deadline)) {
            task.setDeadline(deadline);
        }



        return taskRepository.save(task);
    }

    @Override
    public Task createTask(Task task) {
        validator.validate(task);
        task.setSequence(getNextSequence());

        return taskRepository.save(task);
    }

    @Override
    public void changeSequence(Long currentSeq, Long newSeq) {
        List<Long> sequences = List.of(currentSeq, newSeq);
        List<Task> tasks = taskRepository.findBySequenceIn(sequences);

        if (tasks.size() != 2) {
            throw new BadRequestException(AppMessages.TASK_SEQUENCE_CHANGE_ERROR);
        }

        Task currentTask = tasks
                .stream().filter((task) -> task.getSequence().equals(currentSeq)).findFirst().get();

        Task newTask = tasks
                .stream().filter((task) -> task.getSequence().equals(newSeq)).findFirst().get();

        currentTask.setSequence(newSeq);
        newTask.setSequence(currentSeq);

        taskRepository.saveAll(tasks);
    }

    private Long getNextSequence() {
        Task lastTask = taskRepository
                .findTopByOrderBySequenceDesc()
                .orElse(Task.builder().sequence(0L).build());

        return lastTask.getSequence() + 1;
    }
}
