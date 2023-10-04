package com.nadinetest.taskssystem.config;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class AppUtil {

    public static final String DEFAULT_DATETIME_FORMAT = "yyyy-MM-dd hh:mm:ss";

    public static LocalDateTime stringToLocalDateTime(String value) {
        return LocalDateTime.parse(value, DateTimeFormatter.ofPattern(DEFAULT_DATETIME_FORMAT));
    }

}
