package com.genspark.clientprojectcasestudy.Dao;

import com.genspark.clientprojectcasestudy.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User, Integer> {
}
