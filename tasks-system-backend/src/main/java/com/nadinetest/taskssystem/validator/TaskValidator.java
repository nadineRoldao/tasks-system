package com.nadinetest.taskssystem.validator;

import com.nadinetest.taskssystem.config.AppMessages;
import com.nadinetest.taskssystem.exception.BadRequestException;
import com.nadinetest.taskssystem.model.Task;
import com.nadinetest.taskssystem.repository.TaskRepository;
import com.nadinetest.taskssystem.response.ErrorResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
public record TaskValidator(TaskRepository taskRepository) implements AppValidator<Task> {

    @Override
    public void validate(Task task) {
        List<ErrorResponse> errors = new ArrayList<>();

        if (StringUtils.isBlank(task.getName())) {
            errors.add(new ErrorResponse("name", AppMessages.TASK_NAME_ERROR));
        }

        if (Objects.isNull(task.getCost())) {
            errors.add(new ErrorResponse("cost", AppMessages.TASK_COST_ERROR));
        }

        if (task.getCost().compareTo(BigDecimal.ZERO) < 0) {
            errors.add(new ErrorResponse("cost", AppMessages.TASK_NEGATIVE_COST_ERROR));
        }

        if (Objects.isNull(task.getDeadline())) {
            errors.add(new ErrorResponse("deadline", AppMessages.TASK_DEADLINE_ERROR));
        }

        if (taskRepository.findByName(task.getName()).isPresent()) {
            errors.add(new ErrorResponse("name", AppMessages.TASK_NAME_ALREADY_EXISTS_ERROR));
        }

        if (!errors.isEmpty()) {
            throw new BadRequestException(errors);
        }
    }
}
