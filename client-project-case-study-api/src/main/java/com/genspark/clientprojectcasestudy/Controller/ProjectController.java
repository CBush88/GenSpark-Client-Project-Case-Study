package com.genspark.clientprojectcasestudy.Controller;

import com.genspark.clientprojectcasestudy.Entity.Project;
import com.genspark.clientprojectcasestudy.Service.ProjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class ProjectController {

    @Autowired
    ProjectService projectService;

    Logger log = LoggerFactory.getLogger(ProjectController.class);


    @GetMapping("/projects")
    public List<Project> getProjects(){
        log.info("Made GET request to Rest API. [url=/projects]");
        return this.projectService.getProjects();
    }

    @GetMapping("/projects/{projectId}")
    public Project getProjectById(@PathVariable int projectId){
        log.info("Made GET request to Rest API. [url=/projects/{}]", projectId);
        return this.projectService.getProjectById(projectId);
    }

    @PostMapping("/projects")
    public Project addProject(@RequestBody Project project){
        log.info("Made POST request to Rest API. [url=/projects]");
        return this.projectService.addProject(project);
    }

    @PutMapping("/projects")
    public Project updateProject(@RequestBody Project project){
        log.info("Made PUT request to Rest API. [url=/projects]");
        return this.projectService.updateProject(project);
    }

    @DeleteMapping("/projects/{projectId}")
    public String deleteProject(@PathVariable int projectId){
        log.info("Made DELETE request to Rest API. [url=/projects/{}]", projectId);
        return this.projectService.deleteProject(projectId);
    }
}
