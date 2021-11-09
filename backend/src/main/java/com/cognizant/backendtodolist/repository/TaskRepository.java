package com.cognizant.backendtodolist.repository;

import org.springframework.data.repository.CrudRepository;

import com.cognizant.backendtodolist.entity.Task;

public interface TaskRepository extends CrudRepository<	Task, Integer> {

}
