package com.genspark.clientprojectcasestudy.Service;

import com.genspark.clientprojectcasestudy.Dao.UserDao;
import com.genspark.clientprojectcasestudy.Entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    Logger log = LoggerFactory.getLogger(UserService.class);

    @Override
    public List<User> getUsers() {
        log.info("Made request to User Service. [method=getUsers()]");
        return this.userDao.findAll();
    }

    @Override
    public User getUserById(int userId) {
        log.info("Made request to User Service. [method=getUserById({})]", "userId");
        return this.userDao.findById(userId).orElseThrow();
    }

    @Override
    public User addUser(User user) {
        log.info("Made request to User Service. [method=addUser({})]", "user");
        if(user.getRole().equals("")){
            user.setRole("view");
        }
        return this.userDao.save(user);
    }

    @Override
    public User updateUser(User user) {
        log.info("Made request to User Service. [method=updateUser({})]", "user");
        return this.userDao.save(user);
    }

    @Override
    public String deleteUser(int userId) {
        log.info("Made request to User Service. [method=deleteUser({})]", "userId");
        this.userDao.deleteById(userId);
        return "Deleted Successfully";
    }
}
