package com.supportportal.service;

import com.supportportal.domain.Sector2Transportation;

import java.io.IOException;
import java.util.List;

public interface Sector2TransportationService {

    List<Sector2Transportation> getAllSector2();

    Sector2Transportation findSector2ById(Long id);

    List<Sector2Transportation> findAllSector2BySubSector(String subSector);

    List<Sector2Transportation> findAllSector2ByScope(String scope);

    Sector2Transportation addSector2(String userName, String city, String inventoryPeriod, String subSector, String scope, Integer diesel, String dieselUnit, Integer gasoline, String gasolineUnit, Integer naturalGas, String naturalGasUnit, Integer lgn, String lgnUnit, Integer propane, String propaneUnit, Integer other, String otherUnit, String otherDescription, Integer electricity, String electricityUnit) throws IOException;

    Sector2Transportation updateSector2(Long id, Integer diesel, String dieselUnit, Integer gasoline, String gasolineUnit, Integer naturalGas, String naturalGasUnit, Integer lgn, String lgnUnit, Integer propane, String propaneUnit, Integer other, String otherUnit, String otherDescription, Integer electricity, String electricityUnit) throws IOException;

    void deleteSector2byId(Long id) throws IOException;

}
