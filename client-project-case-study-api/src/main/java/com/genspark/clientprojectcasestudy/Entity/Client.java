package com.genspark.clientprojectcasestudy.Entity;

import javax.persistence.*;
import java.sql.Blob;
import java.util.List;

@Entity
@Table(name = "tbl_client", uniqueConstraints = {
        @UniqueConstraint(name = "uc_client_clientemailaddress", columnNames = {"clientEmailAddress"})
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

    private String clientEmailAddress;

    @OneToMany()
    @JoinColumn(
            name = "client_id",
            referencedColumnName = "clientId"
    )
    private List<Project> projects;

    @Column(name = "signed_agreement", nullable = false)
    private Blob signedAgreement;

    public Client() {
    }

    public Client(int clientId, String clientName, String clientEmailAddress, List<Project> projects, Blob signedAgreement) {
        this.clientId = clientId;
        this.clientName = clientName;
        this.clientEmailAddress = clientEmailAddress;
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

    public String getClientEmailAddress() {
        return clientEmailAddress;
    }

    public void setClientEmailAddress(String clientEmailAddress) {
        this.clientEmailAddress = clientEmailAddress;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    public Blob getSignedAgreement() {
        return signedAgreement;
    }

    public void setSignedAgreement(Blob signedAgreement) {
        this.signedAgreement = signedAgreement;
    }

    @Override
    public String toString() {
        return "Client{" +
                "clientId=" + clientId +
                ", clientName='" + clientName + '\'' +
                ", clientEmailAddress='" + clientEmailAddress + '\'' +
                ", projects=" + projects +
                ", signedAgreement=" + signedAgreement +
                '}';
    }
}
