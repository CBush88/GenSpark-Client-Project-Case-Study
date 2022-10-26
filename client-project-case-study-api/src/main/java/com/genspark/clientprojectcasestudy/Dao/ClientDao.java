package com.genspark.clientprojectcasestudy.Dao;

import com.genspark.clientprojectcasestudy.Entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientDao extends JpaRepository<Client, Integer> {
}
