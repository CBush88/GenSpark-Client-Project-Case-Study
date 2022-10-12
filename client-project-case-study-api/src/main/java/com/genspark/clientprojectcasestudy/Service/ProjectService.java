package com.genspark.clientprojectcasestudy.Service;

import com.genspark.clientprojectcasestudy.Entity.Project;

import java.util.List;

public interface ProjectService {
    List<Project> getProjects();
    Project getProjectById(int projectId);
    Project addProject(Project project);
    Project updateProject(Project project);
    String deleteProject(int projectId);
}
