package com.genspark.clientprojectcasestudy.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.genspark.clientprojectcasestudy.Entity.Project;
import com.genspark.clientprojectcasestudy.Service.ProjectService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ProjectControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    ProjectService projectService;

    @Autowired
    ObjectMapper objectMapper;

    Project project1;
    Project project2;
    Project project3;

    List<Project> projectList;

    @BeforeEach
    void setUp() {
        project1 = new Project(1, "Super Cool Project", "Actually kinda lame");
        project2 = new Project(2, "Super Lame Project", "Actually not that bad");
        project3 = new Project(3, "Generic Project", "At least it's not front-end");
        projectList = List.of(project1, project2, project3);
    }

    @Test
    void getProjectsTest() throws Exception {
        when(projectService.getProjects()).thenReturn(projectList);
        mockMvc.perform(MockMvcRequestBuilders
                .get("/projects")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[1].projectName", is("Super Lame Project")))
                .andExpect(content().string(objectMapper.writeValueAsString(projectList)));
    }

    @Test
    void getProjectByIdTest() throws Exception {
        when(projectService.getProjectById(1)).thenReturn(project1);
        mockMvc.perform(MockMvcRequestBuilders
                .get("/projects/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.projectName", is("Super Cool Project")))
                .andExpect(content().string(objectMapper.writeValueAsString(project1)));
    }

    @Test
    void addProjectTest() throws Exception {
        Project project4 = new Project(4, "Small Project", "Small team project");
        when(projectService.addProject(project4)).thenReturn(project4);
        mockMvc.perform(MockMvcRequestBuilders
                .post("/projects")
                .content(objectMapper.writeValueAsString(project4))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.projectName", is("Small Project")))
                .andExpect(content().string(objectMapper.writeValueAsString(project4)));
    }

    @Test
    void updateProjectTest() throws Exception {
        when(projectService.updateProject(project3)).thenReturn(project3);
        mockMvc.perform(MockMvcRequestBuilders
                        .put("/projects")
                        .content(objectMapper.writeValueAsString(project3))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.projectName", is("Generic Project")))
                .andExpect(content().string(objectMapper.writeValueAsString(project3)));
    }

    @Test
    void deleteProjectTest() throws Exception {
        when(projectService.deleteProject(1)).thenReturn("Deleted Successfully");
        mockMvc.perform(MockMvcRequestBuilders
                .delete("/projects/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("Deleted Successfully"));
    }
}