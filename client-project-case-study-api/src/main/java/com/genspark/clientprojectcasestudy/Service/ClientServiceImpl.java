package com.genspark.clientprojectcasestudy.Service;

import com.genspark.clientprojectcasestudy.Dao.ClientDao;
import com.genspark.clientprojectcasestudy.Entity.Client;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    ClientDao clientDao;

    Logger log = LoggerFactory.getLogger(ClientService.class);

    @Override
    public List<Client> getClients() {
        log.info("Made request to Client Service. [method=getClients()]");
        return this.clientDao.findAll();
    }

    @Override
    public Client getClientById(int clientId) {
        log.info("Made request to Client Service. [method=getClientById({})]", "clientId");
        return this.clientDao.findById(clientId).orElseThrow();
    }

    @Override
    public Client addClient(Client client) {
        log.info("Made request to Client Service. [method=addClient({})]", "client");
        return this.clientDao.save(client);
    }

    @Override
    public Client updateClient(Client client) {
        log.info("Made request to Client Service. [method=updateClient({})]", "client");
        return this.clientDao.save(client);
    }

    @Override
    public String deleteClient(int clientId) {
        log.info("Made request to Client Service. [method=deleteClient({})]", "clientId");
        this.clientDao.deleteById(clientId);
        return "Deleted Successfully";
    }
}
