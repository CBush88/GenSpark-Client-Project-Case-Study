package com.genspark.clientprojectcasestudy.Controller;

import com.genspark.clientprojectcasestudy.Entity.User;
import com.genspark.clientprojectcasestudy.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/users")
    public List<User> getUsers(){
        return this.userService.getUsers();
    }
    @GetMapping("/users/{userId}")
    public User getUserById(@PathVariable int userId){
        return this.userService.getUserById(userId);
    }
    @PostMapping("/users")
    public User addUser(@RequestBody User user){
        return this.userService.addUser(user);
    }
    @PutMapping("/users")
    public User updateUser(@RequestBody User user){
        return this.userService.updateUser(user);
    }
    @DeleteMapping("/users/{userId}")
    public String deleteUser(@PathVariable int userId){
        return this.userService.deleteUser(userId);
    }
}
