package com.genspark.clientprojectcasestudy.Controller;

import com.genspark.clientprojectcasestudy.Entity.Client;
import com.genspark.clientprojectcasestudy.Service.ClientService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class ClientController {

    @Autowired
    ClientService clientService;

    Logger log = LoggerFactory.getLogger(ClientController.class);

    @GetMapping("/clients")
    public List<Client> getClients(){
        log.info("Made GET request to Rest API. [url=/clients]");
        return this.clientService.getClients();
    }

    @GetMapping("/clients/{clientId}")
    public Client getClientById(@PathVariable int clientId){
        log.info("Made GET request to Rest API. [url=/clients/{}]", clientId);
        return this.clientService.getClientById(clientId);
    }

    @PostMapping("/clients")
    public Client addClient(@RequestBody Client client){
        log.info("Made POST request to Rest API. [url=/clients]");
        return this.clientService.addClient(client);
    }

    @PutMapping("/clients")
    public Client updateClient(@RequestBody Client client){
        log.info("Made PUT request to Rest API. [url=/clients]");
        return this.clientService.updateClient(client);
    }

    @DeleteMapping("/clients/{clientId}")
    public String deleteClient(@PathVariable int clientId){
        log.info("Made DELETE request to Rest API. [url=/clients/{}]", clientId);
        return this.clientService.deleteClient(clientId);
    }
}
