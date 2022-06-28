package com.supportportal.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Table(name = "sector4_IPPU")
@Entity
public class Sector4IPPU implements Serializable {
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

    private Integer clinker;
    private String clinkerUnit;
    private Integer lime;
    private String limeUnit;
    private Integer glass;
    private String glassUnit;
    private Integer ammonia;
    private String ammoniaUnit;
    private Integer nitricAcid;
    private String nitricAcidUnit;
    private Integer adipicAcid;
    private String adipicAcidUnit;
    private Integer othersAcid;
    private String othersAcidUnit;
    private Integer carbide;
    private String carbideUnit;
    private Integer titanium;
    private String titaniumUnit;
    private Integer soda;
    private String sodaUnit;
    private Integer metallurgical;
    private String metallurgicalUnit;
    private Integer iron;
    private String ironUnit;
    private Integer ferroalloy;
    private String ferroalloyUnit;
    private Integer aluminum;
    private String aluminumUnit;
    private Integer magnesium;
    private String magnesiumUnit;
    private Integer leadProduction;
    private String leadProductionUnit;
    private Integer zinc;
    private String zincUnit;
    private Integer other;
    private String otherUnit;
    private String otherDescription;
    private Integer lubricants;
    private String lubricantsUnit;
    private Integer parafin;
    private String parafinUnit;
    private Integer petroleum;
    private String petroleumUnit;
    private Integer aromatics;
    private String aromaticsUnit;
    private Integer fluids;
    private String fluidsUnit;
    private Integer pfc;
    private String pfcUnit;
    private Integer hfc;
    private String hfcUnit;
    private Integer other2;
    private String other2Unit;
    private String other2Description;

    public Sector4IPPU() {
    }

    public Sector4IPPU(Long id, String userName, String city, String inventoryPeriod, String subSector, String scope, Integer clinker, String clinkerUnit, Integer lime, String limeUnit, Integer glass, String glassUnit, Integer ammonia, String ammoniaUnit, Integer nitricAcid, String nitricAcidUnit, Integer adipicAcid, String adipicAcidUnit, Integer othersAcid, String othersAcidUnit, Integer carbide, String carbideUnit, Integer titanium, String titaniumUnit, Integer soda, String sodaUnit, Integer metallurgical, String metallurgicalUnit, Integer iron, String ironUnit, Integer ferroalloy, String ferroalloyUnit, Integer aluminum, String aluminumUnit, Integer magnesium, String magnesiumUnit, Integer lead, String leadUnit, Integer zinc, String zincUnit, Integer other, String otherUnit, String otherDescription, Integer lubricants, String lubricantsUnit, Integer parafin, String parafinUnit, Integer petroleum, String petroleumUnit, Integer aromatics, String aromaticsUnit, Integer fluids, String fluidsUnit, Integer pfc, String pfcUnit, Integer hfc, String hfcUnit, Integer other2, String other2Unit, String other2Description) {
        this.id = id;
        this.userName = userName;
        this.city = city;
        this.inventoryPeriod = inventoryPeriod;
        this.subSector = subSector;
        this.scope = scope;
        this.clinker = clinker;
        this.clinkerUnit = clinkerUnit;
        this.lime = lime;
        this.limeUnit = limeUnit;
        this.glass = glass;
        this.glassUnit = glassUnit;
        this.ammonia = ammonia;
        this.ammoniaUnit = ammoniaUnit;
        this.nitricAcid = nitricAcid;
        this.nitricAcidUnit = nitricAcidUnit;
        this.adipicAcid = adipicAcid;
        this.adipicAcidUnit = adipicAcidUnit;
        this.othersAcid = othersAcid;
        this.othersAcidUnit = othersAcidUnit;
        this.carbide = carbide;
        this.carbideUnit = carbideUnit;
        this.titanium = titanium;
        this.titaniumUnit = titaniumUnit;
        this.soda = soda;
        this.sodaUnit = sodaUnit;
        this.metallurgical = metallurgical;
        this.metallurgicalUnit = metallurgicalUnit;
        this.iron = iron;
        this.ironUnit = ironUnit;
        this.ferroalloy = ferroalloy;
        this.ferroalloyUnit = ferroalloyUnit;
        this.aluminum = aluminum;
        this.aluminumUnit = aluminumUnit;
        this.magnesium = magnesium;
        this.magnesiumUnit = magnesiumUnit;
        this.leadProduction = lead;
        this.leadProductionUnit = leadUnit;
        this.zinc = zinc;
        this.zincUnit = zincUnit;
        this.other = other;
        this.otherUnit = otherUnit;
        this.otherDescription = otherDescription;
        this.lubricants = lubricants;
        this.lubricantsUnit = lubricantsUnit;
        this.parafin = parafin;
        this.parafinUnit = parafinUnit;
        this.petroleum = petroleum;
        this.petroleumUnit = petroleumUnit;
        this.aromatics = aromatics;
        this.aromaticsUnit = aromaticsUnit;
        this.fluids = fluids;
        this.fluidsUnit = fluidsUnit;
        this.pfc = pfc;
        this.pfcUnit = pfcUnit;
        this.hfc = hfc;
        this.hfcUnit = hfcUnit;
        this.other2 = other2;
        this.other2Unit = other2Unit;
        this.other2Description = other2Description;
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

    public Integer getClinker() {
        return clinker;
    }

    public void setClinker(Integer clinker) {
        this.clinker = clinker;
    }

    public String getClinkerUnit() {
        return clinkerUnit;
    }

    public void setClinkerUnit(String clinkerUnit) {
        this.clinkerUnit = clinkerUnit;
    }

    public Integer getLime() {
        return lime;
    }

    public void setLime(Integer lime) {
        this.lime = lime;
    }

    public String getLimeUnit() {
        return limeUnit;
    }

    public void setLimeUnit(String limeUnit) {
        this.limeUnit = limeUnit;
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

    public Integer getAmmonia() {
        return ammonia;
    }

    public void setAmmonia(Integer ammonia) {
        this.ammonia = ammonia;
    }

    public String getAmmoniaUnit() {
        return ammoniaUnit;
    }

    public void setAmmoniaUnit(String ammoniaUnit) {
        this.ammoniaUnit = ammoniaUnit;
    }

    public Integer getNitricAcid() {
        return nitricAcid;
    }

    public void setNitricAcid(Integer nitricAcid) {
        this.nitricAcid = nitricAcid;
    }

    public String getNitricAcidUnit() {
        return nitricAcidUnit;
    }

    public void setNitricAcidUnit(String nitricAcidUnit) {
        this.nitricAcidUnit = nitricAcidUnit;
    }

    public Integer getAdipicAcid() {
        return adipicAcid;
    }

    public void setAdipicAcid(Integer adipicAcid) {
        this.adipicAcid = adipicAcid;
    }

    public String getAdipicAcidUnit() {
        return adipicAcidUnit;
    }

    public void setAdipicAcidUnit(String adipicAcidUnit) {
        this.adipicAcidUnit = adipicAcidUnit;
    }

    public Integer getOthersAcid() {
        return othersAcid;
    }

    public void setOthersAcid(Integer othersAcid) {
        this.othersAcid = othersAcid;
    }

    public String getOthersAcidUnit() {
        return othersAcidUnit;
    }

    public void setOthersAcidUnit(String othersAcidUnit) {
        this.othersAcidUnit = othersAcidUnit;
    }

    public Integer getCarbide() {
        return carbide;
    }

    public void setCarbide(Integer carbide) {
        this.carbide = carbide;
    }

    public String getCarbideUnit() {
        return carbideUnit;
    }

    public void setCarbideUnit(String carbideUnit) {
        this.carbideUnit = carbideUnit;
    }

    public Integer getTitanium() {
        return titanium;
    }

    public void setTitanium(Integer titanium) {
        this.titanium = titanium;
    }

    public String getTitaniumUnit() {
        return titaniumUnit;
    }

    public void setTitaniumUnit(String titaniumUnit) {
        this.titaniumUnit = titaniumUnit;
    }

    public Integer getSoda() {
        return soda;
    }

    public void setSoda(Integer soda) {
        this.soda = soda;
    }

    public String getSodaUnit() {
        return sodaUnit;
    }

    public void setSodaUnit(String sodaUnit) {
        this.sodaUnit = sodaUnit;
    }

    public Integer getMetallurgical() {
        return metallurgical;
    }

    public void setMetallurgical(Integer metallurgical) {
        this.metallurgical = metallurgical;
    }

    public String getMetallurgicalUnit() {
        return metallurgicalUnit;
    }

    public void setMetallurgicalUnit(String metallurgicalUnit) {
        this.metallurgicalUnit = metallurgicalUnit;
    }

    public Integer getIron() {
        return iron;
    }

    public void setIron(Integer iron) {
        this.iron = iron;
    }

    public String getIronUnit() {
        return ironUnit;
    }

    public void setIronUnit(String ironUnit) {
        this.ironUnit = ironUnit;
    }

    public Integer getFerroalloy() {
        return ferroalloy;
    }

    public void setFerroalloy(Integer ferroalloy) {
        this.ferroalloy = ferroalloy;
    }

    public String getFerroalloyUnit() {
        return ferroalloyUnit;
    }

    public void setFerroalloyUnit(String ferroalloyUnit) {
        this.ferroalloyUnit = ferroalloyUnit;
    }

    public Integer getAluminum() {
        return aluminum;
    }

    public void setAluminum(Integer aluminum) {
        this.aluminum = aluminum;
    }

    public String getAluminumUnit() {
        return aluminumUnit;
    }

    public void setAluminumUnit(String aluminumUnit) {
        this.aluminumUnit = aluminumUnit;
    }

    public Integer getMagnesium() {
        return magnesium;
    }

    public void setMagnesium(Integer magnesium) {
        this.magnesium = magnesium;
    }

    public String getMagnesiumUnit() {
        return magnesiumUnit;
    }

    public void setMagnesiumUnit(String magnesiumUnit) {
        this.magnesiumUnit = magnesiumUnit;
    }

    public Integer getLeadProduction() {
        return leadProduction;
    }

    public void setLeadProduction(Integer leadProduction) {
        this.leadProduction = leadProduction;
    }

    public String getLeadProductionUnit() {
        return leadProductionUnit;
    }

    public void setLeadProductionUnit(String leadProductionUnit) {
        this.leadProductionUnit = leadProductionUnit;
    }

    public Integer getZinc() {
        return zinc;
    }

    public void setZinc(Integer zinc) {
        this.zinc = zinc;
    }

    public String getZincUnit() {
        return zincUnit;
    }

    public void setZincUnit(String zincUnit) {
        this.zincUnit = zincUnit;
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

    public Integer getLubricants() {
        return lubricants;
    }

    public void setLubricants(Integer lubricants) {
        this.lubricants = lubricants;
    }

    public String getLubricantsUnit() {
        return lubricantsUnit;
    }

    public void setLubricantsUnit(String lubricantsUnit) {
        this.lubricantsUnit = lubricantsUnit;
    }

    public Integer getParafin() {
        return parafin;
    }

    public void setParafin(Integer parafin) {
        this.parafin = parafin;
    }

    public String getParafinUnit() {
        return parafinUnit;
    }

    public void setParafinUnit(String parafinUnit) {
        this.parafinUnit = parafinUnit;
    }

    public Integer getPetroleum() {
        return petroleum;
    }

    public void setPetroleum(Integer petroleum) {
        this.petroleum = petroleum;
    }

    public String getPetroleumUnit() {
        return petroleumUnit;
    }

    public void setPetroleumUnit(String petroleumUnit) {
        this.petroleumUnit = petroleumUnit;
    }

    public Integer getAromatics() {
        return aromatics;
    }

    public void setAromatics(Integer aromatics) {
        this.aromatics = aromatics;
    }

    public String getAromaticsUnit() {
        return aromaticsUnit;
    }

    public void setAromaticsUnit(String aromaticsUnit) {
        this.aromaticsUnit = aromaticsUnit;
    }

    public Integer getFluids() {
        return fluids;
    }

    public void setFluids(Integer fluids) {
        this.fluids = fluids;
    }

    public String getFluidsUnit() {
        return fluidsUnit;
    }

    public void setFluidsUnit(String fluidsUnit) {
        this.fluidsUnit = fluidsUnit;
    }

    public Integer getPfc() {
        return pfc;
    }

    public void setPfc(Integer pfc) {
        this.pfc = pfc;
    }

    public String getPfcUnit() {
        return pfcUnit;
    }

    public void setPfcUnit(String pfcUnit) {
        this.pfcUnit = pfcUnit;
    }

    public Integer getHfc() {
        return hfc;
    }

    public void setHfc(Integer hfc) {
        this.hfc = hfc;
    }

    public String getHfcUnit() {
        return hfcUnit;
    }

    public void setHfcUnit(String hfcUnit) {
        this.hfcUnit = hfcUnit;
    }

    public Integer getOther2() {
        return other2;
    }

    public void setOther2(Integer other2) {
        this.other2 = other2;
    }

    public String getOther2Unit() {
        return other2Unit;
    }

    public void setOther2Unit(String other2Unit) {
        this.other2Unit = other2Unit;
    }

    public String getOther2Description() {
        return other2Description;
    }

    public void setOther2Description(String other2Description) {
        this.other2Description = other2Description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Sector4IPPU)) return false;
        Sector4IPPU that = (Sector4IPPU) o;
        return getId().equals(that.getId()) && getCity().equals(that.getCity()) && getSubSector().equals(that.getSubSector()) && getScope().equals(that.getScope());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getCity(), getSubSector(), getScope());
    }
}
