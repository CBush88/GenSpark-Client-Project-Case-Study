package com.genspark.clientprojectcasestudy.Service;

import com.genspark.clientprojectcasestudy.Dao.ClientDao;
import com.genspark.clientprojectcasestudy.Entity.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    ClientDao clientDao;

    @Override
    public List<Client> getClients() {
        return this.clientDao.findAll();
    }

    @Override
    public Client getClientById(int clientId) {
        return this.clientDao.findById(clientId).orElseThrow();
    }

    @Override
    public Client addClient(Client client) {
        return this.clientDao.save(client);
    }

    @Override
    public Client updateClient(Client client) {
        return this.clientDao.save(client);
    }

    @Override
    public String deleteClient(int clientId) {
        this.clientDao.deleteById(clientId);
        return "Successfully Deleted";
    }
}
