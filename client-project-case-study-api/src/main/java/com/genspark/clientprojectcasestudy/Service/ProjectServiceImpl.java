package com.genspark.clientprojectcasestudy.Service;

import com.genspark.clientprojectcasestudy.Dao.ProjectDao;
import com.genspark.clientprojectcasestudy.Entity.Project;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    ProjectDao projectDao;

    Logger log = LoggerFactory.getLogger(ProjectService.class);

    @Override
    public List<Project> getProjects() {
        log.info("Made request to Project Service. [method=getProjects()]");
        return this.projectDao.findAll();
    }

    @Override
    public Project getProjectById(int projectId) {
        log.info("Made request to Project Service. [method=getProjectById({})]", "projectId");
        return this.projectDao.findById(projectId).orElseThrow();
    }

    @Override
    public Project addProject(Project project) {
        log.info("Made request to Project Service. [method=AddProject({})]", "project");
        return this.projectDao.save(project);
    }

    @Override
    public Project updateProject(Project project) {
        log.info("Made request to Project Service. [method=updateProject({})]", "project");
        return this.projectDao.save(project);
    }

    @Override
    public String deleteProject(int projectId) {
        log.info("Made request to Project Service. [method=deleteProject({})]", "projectId");
        this.projectDao.deleteById(projectId);
        return "Deleted Successfully";
    }
}
