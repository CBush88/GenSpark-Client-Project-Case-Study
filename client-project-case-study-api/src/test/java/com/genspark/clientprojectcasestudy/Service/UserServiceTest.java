package com.genspark.clientprojectcasestudy.Service;

import com.genspark.clientprojectcasestudy.Dao.UserDao;
import com.genspark.clientprojectcasestudy.Entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class UserServiceTest {

    @Autowired
    UserService userService;

    @MockBean
    UserDao userDao;

    User user1;
    User user2;
    User user3;
    List<User> userList;

    @BeforeEach
    void setUp() {
        user1 = new User(1, "user", "Password123", "viewer");
        user2 = new User(2, "user2", "superSecret321", "admin");
        user3 = new User(3, "user3", "Security231", "viewer");
        userList = List.of(user1, user2, user3);
    }

    @Test
    void getUsersTest() {
        when(this.userDao.findAll()).thenReturn(userList);
        List<User> testList = this.userService.getUsers();
        assertEquals(testList, userList);
    }

    @Test
    void getUserByIdTest() {
        when(this.userDao.findById(1)).thenReturn(Optional.of(user1));
        User testUser = this.userService.getUserById(1);
        assertEquals(testUser, user1);
    }

    @Test
    void addUserTest() {
        when(this.userDao.save(user2)).thenReturn(user2);
        User testUser = this.userService.addUser(user2);
        assertEquals(testUser, user2);
    }

    @Test
    void updateUserTest() {
        when(this.userDao.save(user3)).thenReturn(user3);
        User testUser = this.userService.updateUser(user3);
        assertEquals(testUser, user3);
    }

    @Test
    void deleteUserTest() {
        this.userService.deleteUser(1);
        verify(this.userDao, times(1)).deleteById(1);
    }
}