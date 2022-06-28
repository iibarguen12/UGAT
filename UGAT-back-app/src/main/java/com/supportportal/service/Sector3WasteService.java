package com.supportportal.service;

import com.supportportal.domain.Sector3Waste;

import java.io.IOException;
import java.util.List;

public interface Sector3WasteService {

    List<Sector3Waste> getAllSector3();

    Sector3Waste findSector3ById(Long id);

    List<Sector3Waste> findAllSector3BySubSector(String subSector);

    List<Sector3Waste> findAllSector3ByScope(String scope);

    Sector3Waste addSector3(String userName,String city,String inventoryPeriod,String subSector,String scope,Integer organic,String organicUnit,Integer paper,String paperUnit,Integer plastic,String plasticUnit,Integer glass,String glassUnit,Integer gardening,String gardeningUnit,Integer inert,String inertUnit,Integer water,String waterUnit) throws IOException;

    Sector3Waste updateSector3(Long id,Integer organic,String organicUnit,Integer paper,String paperUnit,Integer plastic,String plasticUnit,Integer glass,String glassUnit,Integer gardening,String gardeningUnit,Integer inert,String inertUnit,Integer water,String waterUnit) throws IOException;

    void deleteSector3byId(Long id) throws IOException;

}
