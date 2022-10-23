package com.genspark.clientprojectcasestudy.Service;

import com.genspark.clientprojectcasestudy.Dao.UserDao;
import com.genspark.clientprojectcasestudy.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    @Override
    public List<User> getUsers() {
        return this.userDao.findAll();
    }

    @Override
    public User getUserById(int userId) {
        return this.userDao.findById(userId).orElseThrow();
    }

    @Override
    public User addUser(User user) {
        return this.userDao.save(user);
    }

    @Override
    public User updateUser(User user) {
        return this.userDao.save(user);
    }

    @Override
    public String deleteUser(int userId) {
        this.userDao.deleteById(userId);
        return "Deleted Successfully";
    }
}
