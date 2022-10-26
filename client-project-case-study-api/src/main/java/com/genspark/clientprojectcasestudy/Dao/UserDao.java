package com.genspark.clientprojectcasestudy.Dao;

import com.genspark.clientprojectcasestudy.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User, Integer> {
}
