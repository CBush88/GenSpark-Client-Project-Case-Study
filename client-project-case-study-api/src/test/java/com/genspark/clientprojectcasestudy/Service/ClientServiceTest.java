package com.genspark.clientprojectcasestudy.Service;

import com.genspark.clientprojectcasestudy.Dao.ClientDao;
import com.genspark.clientprojectcasestudy.Entity.Client;
import com.genspark.clientprojectcasestudy.Entity.Project;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class ClientServiceTest {

    @Autowired
    ClientService clientService;

    @MockBean
    ClientDao clientDao;

    List<Project> projects;
    String pdf = "";

    Client client1;
    Client client2;

    ClientServiceTest() throws FileNotFoundException {
    }


    @BeforeEach
    void setUp() {
        projects = List.of(new Project(1, "Super Cool Project", "It's actually kinda lame"));
        client1 = new Client(1, "Client 1 Name", "Client1@Gmail.com", projects, pdf);
        client2 = new Client(2, "Client 2 Name", "Client2@Outlook.com", null, pdf);
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void getClientsTest() {

        List<Client> list = List.of(client1, client2);

        when(this.clientDao.findAll()).thenReturn(List.of(client1, client2));
        assertEquals(list, this.clientService.getClients());
    }

    @Test
    void getClientByIdTest() {
        when(this.clientDao.findById(1)).thenReturn(Optional.of(client1));

        Client cl1 = this.clientService.getClientById(1);
        assertEquals(client1, cl1);
    }

    @Test
    void addClientTest() {
        when(this.clientDao.save(client1)).thenReturn(client1);

        Client cl1 = this.clientService.addClient(client1);

        assertEquals(client1, cl1);
    }

    @Test
    void updateClientTest() {
        when(this.clientDao.save(client1)).thenReturn(client1);

        Client cl1 = this.clientService.updateClient(client1);

        assertEquals(client1, cl1);
    }

    @Test
    void deleteClientTest() {
        this.clientService.deleteClient(1);
        verify(clientDao, times(1)).deleteById(1);
    }
}