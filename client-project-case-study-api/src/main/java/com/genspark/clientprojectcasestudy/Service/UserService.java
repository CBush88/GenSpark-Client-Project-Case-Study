package com.genspark.clientprojectcasestudy.Service;

import com.genspark.clientprojectcasestudy.Entity.User;

import java.util.List;

public interface UserService {
    List<User> getUsers();
    User getUserById(int userId);
    User addUser(User user);
    User updateUser(User user);
    String deleteUser(int userId);
}
