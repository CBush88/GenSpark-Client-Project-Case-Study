package com.genspark.clientprojectcasestudy.Entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "tbl_project")
public class Project {
    @Id
    @SequenceGenerator(
            name = "project_seq",
            sequenceName = "project_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "project_seq"
    )
    private int projectId;

    @Column(nullable = false)
    private String projectName;

    private String projectDescription;
    
    public Project() {
    }

    public Project(int projectId, String projectName, String projectDescription) {
        this.projectId = projectId;
        this.projectName = projectName;
        this.projectDescription = projectDescription;
    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getProjectDescription() {
        return projectDescription;
    }

    public void setProjectDescription(String projectDescription) {
        this.projectDescription = projectDescription;
    }

    @Override
    public String toString() {
        return "Project{" +
                "projectId=" + projectId +
                ", projectName='" + projectName + '\'' +
                ", projectDescription='" + projectDescription + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Project project = (Project) o;
        return projectId == project.projectId && Objects.equals(projectName, project.projectName) && Objects.equals(projectDescription, project.projectDescription);
    }

    @Override
    public int hashCode() {
        return Objects.hash(projectId, projectName, projectDescription);
    }
}
