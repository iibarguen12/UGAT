package com.supportportal.service;

import com.supportportal.domain.Sector5AFOLU;

import java.io.IOException;
import java.util.List;

public interface Sector5AFOLUService {

    List<Sector5AFOLU> getAllSector5();

    Sector5AFOLU findSector5ById(Long id);

    List<Sector5AFOLU> findAllSector5BySubSector(String subSector);

    List<Sector5AFOLU> findAllSector5ByScope(String scope);

    Sector5AFOLU addSector5(String userName,String city,String inventoryPeriod,String subSector,String scope,Integer cows, Integer buffaloes, Integer sheep, Integer camel, Integer horses, Integer swine, Integer poultry, Integer mulesAndAssess, Integer other, String otherDescription, Integer landEmission1, String landEmission1Type, String landEmission1Unit, Integer landEmission2, String landEmission2Type, String landEmission2Unit, Integer landEmission3, String landEmission3Type, String landEmission3Unit, Integer burning, String burningUnit, Integer burningForest, String burningForestUnit, Integer burningGrass, String burningGrassUnit, Integer burningCrop, String burningCropUnit, Integer burningOther, String burningOtherUnit, Integer liming, String limingUnit, Integer urea, String ureaUnit, Integer rice, String riceUnit) throws IOException;

    Sector5AFOLU updateSector5(Long id,Integer cows, Integer buffaloes, Integer sheep, Integer camel, Integer horses, Integer swine, Integer poultry, Integer mulesAndAssess, Integer other, String otherDescription, Integer landEmission1, String landEmission1Type, String landEmission1Unit, Integer landEmission2, String landEmission2Type, String landEmission2Unit, Integer landEmission3, String landEmission3Type, String landEmission3Unit, Integer burning, String burningUnit, Integer burningForest, String burningForestUnit, Integer burningGrass, String burningGrassUnit, Integer burningCrop, String burningCropUnit, Integer burningOther, String burningOtherUnit, Integer liming, String limingUnit, Integer urea, String ureaUnit, Integer rice, String riceUnit) throws IOException;

    void deleteSector5byId(Long id) throws IOException;

}
