package com.supportportal.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@IdClass(GovernmentId.class)
public class Government implements Serializable {
    /*@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long id;*/
    @Column(updatable=false)
    @CreationTimestamp
    private Date submissionDate;
    @Id
    @Column(nullable = false, updatable = false)
    private String inventoryPeriod;
    @Id
    @Column(nullable = false, updatable = false)
    private String cityName;
    private Long population;
    private Integer populationYear;
    @Column(name = "GDP_in_USD")
    private Long gDPInUSD;
    private Integer landArea;
    private String inventoryLevel;
    private String personInCharge;
    private String contactEmail;
    @Column(name = "GHG_inventory_verified")
    private String gHGInventoryVerified;
    private Integer verificationYear;
    private String verificationContact;

    public Government() {
    }

    public Government(/*Long id,*/ Date submissionDate, String inventoryPeriod, String cityName, Long population, Integer populationYear, Long gDPInUSD, Integer landArea, String inventoryLevel, String personInCharge, String contactEmail, String gHGInventoryVerified, Integer verificationYear, String verificationContact) {
        /*this.id = id;*/
        this.submissionDate = submissionDate;
        this.inventoryPeriod = inventoryPeriod;
        this.cityName = cityName;
        this.population = population;
        this.populationYear = populationYear;
        this.gDPInUSD = gDPInUSD;
        this.landArea = landArea;
        this.inventoryLevel = inventoryLevel;
        this.personInCharge = personInCharge;
        this.contactEmail = contactEmail;
        this.gHGInventoryVerified = gHGInventoryVerified;
        this.verificationYear = verificationYear;
        this.verificationContact = verificationContact;
    }
/*
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
*/
    public Date getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(Date submissionDate) {
        this.submissionDate = submissionDate;
    }

    public String getInventoryPeriod() {
        return inventoryPeriod;
    }

    public void setInventoryPeriod(String inventoryPeriod) {
        this.inventoryPeriod = inventoryPeriod;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public Long getPopulation() {
        return population;
    }

    public void setPopulation(Long population) {
        this.population = population;
    }

    public Integer getPopulationYear() {
        return populationYear;
    }

    public void setPopulationYear(Integer populationYear) {
        this.populationYear = populationYear;
    }

    public Long getgDPInUSD() {
        return gDPInUSD;
    }

    public void setgDPInUSD(Long gDPInUSD) {
        this.gDPInUSD = gDPInUSD;
    }

    public Integer getLandArea() {
        return landArea;
    }

    public void setLandArea(Integer landArea) {
        this.landArea = landArea;
    }

    public String getInventoryLevel() {
        return inventoryLevel;
    }

    public void setInventoryLevel(String inventoryLevel) {
        this.inventoryLevel = inventoryLevel;
    }

    public String getPersonInCharge() {
        return personInCharge;
    }

    public void setPersonInCharge(String personInCharge) {
        this.personInCharge = personInCharge;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getgHGInventoryVerified() {
        return gHGInventoryVerified;
    }

    public void setgHGInventoryVerified(String gHGInventoryVerified) {
        this.gHGInventoryVerified = gHGInventoryVerified;
    }

    public Integer getVerificationYear() {
        return verificationYear;
    }

    public void setVerificationYear(Integer verificationYear) {
        this.verificationYear = verificationYear;
    }

    public String getVerificationContact() {
        return verificationContact;
    }

    public void setVerificationContact(String verificationContact) {
        this.verificationContact = verificationContact;
    }
}
