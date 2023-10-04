package com.nadinetest.taskssystem.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@ToString
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Entity
@Table(name = "tasks")
public class Task implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(length = 100, unique = true, nullable = false)
    private String name;

    private BigDecimal cost;

    @Column(nullable = false)
    private LocalDateTime deadline;

    @Column(unique = true, nullable = false)
    private Long sequence;
}
