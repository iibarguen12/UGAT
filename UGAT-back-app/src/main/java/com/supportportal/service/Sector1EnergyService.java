package com.supportportal.service;

import com.supportportal.domain.Sector1Energy;

import java.io.IOException;
import java.util.List;

public interface Sector1EnergyService {

    List<Sector1Energy> getAllSector1();

    Sector1Energy findSector1ById(Long id);

    List<Sector1Energy> findAllSector1BySubSector(String subSector);

    List<Sector1Energy> findAllSector1ByScope(String scope);

    Sector1Energy addSector1(String userName, String city, String inventoryPeriod, String subSector, String scope, Integer diesel, String dieselUnit, Integer gasoline, String gasolineUnit, Integer naturalGas, String naturalGasUnit, Integer lgn, String lgnUnit, Integer propane, String propaneUnit, Integer other, String otherUnit, String otherDescription, Integer electricity, String electricityUnit) throws IOException;

    Sector1Energy updateSector1(Long id, Integer diesel, String dieselUnit, Integer gasoline, String gasolineUnit, Integer naturalGas, String naturalGasUnit, Integer lgn, String lgnUnit, Integer propane, String propaneUnit, Integer other, String otherUnit, String otherDescription, Integer electricity, String electricityUnit) throws IOException;

    void deleteSector1byId(Long id) throws IOException;

}
