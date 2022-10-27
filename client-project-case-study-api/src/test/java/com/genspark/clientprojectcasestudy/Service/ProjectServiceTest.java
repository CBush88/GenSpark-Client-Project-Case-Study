package com.genspark.clientprojectcasestudy.Service;

import com.genspark.clientprojectcasestudy.Dao.ProjectDao;
import com.genspark.clientprojectcasestudy.Entity.Project;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class ProjectServiceTest {

    @Autowired
    ProjectService projectService;

    @MockBean
    ProjectDao projectDao;

    Project project1;
    Project project2;
    Project project3;
    List<Project> projectList;

    @BeforeEach
    void setUp() {
        project1 = new Project(1, "Super Cool Project", "Actually kinda lame");
        project2 = new Project(2, "Lame Project", "At least it's not frontend");
        project3 = new Project(3, "Generic Project", "Neither cool nor lame");
        projectList = List.of(project1, project2, project3);
    }

    @Test
    void getProjectsTest() {
        when(this.projectDao.findAll()).thenReturn(projectList);
        List<Project> testList = this.projectService.getProjects();
        assertEquals(testList, List.of(project1, project2, project3));
    }

    @Test
    void getProjectByIdTest() {
        when(this.projectDao.findById(2)).thenReturn(Optional.of(project2));
        Project testProject = this.projectService.getProjectById(2);
        assertEquals(testProject, project2);
    }

    @Test
    void addProjectTest() {
        when(this.projectDao.save(project1)).thenReturn(project1);
        Project testProject = this.projectService.addProject(project1);
        assertEquals(testProject, project1);
    }

    @Test
    void updateProjectTest() {
        when(this.projectDao.save(project3)).thenReturn(project3);
        Project testProject = this.projectService.addProject(project3);
        assertEquals(testProject, project3);
    }

    @Test
    void deleteProjectTest() {
        this.projectDao.deleteById(1);
        verify(projectDao, times(1)).deleteById(1);
    }
}