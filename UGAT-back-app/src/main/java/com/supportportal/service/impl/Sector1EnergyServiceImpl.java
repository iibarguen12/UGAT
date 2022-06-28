package com.supportportal.service.impl;

import com.supportportal.domain.Sector1Energy;
import com.supportportal.repository.Sector1EnergyRepository;
import com.supportportal.service.Sector1EnergyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@Service
@Transactional
public class Sector1EnergyServiceImpl implements Sector1EnergyService {

    private Logger LOGGER = LoggerFactory.getLogger(getClass());
    private Sector1EnergyRepository sector1EnergyRepository;

    @Autowired
    public Sector1EnergyServiceImpl(Sector1EnergyRepository sector1EnergyRepository) {
        this.sector1EnergyRepository = sector1EnergyRepository;
    }

    @Override
    public List<Sector1Energy> getAllSector1() {
        return sector1EnergyRepository.findAll();
    }

    @Override
    public Sector1Energy findSector1ById(Long id) {
        return sector1EnergyRepository.findSector1ById(id);
    }

    @Override
    public List<Sector1Energy> findAllSector1BySubSector(String subSector) {
        return sector1EnergyRepository.findSector1BySubSector(subSector);
    }

    @Override
    public List<Sector1Energy> findAllSector1ByScope(String scope) {
        return sector1EnergyRepository.findSector1ByScope(scope);
    }

    @Override
    public Sector1Energy addSector1(String userName, String city, String inventoryPeriod, String subSector, String scope, Integer diesel, String dieselUnit, Integer gasoline, String gasolineUnit, Integer naturalGas, String naturalGasUnit, Integer lgn, String lgnUnit, Integer propane, String propaneUnit, Integer other, String otherUnit, String otherDescription, Integer electricity, String electricityUnit) throws IOException {
        Sector1Energy sc1 = new Sector1Energy();
        sc1.setUserName(userName);
        sc1.setCity(city);
        sc1.setInventoryPeriod(inventoryPeriod);
        sc1.setSubSector(subSector);
        sc1.setScope(scope);
        sc1.setDiesel(diesel);
        sc1.setDieselUnit(dieselUnit);
        sc1.setGasoline(gasoline);
        sc1.setGasolineUnit(gasolineUnit);
        sc1.setNaturalGas(naturalGas);
        sc1.setNaturalGasUnit( naturalGasUnit);
        sc1.setLgn(lgn);
        sc1.setLgnUnit( lgnUnit);
        sc1.setPropane(propane);
        sc1.setPropaneUnit( propaneUnit);
        sc1.setOther(other);
        sc1.setOtherUnit( otherUnit);
        sc1.setOtherDescription( otherDescription);
        sc1.setElectricity(electricity);
        sc1.setElectricityUnit( electricityUnit);
        sector1EnergyRepository.save(sc1);
        LOGGER.info("Sector1Energy "+ subSector+" "+ scope+" saved");
        return sc1;
    }

    @Override
    public Sector1Energy updateSector1(Long id, Integer diesel, String dieselUnit, Integer gasoline, String gasolineUnit, Integer naturalGas, String naturalGasUnit, Integer lgn, String lgnUnit, Integer propane, String propaneUnit, Integer other, String otherUnit, String otherDescription, Integer electricity, String electricityUnit) throws IOException {
        Sector1Energy sc1 = sector1EnergyRepository.findSector1ById(id);
        sc1.setDiesel(diesel);
        sc1.setDieselUnit(dieselUnit);
        sc1.setGasoline(gasoline);
        sc1.setGasolineUnit(gasolineUnit);
        sc1.setNaturalGas(naturalGas);
        sc1.setNaturalGasUnit( naturalGasUnit);
        sc1.setLgn(lgn);
        sc1.setLgnUnit( lgnUnit);
        sc1.setPropane(propane);
        sc1.setPropaneUnit( propaneUnit);
        sc1.setOther(other);
        sc1.setOtherUnit( otherUnit);
        sc1.setOtherDescription( otherDescription);
        sc1.setElectricity(electricity);
        sc1.setElectricityUnit( electricityUnit);
        sector1EnergyRepository.save(sc1);
        LOGGER.info("Sector1Energy id:"+ id+" updated");
        return sc1;
    }

    @Override
    public void deleteSector1byId(Long id) throws IOException {
        Sector1Energy sc1 = sector1EnergyRepository.findSector1ById(id);
        sector1EnergyRepository.delete(sc1);
        LOGGER.info("Sector1Energy with id: " + id+ " deleted");
    }
}
