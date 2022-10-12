package com.genspark.clientprojectcasestudy.Service;

import com.genspark.clientprojectcasestudy.Dao.ProjectDao;
import com.genspark.clientprojectcasestudy.Entity.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    ProjectDao projectDao;

    @Override
    public List<Project> getProjects() {
        return this.projectDao.findAll();
    }

    @Override
    public Project getProjectById(int projectId) {
        return this.projectDao.findById(projectId).orElseThrow();
    }

    @Override
    public Project addProject(Project project) {
        return this.projectDao.save(project);
    }

    @Override
    public Project updateProject(Project project) {
        return this.projectDao.save(project);
    }

    @Override
    public String deleteProject(int projectId) {
        this.projectDao.deleteById(projectId);
        return "Deleted Successfully";
    }
}
