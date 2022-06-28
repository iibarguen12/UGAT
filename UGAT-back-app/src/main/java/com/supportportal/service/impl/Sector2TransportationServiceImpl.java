package com.supportportal.service.impl;

import com.supportportal.domain.Sector2Transportation;
import com.supportportal.repository.Sector2TransportationRepository;
import com.supportportal.service.Sector2TransportationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@Service
@Transactional
public class Sector2TransportationServiceImpl implements Sector2TransportationService {

    private Logger LOGGER = LoggerFactory.getLogger(getClass());
    private Sector2TransportationRepository Sector2TransportationRepository;

    @Autowired
    public Sector2TransportationServiceImpl(Sector2TransportationRepository Sector2TransportationRepository) {
        this.Sector2TransportationRepository = Sector2TransportationRepository;
    }

    @Override
    public List<Sector2Transportation> getAllSector2() {
        return Sector2TransportationRepository.findAll();
    }

    @Override
    public Sector2Transportation findSector2ById(Long id) {
        return Sector2TransportationRepository.findSector2ById(id);
    }

    @Override
    public List<Sector2Transportation> findAllSector2BySubSector(String subSector) {
        return Sector2TransportationRepository.findSector2BySubSector(subSector);
    }

    @Override
    public List<Sector2Transportation> findAllSector2ByScope(String scope) {
        return Sector2TransportationRepository.findSector2ByScope(scope);
    }

    @Override
    public Sector2Transportation addSector2(String userName, String city, String inventoryPeriod, String subSector, String scope, Integer diesel, String dieselUnit, Integer gasoline, String gasolineUnit, Integer naturalGas, String naturalGasUnit, Integer lgn, String lgnUnit, Integer propane, String propaneUnit, Integer other, String otherUnit, String otherDescription, Integer electricity, String electricityUnit) throws IOException {
        Sector2Transportation sc2 = new Sector2Transportation();
        sc2.setUserName(userName);
        sc2.setCity(city);
        sc2.setInventoryPeriod(inventoryPeriod);
        sc2.setSubSector(subSector);
        sc2.setScope(scope);
        sc2.setDiesel(diesel);
        sc2.setDieselUnit(dieselUnit);
        sc2.setGasoline(gasoline);
        sc2.setGasolineUnit(gasolineUnit);
        sc2.setNaturalGas(naturalGas);
        sc2.setNaturalGasUnit( naturalGasUnit);
        sc2.setLgn(lgn);
        sc2.setLgnUnit( lgnUnit);
        sc2.setPropane(propane);
        sc2.setPropaneUnit( propaneUnit);
        sc2.setOther(other);
        sc2.setOtherUnit( otherUnit);
        sc2.setOtherDescription( otherDescription);
        sc2.setElectricity(electricity);
        sc2.setElectricityUnit( electricityUnit);
        Sector2TransportationRepository.save(sc2);
        LOGGER.info("Sector2Transportation "+ subSector+" "+ scope+" saved");
        return sc2;
    }

    @Override
    public Sector2Transportation updateSector2(Long id, Integer diesel, String dieselUnit, Integer gasoline, String gasolineUnit, Integer naturalGas, String naturalGasUnit, Integer lgn, String lgnUnit, Integer propane, String propaneUnit, Integer other, String otherUnit, String otherDescription, Integer electricity, String electricityUnit) throws IOException {
        Sector2Transportation sc2 = Sector2TransportationRepository.findSector2ById(id);
        sc2.setDiesel(diesel);
        sc2.setDieselUnit(dieselUnit);
        sc2.setGasoline(gasoline);
        sc2.setGasolineUnit(gasolineUnit);
        sc2.setNaturalGas(naturalGas);
        sc2.setNaturalGasUnit( naturalGasUnit);
        sc2.setLgn(lgn);
        sc2.setLgnUnit( lgnUnit);
        sc2.setPropane(propane);
        sc2.setPropaneUnit( propaneUnit);
        sc2.setOther(other);
        sc2.setOtherUnit( otherUnit);
        sc2.setOtherDescription( otherDescription);
        sc2.setElectricity(electricity);
        sc2.setElectricityUnit( electricityUnit);
        Sector2TransportationRepository.save(sc2);
        LOGGER.info("Sector2Transportation id:"+ id+" updated");
        return sc2;
    }

    @Override
    public void deleteSector2byId(Long id) throws IOException {
        Sector2Transportation sc2 = Sector2TransportationRepository.findSector2ById(id);
        Sector2TransportationRepository.delete(sc2);
        LOGGER.info("Sector2Transportation with id: " + id+ " deleted");
    }
}
