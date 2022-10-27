package com.genspark.clientprojectcasestudy.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.genspark.clientprojectcasestudy.Entity.User;
import com.genspark.clientprojectcasestudy.Service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    UserService userService;

    User user1;
    User user2;
    User user3;
    List<User> userList;

    @BeforeEach
    void setUp() {
        user1 = new User(1, "User One", "Password", "viewer");
        user2 = new User(2, "User Two", "Secret", "viewer");
        user3 = new User(3, "User Three", "root", "admin");
        userList = List.of(user1, user2, user3);
    }

    @Test
    void getUsersTest() throws Exception {
        when(userService.getUsers()).thenReturn(userList);
        mockMvc.perform(MockMvcRequestBuilders
                .get("/users")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[1].username", is("User Two")))
                .andExpect(content().string(objectMapper.writeValueAsString(userList)));
    }

    @Test
    void getUserByIdTest() throws Exception {
        when(userService.getUserById(1)).thenReturn(user1);
        mockMvc.perform(MockMvcRequestBuilders
                .get("/users/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("User One")))
                .andExpect(content().string(objectMapper.writeValueAsString(user1)));
    }

    @Test
    void addUserTest() throws Exception {
        when(userService.addUser(user2)).thenReturn(user2);
        mockMvc.perform(MockMvcRequestBuilders
                .post("/users")
                .content(objectMapper.writeValueAsString(user2))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("User Two")))
                .andExpect(content().string(objectMapper.writeValueAsString(user2)));
    }

    @Test
    void updateUserTest() throws Exception {
        when(userService.updateUser(user3)).thenReturn(user3);
        mockMvc.perform(MockMvcRequestBuilders
                        .put("/users")
                        .content(objectMapper.writeValueAsString(user3))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("User Three")))
                .andExpect(content().string(objectMapper.writeValueAsString(user3)));
    }

    @Test
    void deleteUserTest() throws Exception {
        when(userService.deleteUser(1)).thenReturn("Deleted Successfully");
        mockMvc.perform(MockMvcRequestBuilders
                .delete("/users/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("Deleted Successfully"));
    }
}