package com.genspark.clientprojectcasestudy.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
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

import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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
        when(this.clientService.getClients()).thenReturn(clients);
        mockMvc.perform(MockMvcRequestBuilders
                .get("/clients")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[1].clientName", is("Client Two")))
                .andExpect(content().string(objectMapper.writeValueAsString(clients))
                );
    }

    @Test
    void getClientById() throws Exception {
        when(this.clientService.getClientById(1)).thenReturn(client1);
        mockMvc.perform(MockMvcRequestBuilders
                .get("/clients/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.clientName", is("Client One")))
                .andExpect(content().string(objectMapper.writeValueAsString(client1)));
    }

    @Test
    void addClient() throws Exception {
        Client client3 = new Client(3, "Client Three", "client3@client.com", null, "");
        String client3Json = objectMapper.writeValueAsString(client3);
        when(this.clientService.addClient(client3)).thenReturn(client3);
        mockMvc.perform(MockMvcRequestBuilders
                .post("/clients")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(client3Json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.clientName", is("Client Three")))
                .andExpect(content().string(client3Json));
    }

    @Test
    void updateClient() throws Exception {
        String client2Json = objectMapper.writeValueAsString(client2);
        when(this.clientService.updateClient(client2)).thenReturn(client2);
        mockMvc.perform(MockMvcRequestBuilders
                        .put("/clients")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(client2Json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.clientName", is("Client Two")))
                .andExpect(content().string(client2Json));
    }

    @Test
    void deleteClient() throws Exception {
        when(this.clientService.deleteClient(1)).thenReturn("Deleted Successfully");
        mockMvc.perform(MockMvcRequestBuilders
                .delete("/clients/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("Deleted Successfully"));
    }


}