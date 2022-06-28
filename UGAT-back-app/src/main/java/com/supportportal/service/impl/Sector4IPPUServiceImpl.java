package com.supportportal.service.impl;

import com.supportportal.domain.Sector4IPPU;
import com.supportportal.repository.Sector4IPPURepository;
import com.supportportal.service.Sector4IPPUService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@Service
@Transactional
public class Sector4IPPUServiceImpl implements Sector4IPPUService {

    private Logger LOGGER = LoggerFactory.getLogger(getClass());
    private Sector4IPPURepository sector4IPPURepository;

    @Autowired
    public Sector4IPPUServiceImpl(Sector4IPPURepository Sector4IPPURepository) {
        this.sector4IPPURepository = Sector4IPPURepository;
    }

    @Override
    public List<Sector4IPPU> getAllSector4() {
        return sector4IPPURepository.findAll();
    }

    @Override
    public Sector4IPPU findSector4ById(Long id) {
        return sector4IPPURepository.findSector4ById(id);
    }

    @Override
    public List<Sector4IPPU> findAllSector4BySubSector(String subSector) {
        return sector4IPPURepository.findSector4BySubSector(subSector);
    }

    @Override
    public List<Sector4IPPU> findAllSector4ByScope(String scope) {
        return sector4IPPURepository.findSector4ByScope(scope);
    }

    @Override
    public Sector4IPPU addSector4(String userName,String city,String inventoryPeriod,String subSector,String scope,Integer clinker,String clinkerUnit,Integer lime,String limeUnit,Integer glass,String glassUnit,Integer ammonia,String ammoniaUnit,Integer nitricAcid,String nitricAcidUnit,Integer adipicAcid,String adipicAcidUnit,Integer othersAcid,String othersAcidUnit, Integer carbide,  String carbideUnit,  Integer titanium,  String titaniumUnit,  Integer soda,  String sodaUnit,  Integer metallurgical,  String metallurgicalUnit,  Integer iron,  String ironUnit,  Integer ferroalloy,  String ferroalloyUnit,  Integer aluminum,  String aluminumUnit,  Integer magnesium,  String magnesiumUnit,  Integer lead,  String leadUnit,  Integer zinc,  String zincUnit,  Integer other,  String otherUnit,  String otherDescription,  Integer lubricants,  String lubricantsUnit,  Integer parafin,  String parafinUnit,  Integer petroleum,  String petroleumUnit,  Integer aromatics,  String aromaticsUnit,  Integer fluids,  String fluidsUnit,  Integer pfc,  String pfcUnit,  Integer hfc,  String hfcUnit,  Integer other2,  String other2Unit,  String other2Description) throws IOException {
        Sector4IPPU sc4 = new Sector4IPPU();
        /*General Data*/
        sc4.setUserName(userName);
        sc4.setCity(city);
        sc4.setInventoryPeriod(inventoryPeriod);
        sc4.setSubSector(subSector);
        sc4.setScope(scope);
        /*Data Type 1*/
        sc4.setClinker(clinker);
        sc4.setClinkerUnit(clinkerUnit);
        sc4.setLime(lime);
        sc4.setLimeUnit(limeUnit);
        sc4.setGlass(glass);
        sc4.setGlassUnit(glassUnit);
        sc4.setAmmonia(ammonia);
        sc4.setAmmoniaUnit(ammoniaUnit);
        sc4.setNitricAcid(nitricAcid);
        sc4.setNitricAcidUnit(nitricAcidUnit);
        sc4.setAdipicAcid(adipicAcid);
        sc4.setAdipicAcidUnit(adipicAcidUnit);
        sc4.setOthersAcid(othersAcid);
        sc4.setOthersAcidUnit(othersAcidUnit);
        sc4.setCarbide(carbide);
        sc4.setCarbideUnit(carbideUnit);
        sc4.setTitanium(titanium);
        sc4.setTitaniumUnit(titaniumUnit);
        sc4.setSoda(soda);
        sc4.setSodaUnit(sodaUnit);
        sc4.setMetallurgical(metallurgical);
        sc4.setMetallurgicalUnit(metallurgicalUnit);
        sc4.setIron(iron);
        sc4.setIronUnit(ironUnit);
        sc4.setFerroalloy(ferroalloy);
        sc4.setFerroalloyUnit(ferroalloyUnit);
        sc4.setAluminum(aluminum);
        sc4.setAluminumUnit(aluminumUnit);
        sc4.setMagnesium(magnesium);
        sc4.setMagnesiumUnit(magnesiumUnit);
        sc4.setLeadProduction(lead);
        sc4.setLeadProductionUnit(leadUnit);
        sc4.setZinc(zinc);
        sc4.setZincUnit(zincUnit);
        sc4.setOther(other);
        sc4.setOtherUnit(otherUnit);
        sc4.setOtherDescription(otherDescription);
        /*Data Type 2*/
        sc4.setLubricants(lubricants);
        sc4.setLubricantsUnit(lubricantsUnit);
        sc4.setParafin(parafin);
        sc4.setParafinUnit(parafinUnit);
        sc4.setPetroleum(petroleum);
        sc4.setPetroleumUnit(petroleumUnit);
        sc4.setAromatics(aromatics);
        sc4.setAromaticsUnit(aromaticsUnit);
        sc4.setFluids(fluids);
        sc4.setFluidsUnit(fluidsUnit);
        sc4.setPfc(pfc);
        sc4.setPfcUnit(pfcUnit);
        sc4.setHfc(hfc);
        sc4.setHfcUnit(hfcUnit);
        sc4.setOther2(other2);
        sc4.setOther2Unit(other2Unit);
        sc4.setOther2Description(other2Description);

        sector4IPPURepository.save(sc4);
        LOGGER.info("Sector4IPPU "+ subSector+" "+ scope+" saved");
        return sc4;
    }

    @Override
    public Sector4IPPU updateSector4(Long id,Integer clinker,String clinkerUnit,Integer lime,String limeUnit,Integer glass,String glassUnit,Integer ammonia,String ammoniaUnit,Integer nitricAcid,String nitricAcidUnit,Integer adipicAcid,String adipicAcidUnit,Integer othersAcid,String othersAcidUnit, Integer carbide,  String carbideUnit,  Integer titanium,  String titaniumUnit,  Integer soda,  String sodaUnit,  Integer metallurgical,  String metallurgicalUnit,  Integer iron,  String ironUnit,  Integer ferroalloy,  String ferroalloyUnit,  Integer aluminum,  String aluminumUnit,  Integer magnesium,  String magnesiumUnit,  Integer lead,  String leadUnit,  Integer zinc,  String zincUnit,  Integer other,  String otherUnit,  String otherDescription,  Integer lubricants,  String lubricantsUnit,  Integer parafin,  String parafinUnit,  Integer petroleum,  String petroleumUnit,  Integer aromatics,  String aromaticsUnit,  Integer fluids,  String fluidsUnit,  Integer pfc,  String pfcUnit,  Integer hfc,  String hfcUnit,  Integer other2,  String other2Unit,  String other2Description) throws IOException {
        Sector4IPPU sc4 = sector4IPPURepository.findSector4ById(id);
        /*Data Type 1*/
        sc4.setClinker(clinker);
        sc4.setClinkerUnit(clinkerUnit);
        sc4.setLime(lime);
        sc4.setLimeUnit(limeUnit);
        sc4.setGlass(glass);
        sc4.setGlassUnit(glassUnit);
        sc4.setAmmonia(ammonia);
        sc4.setAmmoniaUnit(ammoniaUnit);
        sc4.setNitricAcid(nitricAcid);
        sc4.setNitricAcidUnit(nitricAcidUnit);
        sc4.setAdipicAcid(adipicAcid);
        sc4.setAdipicAcidUnit(adipicAcidUnit);
        sc4.setOthersAcid(othersAcid);
        sc4.setOthersAcidUnit(othersAcidUnit);
        sc4.setCarbide(carbide);
        sc4.setCarbideUnit(carbideUnit);
        sc4.setTitanium(titanium);
        sc4.setTitaniumUnit(titaniumUnit);
        sc4.setSoda(soda);
        sc4.setSodaUnit(sodaUnit);
        sc4.setMetallurgical(metallurgical);
        sc4.setMetallurgicalUnit(metallurgicalUnit);
        sc4.setIron(iron);
        sc4.setIronUnit(ironUnit);
        sc4.setFerroalloy(ferroalloy);
        sc4.setFerroalloyUnit(ferroalloyUnit);
        sc4.setAluminum(aluminum);
        sc4.setAluminumUnit(aluminumUnit);
        sc4.setMagnesium(magnesium);
        sc4.setMagnesiumUnit(magnesiumUnit);
        sc4.setLeadProduction(lead);
        sc4.setLeadProductionUnit(leadUnit);
        sc4.setZinc(zinc);
        sc4.setZincUnit(zincUnit);
        sc4.setOther(other);
        sc4.setOtherUnit(otherUnit);
        sc4.setOtherDescription(otherDescription);
        /*Data Type 2*/
        sc4.setLubricants(lubricants);
        sc4.setLubricantsUnit(lubricantsUnit);
        sc4.setParafin(parafin);
        sc4.setParafinUnit(parafinUnit);
        sc4.setPetroleum(petroleum);
        sc4.setPetroleumUnit(petroleumUnit);
        sc4.setAromatics(aromatics);
        sc4.setAromaticsUnit(aromaticsUnit);
        sc4.setFluids(fluids);
        sc4.setFluidsUnit(fluidsUnit);
        sc4.setPfc(pfc);
        sc4.setPfcUnit(pfcUnit);
        sc4.setHfc(hfc);
        sc4.setHfcUnit(hfcUnit);
        sc4.setOther2(other2);
        sc4.setOther2Unit(other2Unit);
        sc4.setOther2Description(other2Description);
        sector4IPPURepository.save(sc4);
        LOGGER.info("Sector4IPPU id:"+ id+" updated");
        return sc4;
    }

    @Override
    public void deleteSector4byId(Long id) throws IOException {
        Sector4IPPU sc3 = sector4IPPURepository.findSector4ById(id);
        sector4IPPURepository.delete(sc3);
        LOGGER.info("Sector4IPPU with id: " + id+ " deleted");
    }
}
