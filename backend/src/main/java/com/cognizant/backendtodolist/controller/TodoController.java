package com.cognizant.backendtodolist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.backendtodolist.entity.Task;
import com.cognizant.backendtodolist.repository.TaskRepository;

// For return values to frontend, you can either use @ResponseBody or ResponseEntity

@RestController
@RequestMapping("/tasks")
public class TodoController {
	
	@Autowired
	private TaskRepository taskRepository;

	@CrossOrigin
	@GetMapping("/list")
	public @ResponseBody Iterable<Task> getTasks() {
		
		return taskRepository.findAll();
	}
	
	@CrossOrigin
	@PostMapping("/createTask")
	public ResponseEntity<Task> createTask(@RequestBody Task task) {
		
		ResponseEntity<Task> response;
		
		try {
			Task taskSaved = taskRepository.save(task);
			response = new ResponseEntity<>(taskSaved, HttpStatus.CREATED);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			response = new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
		return response;
	}
	
	
	@CrossOrigin
	@DeleteMapping("/deleteTask/{id}")
	public ResponseEntity<String> deleteTask(@PathVariable(value="id") String theId) {
		
		ResponseEntity<String> response;
		int taskId = Integer.parseInt(theId);
		
		Task theTask = taskRepository.findById(taskId).orElseThrow();
		try {
			taskRepository.delete(theTask);
			response = new ResponseEntity<>("Deleted", HttpStatus.OK);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			response = new ResponseEntity<>("An error occurred", HttpStatus.OK);
		}
		
		return response;
		
	}
	
	@CrossOrigin
	@DeleteMapping("/deleteAll")
	public ResponseEntity<String> deleteAll() {
		
		taskRepository.deleteAll();
		
		return new ResponseEntity<>("List is empty", HttpStatus.OK);
		
	}
	
	@CrossOrigin
	@PutMapping("/updateTask/{id}")
	public String updateTask(@PathVariable(value="id") String theId) {
		
		int taskId = Integer.parseInt(theId);
		
		Task theTask = taskRepository.findById(taskId).orElseThrow();
		
		theTask.setStatus(!theTask.isStatus());
		try {
			taskRepository.save(theTask);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "An error occurred";
		}
		
		return "Updated";
		
	}
	
	@CrossOrigin
	@PutMapping("/updateTaskName/{id}")
	public String updateTaskName(@PathVariable(value="id") String theId, @RequestBody String taskName) {
		
		int taskId = Integer.parseInt(theId);
		
		Task theTask = taskRepository.findById(taskId).orElseThrow();
		
		theTask.setName(taskName);
		try {
			taskRepository.save(theTask);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "An error occurred";
		}
		
		return "Updated";
		
	}
	
}
