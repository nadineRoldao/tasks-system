package com.nadinetest.taskssystem.config;

import com.nadinetest.taskssystem.exception.BadRequestException;
import com.nadinetest.taskssystem.response.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;

@ControllerAdvice
public class AppExceptionHandler {

    @ExceptionHandler(BadRequestException.class)
    public final ResponseEntity<List<ErrorResponse>> handle(BadRequestException exception) {
        var errors = exception.getErrors();

        if (errors.isEmpty()) {
            errors.add(new ErrorResponse("", exception.getMessage()));
        }

        return ResponseEntity.status(404).body(errors);
    }

}
