package com.genspark.clientprojectcasestudy.Controller;

import com.genspark.clientprojectcasestudy.Entity.Client;
import com.genspark.clientprojectcasestudy.Service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class ClientController {

    @Autowired
    ClientService clientService;

    @GetMapping("/clients")
    public List<Client> getClients(){
        return this.clientService.getClients();
    }

    @GetMapping("/clients/{clientId}")
    public Client getClientById(@PathVariable int clientId){
        return this.clientService.getClientById(clientId);
    }

    @PostMapping("/clients")
    public Client addClient(@RequestBody Client client){
        return this.clientService.addClient(client);
    }

    @PutMapping("/clients")
    public Client updateClient(@RequestBody Client client){
        return this.clientService.updateClient(client);
    }

    @DeleteMapping("/clients/{clientId}")
    public String deleteClient(@PathVariable int clientId){
        return this.clientService.deleteClient(clientId);
    }
}
