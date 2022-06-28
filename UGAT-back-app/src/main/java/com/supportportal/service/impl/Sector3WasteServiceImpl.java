package com.supportportal.service.impl;

import com.supportportal.domain.Sector3Waste;
import com.supportportal.repository.Sector3WasteRepository;
import com.supportportal.service.Sector3WasteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@Service
@Transactional
public class Sector3WasteServiceImpl implements Sector3WasteService {

    private Logger LOGGER = LoggerFactory.getLogger(getClass());
    private Sector3WasteRepository Sector3WasteRepository;

    @Autowired
    public Sector3WasteServiceImpl(Sector3WasteRepository Sector3WasteRepository) {
        this.Sector3WasteRepository = Sector3WasteRepository;
    }

    @Override
    public List<Sector3Waste> getAllSector3() {
        return Sector3WasteRepository.findAll();
    }

    @Override
    public Sector3Waste findSector3ById(Long id) {
        return Sector3WasteRepository.findSector3ById(id);
    }

    @Override
    public List<Sector3Waste> findAllSector3BySubSector(String subSector) {
        return Sector3WasteRepository.findSector3BySubSector(subSector);
    }

    @Override
    public List<Sector3Waste> findAllSector3ByScope(String scope) {
        return Sector3WasteRepository.findSector3ByScope(scope);
    }

    @Override
    public Sector3Waste addSector3(String userName,String city,String inventoryPeriod,String subSector,String scope,Integer organic,String organicUnit,Integer paper,String paperUnit,Integer plastic,String plasticUnit,Integer glass,String glassUnit,Integer gardening,String gardeningUnit,Integer inert,String inertUnit,Integer water,String waterUnit) throws IOException {
        Sector3Waste sc3 = new Sector3Waste();
        sc3.setUserName(userName);
        sc3.setCity(city);
        sc3.setInventoryPeriod(inventoryPeriod);
        sc3.setSubSector(subSector);
        sc3.setScope(scope);
        sc3.setOrganic(organic);
        sc3.setOrganicUnit(organicUnit);
        sc3.setPaper(paper);
        sc3.setPaperUnit(paperUnit);
        sc3.setPlastic(plastic);
        sc3.setPlasticUnit( plasticUnit);
        sc3.setGlass(glass);
        sc3.setGlassUnit(glassUnit);
        sc3.setGardening(gardening);
        sc3.setGardeningUnit( gardeningUnit);
        sc3.setInert(inert);
        sc3.setInertUnit(inertUnit);
        sc3.setWater(water);
        sc3.setWaterUnit( waterUnit);
        Sector3WasteRepository.save(sc3);
        LOGGER.info("Sector3Waste "+ subSector+" "+ scope+" saved");
        return sc3;
    }

    @Override
    public Sector3Waste updateSector3(Long id,Integer organic,String organicUnit,Integer paper,String paperUnit,Integer plastic,String plasticUnit,Integer glass,String glassUnit,Integer gardening,String gardeningUnit,Integer inert,String inertUnit,Integer water,String waterUnit) throws IOException {
        Sector3Waste sc3 = Sector3WasteRepository.findSector3ById(id);
        sc3.setOrganic(organic);
        sc3.setOrganicUnit(organicUnit);
        sc3.setPaper(paper);
        sc3.setPaperUnit(paperUnit);
        sc3.setPlastic(plastic);
        sc3.setPlasticUnit( plasticUnit);
        sc3.setGlass(glass);
        sc3.setGlassUnit( glassUnit);
        sc3.setGardening(gardening);
        sc3.setGardeningUnit( gardeningUnit);
        sc3.setInert(inert);
        sc3.setInertUnit( inertUnit);
        sc3.setWater(water);
        sc3.setWaterUnit( waterUnit);
        Sector3WasteRepository.save(sc3);
        LOGGER.info("Sector3Waste id:"+ id+" updated");
        return sc3;
    }

    @Override
    public void deleteSector3byId(Long id) throws IOException {
        Sector3Waste sc3 = Sector3WasteRepository.findSector3ById(id);
        Sector3WasteRepository.delete(sc3);
        LOGGER.info("Sector3Waste with id: " + id+ " deleted");
    }
}
