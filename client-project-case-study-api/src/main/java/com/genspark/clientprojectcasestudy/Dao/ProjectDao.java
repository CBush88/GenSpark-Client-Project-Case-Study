package com.genspark.clientprojectcasestudy.Dao;

import com.genspark.clientprojectcasestudy.Entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectDao extends JpaRepository<Project, Integer> {
}
