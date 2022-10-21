package com.genspark.clientprojectcasestudy.Entity;

import javax.persistence.*;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "tbl_client", uniqueConstraints = {
        @UniqueConstraint(name = "uc_client_clientemail", columnNames = {"clientEmail"})
})
public class Client {
    @Id
    @SequenceGenerator(
            name = "client_seq",
            sequenceName = "client_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "client_seq"
    )
    private int clientId;

    private String clientName;

    private String clientEmail;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(
            name = "client_id",
            referencedColumnName = "clientId"
    )
    private List<Project> projects;

    @Lob
//    @Column(name = "signed_agreement", nullable = false)
    private String signedAgreement;

    public Client() {
    }

    public Client(int clientId, String clientName, String clientEmail, List<Project> projects, String signedAgreement) {
        this.clientId = clientId;
        this.clientName = clientName;
        this.clientEmail = clientEmail;
        this.projects = projects;
        this.signedAgreement = signedAgreement;
    }

    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getClientEmail() {
        return clientEmail;
    }

    public void setClientEmail(String clientEmail) {
        this.clientEmail = clientEmail;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    public String getSignedAgreement() {
        return signedAgreement;
    }

    public void setSignedAgreement(String signedAgreement) {
        this.signedAgreement = signedAgreement;
    }

    @Override
    public String toString() {
        return "Client{" +
                "clientId=" + clientId +
                ", clientName='" + clientName + '\'' +
                ", clientEmail='" + clientEmail + '\'' +
                ", projects=" + projects +
                ", signedAgreement=" + signedAgreement +
                '}';
    }
}
