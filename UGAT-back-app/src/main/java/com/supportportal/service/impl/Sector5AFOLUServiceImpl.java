package com.supportportal.service.impl;

import com.supportportal.domain.Sector5AFOLU;
import com.supportportal.repository.Sector5AFOLURepository;
import com.supportportal.service.Sector5AFOLUService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@Service
@Transactional
public class Sector5AFOLUServiceImpl implements Sector5AFOLUService {

    private Logger LOGGER = LoggerFactory.getLogger(getClass());
    private Sector5AFOLURepository sector5AFOLURepository;

    @Autowired
    public Sector5AFOLUServiceImpl(Sector5AFOLURepository Sector5AFOLURepository) {
        this.sector5AFOLURepository = Sector5AFOLURepository;
    }

    @Override
    public List<Sector5AFOLU> getAllSector5() {
        return sector5AFOLURepository.findAll();
    }

    @Override
    public Sector5AFOLU findSector5ById(Long id) {
        return sector5AFOLURepository.findSector5ById(id);
    }

    @Override
    public List<Sector5AFOLU> findAllSector5BySubSector(String subSector) {
        return sector5AFOLURepository.findSector5BySubSector(subSector);
    }

    @Override
    public List<Sector5AFOLU> findAllSector5ByScope(String scope) {
        return sector5AFOLURepository.findSector5ByScope(scope);
    }

    @Override
    public Sector5AFOLU addSector5(String userName,String city,String inventoryPeriod,String subSector,String scope,Integer cows, Integer buffaloes, Integer sheep, Integer camel, Integer horses, Integer swine, Integer poultry, Integer mulesAndAssess, Integer other, String otherDescription, Integer landEmission1, String landEmission1Type, String landEmission1Unit, Integer landEmission2, String landEmission2Type, String landEmission2Unit, Integer landEmission3, String landEmission3Type, String landEmission3Unit, Integer burning, String burningUnit, Integer burningForest, String burningForestUnit, Integer burningGrass, String burningGrassUnit, Integer burningCrop, String burningCropUnit, Integer burningOther, String burningOtherUnit, Integer liming, String limingUnit, Integer urea, String ureaUnit, Integer rice, String riceUnit) throws IOException {
        Sector5AFOLU sc5 = new Sector5AFOLU();
        /*General Data*/
        sc5.setUserName(userName);
        sc5.setCity(city);
        sc5.setInventoryPeriod(inventoryPeriod);
        sc5.setSubSector(subSector);
        sc5.setScope(scope);
        /*Data Type 1*/
        sc5.setCows(cows);
        sc5.setBuffaloes(buffaloes);
        sc5.setSheep(sheep);
        sc5.setCamel(camel);
        sc5.setHorses(horses);
        sc5.setSwine(swine);
        sc5.setPoultry(poultry);
        sc5.setMulesAndAssess(mulesAndAssess);
        sc5.setOther(other);
        sc5.setOtherDescription(otherDescription);
        /*Data Type 2*/
        sc5.setLandEmission1(landEmission1);
        sc5.setLandEmission1Type(landEmission1Type);
        sc5.setLandEmission1Unit(landEmission1Unit);
        sc5.setLandEmission2(landEmission2);
        sc5.setLandEmission2Type(landEmission2Type);
        sc5.setLandEmission2Unit(landEmission2Unit);
        sc5.setLandEmission3(landEmission3);
        sc5.setLandEmission3Type(landEmission3Type);
        sc5.setLandEmission3Unit(landEmission3Unit);
        /*Data Type 3*/
        sc5.setBurning(burning);
        sc5.setBurningUnit(burningUnit);
        sc5.setBurningForest(burningForest);
        sc5.setBurningForestUnit(burningForestUnit);
        sc5.setBurningGrass(burningGrass);
        sc5.setBurningGrassUnit(burningGrassUnit);
        sc5.setBurningCrop(burningCrop);
        sc5.setBurningCropUnit(burningCropUnit);
        sc5.setBurningOther(burningOther);
        sc5.setBurningOtherUnit(burningOtherUnit);
        sc5.setLiming(liming);
        sc5.setLimingUnit(limingUnit);
        sc5.setUrea(urea);
        sc5.setUreaUnit(ureaUnit);
        sc5.setRice(rice);
        sc5.setRiceUnit(riceUnit);

        sector5AFOLURepository.save(sc5);
        LOGGER.info("Sector5AFOLU "+ subSector+" "+ scope+" saved");
        return sc5;
    }

    @Override
    public Sector5AFOLU updateSector5(Long id,Integer cows, Integer buffaloes, Integer sheep, Integer camel, Integer horses, Integer swine, Integer poultry, Integer mulesAndAssess, Integer other, String otherDescription, Integer landEmission1, String landEmission1Type, String landEmission1Unit, Integer landEmission2, String landEmission2Type, String landEmission2Unit, Integer landEmission3, String landEmission3Type, String landEmission3Unit, Integer burning, String burningUnit, Integer burningForest, String burningForestUnit, Integer burningGrass, String burningGrassUnit, Integer burningCrop, String burningCropUnit, Integer burningOther, String burningOtherUnit, Integer liming, String limingUnit, Integer urea, String ureaUnit, Integer rice, String riceUnit) throws IOException {
        Sector5AFOLU sc5 = sector5AFOLURepository.findSector5ById(id);
        /*Data Type 1*/
        sc5.setCows(cows);
        sc5.setBuffaloes(buffaloes);
        sc5.setSheep(sheep);
        sc5.setCamel(camel);
        sc5.setHorses(horses);
        sc5.setSwine(swine);
        sc5.setPoultry(poultry);
        sc5.setMulesAndAssess(mulesAndAssess);
        sc5.setOther(other);
        sc5.setOtherDescription(otherDescription);
        /*Data Type 2*/
        sc5.setLandEmission1(landEmission1);
        sc5.setLandEmission1Type(landEmission1Type);
        sc5.setLandEmission1Unit(landEmission1Unit);
        sc5.setLandEmission2(landEmission2);
        sc5.setLandEmission2Type(landEmission2Type);
        sc5.setLandEmission2Unit(landEmission2Unit);
        sc5.setLandEmission3(landEmission3);
        sc5.setLandEmission3Type(landEmission3Type);
        sc5.setLandEmission3Unit(landEmission3Unit);
        /*Data Type 3*/
        sc5.setBurning(burning);
        sc5.setBurningUnit(burningUnit);
        sc5.setBurningForest(burningForest);
        sc5.setBurningForestUnit(burningForestUnit);
        sc5.setBurningGrass(burningGrass);
        sc5.setBurningGrassUnit(burningGrassUnit);
        sc5.setBurningCrop(burningCrop);
        sc5.setBurningCropUnit(burningCropUnit);
        sc5.setBurningOther(burningOther);
        sc5.setBurningOtherUnit(burningOtherUnit);
        sc5.setLiming(liming);
        sc5.setLimingUnit(limingUnit);
        sc5.setUrea(urea);
        sc5.setUreaUnit(ureaUnit);
        sc5.setRice(rice);
        sc5.setRiceUnit(riceUnit);

        sector5AFOLURepository.save(sc5);
        LOGGER.info("Sector5AFOLU id:"+ id+" updated");
        return sc5;
    }

    @Override
    public void deleteSector5byId(Long id) throws IOException {
        Sector5AFOLU sc3 = sector5AFOLURepository.findSector5ById(id);
        sector5AFOLURepository.delete(sc3);
        LOGGER.info("Sector5AFOLU with id: " + id+ " deleted");
    }
}
