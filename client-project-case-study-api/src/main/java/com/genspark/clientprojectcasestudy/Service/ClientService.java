package com.genspark.clientprojectcasestudy.Service;

import com.genspark.clientprojectcasestudy.Entity.Client;

import java.util.List;

public interface ClientService {
    List<Client> getClients();
    Client getClientById(int clientId);
    Client addClient(Client client);
    Client updateClient(Client client);
    String deleteClient(int clientId);
}
