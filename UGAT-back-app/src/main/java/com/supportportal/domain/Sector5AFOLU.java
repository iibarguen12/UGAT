package com.supportportal.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Table(name = "sector5_AFOLU")
@Entity
public class Sector5AFOLU implements Serializable {
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

    private Integer cows;
    private Integer buffaloes;
    private Integer sheep;
    private Integer camel;
    private Integer horses;
    private Integer swine;
    private Integer poultry;
    private Integer mulesAndAssess;
    private Integer other;
    private String otherDescription;

    private Integer landEmission1;
    private String landEmission1Type;
    private String landEmission1Unit;
    private Integer landEmission2;
    private String landEmission2Type;
    private String landEmission2Unit;
    private Integer landEmission3;
    private String landEmission3Type;
    private String landEmission3Unit;

    private Integer burning;
    private String burningUnit;
    private Integer burningForest;
    private String burningForestUnit;
    private Integer burningGrass;
    private String burningGrassUnit;
    private Integer burningCrop;
    private String burningCropUnit;
    private Integer burningOther;
    private String burningOtherUnit;

    private Integer liming;
    private String limingUnit;
    private Integer urea;
    private String ureaUnit;
    private Integer rice;
    private String riceUnit;

    public Sector5AFOLU() {
    }

    public Sector5AFOLU(Long id, String userName, String city, String inventoryPeriod, String subSector, String scope, Integer cows, Integer buffalos, Integer sheeps, Integer camel, Integer horses, Integer swine, Integer poultry, Integer mulesAndAssess, Integer other, String otherDescription, Integer landEmission1, String landEmission1Type, String landEmission1Unit, Integer landEmission2, String landEmission2Type, String landEmission2Unit, Integer landEmission3, String landEmission3Type, String landEmission3Unit, Integer burning, String burningUnit, Integer burningForest, String burningForestUnit, Integer burningGrass, String burningGrassUnit, Integer burningCrop, String burningCropUnit, Integer burningOther, String burningOtherUnit, Integer liming, String limingUnit, Integer urea, String ureaUnit, Integer rice, String riceUnit) {
        this.id = id;
        this.userName = userName;
        this.city = city;
        this.inventoryPeriod = inventoryPeriod;
        this.subSector = subSector;
        this.scope = scope;
        this.cows = cows;
        this.buffaloes = buffalos;
        this.sheep = sheeps;
        this.camel = camel;
        this.horses = horses;
        this.swine = swine;
        this.poultry = poultry;
        this.mulesAndAssess = mulesAndAssess;
        this.other = other;
        this.otherDescription = otherDescription;
        this.landEmission1 = landEmission1;
        this.landEmission1Type = landEmission1Type;
        this.landEmission1Unit = landEmission1Unit;
        this.landEmission2 = landEmission2;
        this.landEmission2Type = landEmission2Type;
        this.landEmission2Unit = landEmission2Unit;
        this.landEmission3 = landEmission3;
        this.landEmission3Type = landEmission3Type;
        this.landEmission3Unit = landEmission3Unit;
        this.burning = burning;
        this.burningUnit = burningUnit;
        this.burningForest = burningForest;
        this.burningForestUnit = burningForestUnit;
        this.burningGrass = burningGrass;
        this.burningGrassUnit = burningGrassUnit;
        this.burningCrop = burningCrop;
        this.burningCropUnit = burningCropUnit;
        this.burningOther = burningOther;
        this.burningOtherUnit = burningOtherUnit;
        this.liming = liming;
        this.limingUnit = limingUnit;
        this.urea = urea;
        this.ureaUnit = ureaUnit;
        this.rice = rice;
        this.riceUnit = riceUnit;
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

    public Integer getCows() {
        return cows;
    }

    public void setCows(Integer cows) {
        this.cows = cows;
    }

    public Integer getBuffaloes() {
        return buffaloes;
    }

    public void setBuffaloes(Integer buffaloes) {
        this.buffaloes = buffaloes;
    }

    public Integer getSheep() {
        return sheep;
    }

    public void setSheep(Integer sheep) {
        this.sheep = sheep;
    }

    public Integer getCamel() {
        return camel;
    }

    public void setCamel(Integer camel) {
        this.camel = camel;
    }

    public Integer getHorses() {
        return horses;
    }

    public void setHorses(Integer horses) {
        this.horses = horses;
    }

    public Integer getSwine() {
        return swine;
    }

    public void setSwine(Integer swine) {
        this.swine = swine;
    }

    public Integer getPoultry() {
        return poultry;
    }

    public void setPoultry(Integer poultry) {
        this.poultry = poultry;
    }

    public Integer getMulesAndAssess() {
        return mulesAndAssess;
    }

    public void setMulesAndAssess(Integer mulesAndAssess) {
        this.mulesAndAssess = mulesAndAssess;
    }

    public Integer getOther() {
        return other;
    }

    public void setOther(Integer other) {
        this.other = other;
    }

    public String getOtherDescription() {
        return otherDescription;
    }

    public void setOtherDescription(String otherDescription) {
        this.otherDescription = otherDescription;
    }

    public Integer getLandEmission1() {
        return landEmission1;
    }

    public void setLandEmission1(Integer landEmission1) {
        this.landEmission1 = landEmission1;
    }

    public String getLandEmission1Type() {
        return landEmission1Type;
    }

    public void setLandEmission1Type(String landEmission1Type) {
        this.landEmission1Type = landEmission1Type;
    }

    public String getLandEmission1Unit() {
        return landEmission1Unit;
    }

    public void setLandEmission1Unit(String landEmission1Unit) {
        this.landEmission1Unit = landEmission1Unit;
    }

    public Integer getLandEmission2() {
        return landEmission2;
    }

    public void setLandEmission2(Integer landEmission2) {
        this.landEmission2 = landEmission2;
    }

    public String getLandEmission2Type() {
        return landEmission2Type;
    }

    public void setLandEmission2Type(String landEmission2Type) {
        this.landEmission2Type = landEmission2Type;
    }

    public String getLandEmission2Unit() {
        return landEmission2Unit;
    }

    public void setLandEmission2Unit(String landEmission2Unit) {
        this.landEmission2Unit = landEmission2Unit;
    }

    public Integer getLandEmission3() {
        return landEmission3;
    }

    public void setLandEmission3(Integer landEmission3) {
        this.landEmission3 = landEmission3;
    }

    public String getLandEmission3Type() {
        return landEmission3Type;
    }

    public void setLandEmission3Type(String landEmission3Type) {
        this.landEmission3Type = landEmission3Type;
    }

    public String getLandEmission3Unit() {
        return landEmission3Unit;
    }

    public void setLandEmission3Unit(String landEmission3Unit) {
        this.landEmission3Unit = landEmission3Unit;
    }

    public Integer getBurning() {
        return burning;
    }

    public void setBurning(Integer burning) {
        this.burning = burning;
    }

    public String getBurningUnit() {
        return burningUnit;
    }

    public void setBurningUnit(String burningUnit) {
        this.burningUnit = burningUnit;
    }

    public Integer getBurningForest() {
        return burningForest;
    }

    public void setBurningForest(Integer burningForest) {
        this.burningForest = burningForest;
    }

    public String getBurningForestUnit() {
        return burningForestUnit;
    }

    public void setBurningForestUnit(String burningForestUnit) {
        this.burningForestUnit = burningForestUnit;
    }

    public Integer getBurningGrass() {
        return burningGrass;
    }

    public void setBurningGrass(Integer burningGrass) {
        this.burningGrass = burningGrass;
    }

    public String getBurningGrassUnit() {
        return burningGrassUnit;
    }

    public void setBurningGrassUnit(String burningGrassUnit) {
        this.burningGrassUnit = burningGrassUnit;
    }

    public Integer getBurningCrop() {
        return burningCrop;
    }

    public void setBurningCrop(Integer burningCrop) {
        this.burningCrop = burningCrop;
    }

    public String getBurningCropUnit() {
        return burningCropUnit;
    }

    public void setBurningCropUnit(String burningCropUnit) {
        this.burningCropUnit = burningCropUnit;
    }

    public Integer getBurningOther() {
        return burningOther;
    }

    public void setBurningOther(Integer burningOther) {
        this.burningOther = burningOther;
    }

    public String getBurningOtherUnit() {
        return burningOtherUnit;
    }

    public void setBurningOtherUnit(String burningOtherUnit) {
        this.burningOtherUnit = burningOtherUnit;
    }

    public Integer getLiming() {
        return liming;
    }

    public void setLiming(Integer liming) {
        this.liming = liming;
    }

    public String getLimingUnit() {
        return limingUnit;
    }

    public void setLimingUnit(String limingUnit) {
        this.limingUnit = limingUnit;
    }

    public Integer getUrea() {
        return urea;
    }

    public void setUrea(Integer urea) {
        this.urea = urea;
    }

    public String getUreaUnit() {
        return ureaUnit;
    }

    public void setUreaUnit(String ureaUnit) {
        this.ureaUnit = ureaUnit;
    }

    public Integer getRice() {
        return rice;
    }

    public void setRice(Integer rice) {
        this.rice = rice;
    }

    public String getRiceUnit() {
        return riceUnit;
    }

    public void setRiceUnit(String riceUnit) {
        this.riceUnit = riceUnit;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Sector5AFOLU)) return false;
        Sector5AFOLU that = (Sector5AFOLU) o;
        return getId().equals(that.getId()) && getCity().equals(that.getCity()) && getSubSector().equals(that.getSubSector()) && getScope().equals(that.getScope());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getCity(), getSubSector(), getScope());
    }
}
