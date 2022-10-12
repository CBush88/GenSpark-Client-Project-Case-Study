package com.genspark.clientprojectcasestudy.Controller;

import com.genspark.clientprojectcasestudy.Entity.Project;
import com.genspark.clientprojectcasestudy.Service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class ProjectController {

    @Autowired
    ProjectService projectService;

    @GetMapping("/projects")
    public List<Project> getProjects(){
        return this.projectService.getProjects();
    }

    @GetMapping("/projects/{projectId}")
    public Project getProjectById(@PathVariable int projectId){
        return this.projectService.getProjectById(projectId);
    }

    @PostMapping("/projects")
    public Project addProject(@RequestBody Project project){
        return this.projectService.addProject(project);
    }

    @PutMapping("/projects")
    public Project updateProject(@RequestBody Project project){
        return this.projectService.updateProject(project);
    }

    @DeleteMapping("/projects/{projectId}")
    public String deleteProject(@PathVariable int projectId){
        return this.projectService.deleteProject(projectId);
    }
}
