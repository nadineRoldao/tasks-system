package com.nadinetest.taskssystem.exception;

import com.nadinetest.taskssystem.response.ErrorResponse;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class BadRequestException extends RuntimeException {

    List<ErrorResponse> errors = new ArrayList<>();

    public BadRequestException(List<ErrorResponse> errors) {
        this.errors = errors;
    }

    public BadRequestException(String message) {
        super(message);
    }

}
