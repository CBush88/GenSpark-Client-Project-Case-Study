package com.genspark.clientprojectcasestudy.Dao;

import com.genspark.clientprojectcasestudy.Entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectDao extends JpaRepository<Project, Integer> {
}
