package com.genspark.clientprojectcasestudy.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.genspark.clientprojectcasestudy.Dao.ClientDao;
import com.genspark.clientprojectcasestudy.Entity.Client;
import com.genspark.clientprojectcasestudy.Entity.Project;
import com.genspark.clientprojectcasestudy.Service.ClientService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest()
@AutoConfigureMockMvc
class ClientControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    WebApplicationContext webApplicationContext;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    ClientDao clientDao;

    @Autowired
    ClientService clientService;

    List<Project> projects = List.of(new Project(1, "Super Cool Project", "Actually kinda lame"));

    Client client1;
    Client client2;
    List<Client> clients;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        client1 = new Client(1, "Client One", "Client1@Gmail.com", projects, "pdf");
        client2 = new Client(2, "Client Two", "Client2@Yahoo.com", null, "");
        clients = List.of(client1, client2);
    }

    @Test
    void getClients() throws Exception {
        when(this.clientDao.findAll()).thenReturn(clients);
        mockMvc.perform(MockMvcRequestBuilders
                .get("/clients")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[1].clientName", is("Client Two"))
        );
    }

    @Test
    void getClientById() {
    }

    @Test
    void addClient() {
    }

    @Test
    void updateClient() {
    }

    @Test
    void deleteClient() {
    }


}