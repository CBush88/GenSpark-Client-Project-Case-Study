package com.genspark.clientprojectcasestudy.Controller;

import com.genspark.clientprojectcasestudy.Entity.User;
import com.genspark.clientprojectcasestudy.Service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class UserController {
    @Autowired
    UserService userService;

    Logger log = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/users")
    public List<User> getUsers(){
        log.info("Made GET request to Rest API. [url=/users]");
        return this.userService.getUsers();
    }
    @GetMapping("/users/{userId}")
    public User getUserById(@PathVariable int userId){
        log.info("Made GET request to Rest API. [url=/users/{}]", userId);
        return this.userService.getUserById(userId);
    }
    @PostMapping("/users")
    public User addUser(@RequestBody User user){
        log.info("Made GET request to Rest API. [url=/users]");
        return this.userService.addUser(user);
    }
    @PutMapping("/users")
    public User updateUser(@RequestBody User user){
        log.info("Made GET request to Rest API. [url=/users]");
        return this.userService.updateUser(user);
    }
    @DeleteMapping("/users/{userId}")
    public String deleteUser(@PathVariable int userId){
        log.info("Made GET request to Rest API. [url=/users/{}]", userId);
        return this.userService.deleteUser(userId);
    }
}
