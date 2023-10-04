package com.nadinetest.taskssystem.repository;

import com.nadinetest.taskssystem.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findAllByOrderBySequenceAsc();

    Optional<Task> findByName(String name);

    List<Task> findBySequenceIn(List<Long> sequences);

    Optional<Task> findTopByOrderBySequenceDesc();

}
