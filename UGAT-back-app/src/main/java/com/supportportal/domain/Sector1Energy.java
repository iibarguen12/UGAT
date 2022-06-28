package com.supportportal.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Table(name = "sector1_energy")
@Entity
public class Sector1Energy implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Column(nullable = false)
    private String city;
    @Column(nullable = false)
    private String inventoryPeriod;
    @Column(nullable = false)
    private String subSector;
    @Column(nullable = false)
    private String scope;
    private Integer diesel;
    private String dieselUnit;
    private Integer gasoline;
    private String gasolineUnit;
    private Integer naturalGas;
    private String naturalGasUnit;
    private Integer lgn;
    private String lgnUnit;
    private Integer propane;
    private String propaneUnit;
    private Integer other;
    private String otherUnit;
    private String otherDescription;
    private Integer electricity;
    private String electricityUnit;
    @Column(nullable = false)
    private String userName;

    public Sector1Energy() {
    }

    public Sector1Energy(Long id, String city, String inventoryPeriod, String subSector, String scope, Integer diesel, String dieselUnit, Integer gasoline, String gasolineUnit, Integer naturalGas, String naturalGasUnit, Integer lgn, String lgnUnit, Integer propane, String propaneUnit, Integer other, String otherUnit, String otherDescription, Integer electricity, String electricityUnit, String userName) {
        this.id = id;
        this.city = city;
        this.inventoryPeriod = inventoryPeriod;
        this.subSector = subSector;
        this.scope = scope;
        this.diesel = diesel;
        this.dieselUnit = dieselUnit;
        this.gasoline = gasoline;
        this.gasolineUnit = gasolineUnit;
        this.naturalGas = naturalGas;
        this.naturalGasUnit = naturalGasUnit;
        this.lgn = lgn;
        this.lgnUnit = lgnUnit;
        this.propane = propane;
        this.propaneUnit = propaneUnit;
        this.other = other;
        this.otherUnit = otherUnit;
        this.otherDescription = otherDescription;
        this.electricity = electricity;
        this.electricityUnit = electricityUnit;
        this.userName = userName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCity() { return city;}

    public void setCity(String city) {this.city = city;}

    public String getInventoryPeriod() { return inventoryPeriod;}

    public void setInventoryPeriod(String inventoryPeriod) {this.inventoryPeriod = inventoryPeriod;}

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

    public Integer getDiesel() {
        return diesel;
    }

    public void setDiesel(Integer diesel) {
        this.diesel = diesel;
    }

    public String getDieselUnit() {
        return dieselUnit;
    }

    public void setDieselUnit(String dieselUnit) {
        this.dieselUnit = dieselUnit;
    }

    public Integer getGasoline() {
        return gasoline;
    }

    public void setGasoline(Integer gasoline) {
        this.gasoline = gasoline;
    }

    public String getGasolineUnit() {
        return gasolineUnit;
    }

    public void setGasolineUnit(String gasolineUnit) {
        this.gasolineUnit = gasolineUnit;
    }

    public Integer getNaturalGas() {
        return naturalGas;
    }

    public void setNaturalGas(Integer naturalGas) {
        this.naturalGas = naturalGas;
    }

    public String getNaturalGasUnit() {
        return naturalGasUnit;
    }

    public void setNaturalGasUnit(String naturalGasUnit) {
        this.naturalGasUnit = naturalGasUnit;
    }

    public Integer getLgn() {
        return lgn;
    }

    public void setLgn(Integer lgn) {
        this.lgn = lgn;
    }

    public String getLgnUnit() {
        return lgnUnit;
    }

    public void setLgnUnit(String lgnUnit) {
        this.lgnUnit = lgnUnit;
    }

    public Integer getPropane() {
        return propane;
    }

    public void setPropane(Integer propane) {
        this.propane = propane;
    }

    public String getPropaneUnit() {
        return propaneUnit;
    }

    public void setPropaneUnit(String propaneUnit) {
        this.propaneUnit = propaneUnit;
    }

    public Integer getOther() {
        return other;
    }

    public void setOther(Integer other) {
        this.other = other;
    }

    public String getOtherUnit() {
        return otherUnit;
    }

    public void setOtherUnit(String otherUnit) {
        this.otherUnit = otherUnit;
    }

    public String getOtherDescription() {
        return otherDescription;
    }

    public void setOtherDescription(String otherDescription) {
        this.otherDescription = otherDescription;
    }

    public Integer getElectricity() {
        return electricity;
    }

    public void setElectricity(Integer electricity) {
        this.electricity = electricity;
    }

    public String getElectricityUnit() {
        return electricityUnit;
    }

    public void setElectricityUnit(String electricityUnit) {
        this.electricityUnit = electricityUnit;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Sector1Energy)) return false;
        Sector1Energy that = (Sector1Energy) o;
        return getId().equals(that.getId()) && getCity().equals(that.getCity()) && getSubSector().equals(that.getSubSector()) && getScope().equals(that.getScope());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getCity(), getSubSector(), getScope());
    }
}
