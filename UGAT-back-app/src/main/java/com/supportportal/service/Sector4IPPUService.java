package com.supportportal.service;

import com.supportportal.domain.Sector4IPPU;

import java.io.IOException;
import java.util.List;

public interface Sector4IPPUService {

    List<Sector4IPPU> getAllSector4();

    Sector4IPPU findSector4ById(Long id);

    List<Sector4IPPU> findAllSector4BySubSector(String subSector);

    List<Sector4IPPU> findAllSector4ByScope(String scope);

    Sector4IPPU addSector4(String userName,String city,String inventoryPeriod,String subSector,String scope,Integer clinker,String clinkerUnit,Integer lime,String limeUnit,Integer glass,String glassUnit,Integer ammonia,String ammoniaUnit,Integer nitricAcid,String nitricAcidUnit,Integer adipicAcid,String adipicAcidUnit,Integer othersAcid,String othersAcidUnit, Integer carbide,  String carbideUnit,  Integer titanium,  String titaniumUnit,  Integer soda,  String sodaUnit,  Integer metallurgical,  String metallurgicalUnit,  Integer iron,  String ironUnit,  Integer ferroalloy,  String ferroalloyUnit,  Integer aluminum,  String aluminumUnit,  Integer magnesium,  String magnesiumUnit,  Integer lead,  String leadUnit,  Integer zinc,  String zincUnit,  Integer other,  String otherUnit,  String otherDescription,  Integer lubricants,  String lubricantsUnit,  Integer parafin,  String parafinUnit,  Integer petroleum,  String petroleumUnit,  Integer aromatics,  String aromaticsUnit,  Integer fluids,  String fluidsUnit,  Integer pfc,  String pfcUnit,  Integer hfc,  String hfcUnit,  Integer other2,  String other2Unit,  String other2Description) throws IOException;

    Sector4IPPU updateSector4(Long id,Integer clinker,String clinkerUnit,Integer lime,String limeUnit,Integer glass,String glassUnit,Integer ammonia,String ammoniaUnit,Integer nitricAcid,String nitricAcidUnit,Integer adipicAcid,String adipicAcidUnit,Integer othersAcid,String othersAcidUnit, Integer carbide,  String carbideUnit,  Integer titanium,  String titaniumUnit,  Integer soda,  String sodaUnit,  Integer metallurgical,  String metallurgicalUnit,  Integer iron,  String ironUnit,  Integer ferroalloy,  String ferroalloyUnit,  Integer aluminum,  String aluminumUnit,  Integer magnesium,  String magnesiumUnit,  Integer lead,  String leadUnit,  Integer zinc,  String zincUnit,  Integer other,  String otherUnit,  String otherDescription,  Integer lubricants,  String lubricantsUnit,  Integer parafin,  String parafinUnit,  Integer petroleum,  String petroleumUnit,  Integer aromatics,  String aromaticsUnit,  Integer fluids,  String fluidsUnit,  Integer pfc,  String pfcUnit,  Integer hfc,  String hfcUnit,  Integer other2,  String other2Unit,  String other2Description) throws IOException;

    void deleteSector4byId(Long id) throws IOException;

}
