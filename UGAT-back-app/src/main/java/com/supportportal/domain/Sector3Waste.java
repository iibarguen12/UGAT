package com.supportportal.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Table(name = "sector3_waste")
@Entity
public class Sector3Waste implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Column(nullable = false)
    private String userName;
    @Column(nullable = false)
    private String city;
    @Column(nullable = false)
    private String inventoryPeriod;
    @Column(nullable = false)
    private String subSector;
    @Column(nullable = false)
    private String scope;
    private Integer organic;
    private String organicUnit;
    private Integer paper;
    private String paperUnit;
    private Integer plastic;
    private String plasticUnit;
    private Integer glass;
    private String glassUnit;
    private Integer gardening;
    private String gardeningUnit;
    private Integer inert;
    private String inertUnit;
    private Integer water;
    private String waterUnit;

    public Sector3Waste() {
    }

    public Sector3Waste(Long id, String userName, String city, String inventoryPeriod, String subSector, String scope, Integer organic, String organicUnit, Integer paper, String paperUnit, Integer plastic, String plasticGasUnit, Integer glass, String glassUnit, Integer gardening, String gardeningUnit, Integer inert, String inertUnit, Integer water, String waterUnit) {
        this.id = id;
        this.userName = userName;
        this.city = city;
        this.inventoryPeriod = inventoryPeriod;
        this.subSector = subSector;
        this.scope = scope;
        this.organic = organic;
        this.organicUnit = organicUnit;
        this.paper = paper;
        this.paperUnit = paperUnit;
        this.plastic = plastic;
        this.plasticUnit = plasticGasUnit;
        this.glass = glass;
        this.glassUnit = glassUnit;
        this.gardening = gardening;
        this.gardeningUnit = gardeningUnit;
        this.inert = inert;
        this.inertUnit = inertUnit;
        this.water = water;
        this.waterUnit = waterUnit;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getInventoryPeriod() {
        return inventoryPeriod;
    }

    public void setInventoryPeriod(String inventoryPeriod) {
        this.inventoryPeriod = inventoryPeriod;
    }

    public String getSubSector() {
        return subSector;
    }

    public void setSubSector(String subSector) {
        this.subSector = subSector;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public Integer getOrganic() {
        return organic;
    }

    public void setOrganic(Integer organic) {
        this.organic = organic;
    }

    public String getOrganicUnit() {
        return organicUnit;
    }

    public void setOrganicUnit(String organicUnit) {
        this.organicUnit = organicUnit;
    }

    public Integer getPaper() {
        return paper;
    }

    public void setPaper(Integer paper) {
        this.paper = paper;
    }

    public String getPaperUnit() {
        return paperUnit;
    }

    public void setPaperUnit(String paperUnit) {
        this.paperUnit = paperUnit;
    }

    public Integer getPlastic() {
        return plastic;
    }

    public void setPlastic(Integer plastic) {
        this.plastic = plastic;
    }

    public String getPlasticUnit() {
        return plasticUnit;
    }

    public void setPlasticUnit(String plasticUnit) {
        this.plasticUnit = plasticUnit;
    }

    public Integer getGlass() {
        return glass;
    }

    public void setGlass(Integer glass) {
        this.glass = glass;
    }

    public String getGlassUnit() {
        return glassUnit;
    }

    public void setGlassUnit(String glassUnit) {
        this.glassUnit = glassUnit;
    }

    public Integer getGardening() {
        return gardening;
    }

    public void setGardening(Integer gardening) {
        this.gardening = gardening;
    }

    public String getGardeningUnit() {
        return gardeningUnit;
    }

    public void setGardeningUnit(String gardeningUnit) {
        this.gardeningUnit = gardeningUnit;
    }

    public Integer getInert() {
        return inert;
    }

    public void setInert(Integer inert) {
        this.inert = inert;
    }

    public String getInertUnit() {
        return inertUnit;
    }

    public void setInertUnit(String inertUnit) {
        this.inertUnit = inertUnit;
    }

    public Integer getWater() {
        return water;
    }

    public void setWater(Integer water) {
        this.water = water;
    }

    public String getWaterUnit() {
        return waterUnit;
    }

    public void setWaterUnit(String waterUnit) {
        this.waterUnit = waterUnit;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Sector3Waste)) return false;
        Sector3Waste that = (Sector3Waste) o;
        return getId().equals(that.getId()) && getCity().equals(that.getCity()) && getSubSector().equals(that.getSubSector()) && getScope().equals(that.getScope());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getCity(), getSubSector(), getScope());
    }
}
