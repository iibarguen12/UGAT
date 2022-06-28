package com.supportportal.resource;

import com.supportportal.domain.HttpResponse;
import com.supportportal.domain.Sector5AFOLU;
import com.supportportal.exception.ExceptionHandling;
import com.supportportal.service.Sector5AFOLUService;
import com.supportportal.utility.ChecksProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping(path = { "/sector5AFOLU"})
public class Sector5AFOLUResource extends ExceptionHandling {
    public static final String Sector5_DELETED_SUCCESSFULLY = "Sector 2 Transportation deleted successfully";

    private Sector5AFOLUService sector5AFOLUService;

    @Autowired
    public Sector5AFOLUResource(Sector5AFOLUService sector5AFOLUService) {
        this.sector5AFOLUService = sector5AFOLUService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<Sector5AFOLU>> getAllSector5() {
        List<Sector5AFOLU> sectors1 = sector5AFOLUService.getAllSector5();
        return new ResponseEntity<>(sectors1, OK);
    }

    @GetMapping("/find/id/{id}")
    public ResponseEntity<Sector5AFOLU> getSector5ById(@PathVariable("id") String strId) {
        Long id = Long.valueOf(ChecksProvider.stringIsNotNull(strId)?Integer.parseInt(strId.replace("\"","")):null);
        Sector5AFOLU sector5AFOLU = sector5AFOLUService.findSector5ById(id);
        return new ResponseEntity<>(sector5AFOLU, OK);
    }

    @GetMapping("/find/subSector/{subSector}")
    public ResponseEntity<List<Sector5AFOLU>> getAllSector5BySubSector(@PathVariable("subSector") String subSector) {
        List<Sector5AFOLU> sectors1 = sector5AFOLUService.findAllSector5BySubSector(subSector);
        return new ResponseEntity<>(sectors1, OK);
    }

    @GetMapping("/find/scope/{scope}")
    public ResponseEntity<List<Sector5AFOLU>> getAllSector5ByScope(@PathVariable("scope") String scope) {
        List<Sector5AFOLU> sectors1 = sector5AFOLUService.findAllSector5ByScope(scope);
        return new ResponseEntity<>(sectors1, OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Sector5AFOLU> addSector5 (@RequestParam("userName") String userName,
                                                    @RequestParam("city") String city,
                                                    @RequestParam("inventoryPeriod") String inventoryPeriod,
                                                    @RequestParam("subSector") String subSector,
                                                    @RequestParam("scope") String scope,
                                                    @RequestParam("cows") String cowsStr,
                                                    @RequestParam("buffaloes") String buffaloesStr,
                                                    @RequestParam("sheep") String sheepStr,
                                                    @RequestParam("camel") String camelStr,
                                                    @RequestParam("horses") String horsesStr,
                                                    @RequestParam("swine") String swineStr,
                                                    @RequestParam("poultry") String poultryStr,
                                                    @RequestParam("mulesAndAssess") String mulesAndAssessStr,
                                                    @RequestParam("other") String otherStr,
                                                    @RequestParam("otherDescription") String otherDescription,
                                                    @RequestParam("landEmission1") String landEmission1Str,
                                                    @RequestParam("landEmission1Type") String landEmission1Type,
                                                    @RequestParam("landEmission1Unit") String landEmission1Unit,
                                                    @RequestParam("landEmission2") String landEmission2Str,
                                                    @RequestParam("landEmission2Type") String landEmission2Type,
                                                    @RequestParam("landEmission2Unit") String landEmission2Unit,
                                                    @RequestParam("landEmission3") String landEmission3Str,
                                                    @RequestParam("landEmission3Type") String landEmission3Type,
                                                    @RequestParam("landEmission3Unit") String landEmission3Unit,
                                                    @RequestParam("burning") String burningStr,
                                                    @RequestParam("burningUnit") String burningUnit,
                                                    @RequestParam("burningForest") String burningForestStr,
                                                    @RequestParam("burningForestUnit") String burningForestUnit,
                                                    @RequestParam("burningGrass") String burningGrassStr,
                                                    @RequestParam("burningGrassUnit") String burningGrassUnit,
                                                    @RequestParam("burningCrop") String burningCropStr,
                                                    @RequestParam("burningCropUnit") String burningCropUnit,
                                                    @RequestParam("burningOther") String burningOtherStr,
                                                    @RequestParam("burningOtherUnit") String burningOtherUnit,
                                                    @RequestParam("liming") String limingStr,
                                                    @RequestParam("limingUnit") String limingUnit,
                                                    @RequestParam("urea") String ureaStr,
                                                    @RequestParam("ureaUnit") String ureaUnit,
                                                    @RequestParam("rice") String riceStr,
                                                    @RequestParam("riceUnit") String riceUnit) throws IOException, ParseException {

        Integer cows = parseJSONValue(cowsStr);
        Integer buffaloes = parseJSONValue(buffaloesStr);
        Integer sheep = parseJSONValue(sheepStr);
        Integer camel = parseJSONValue(camelStr);
        Integer horses = parseJSONValue(horsesStr);
        Integer swine = parseJSONValue(swineStr);
        Integer poultry = parseJSONValue(poultryStr);
        Integer mulesAndAssess = parseJSONValue(mulesAndAssessStr);
        Integer other = parseJSONValue(otherStr);
        Integer landEmission1 = parseJSONValue(landEmission1Str);
        Integer landEmission2 = parseJSONValue(landEmission2Str);
        Integer landEmission3 = parseJSONValue(landEmission3Str);
        Integer burning = parseJSONValue(burningStr);
        Integer burningForest = parseJSONValue(burningForestStr);
        Integer burningGrass = parseJSONValue(burningGrassStr);
        Integer burningCrop = parseJSONValue(burningCropStr);
        Integer burningOther = parseJSONValue(burningOtherStr);
        Integer liming = parseJSONValue(limingStr);
        Integer urea = parseJSONValue(ureaStr);
        Integer rice = parseJSONValue(riceStr);

        Sector5AFOLU sc1 = sector5AFOLUService.addSector5(userName,city,inventoryPeriod,subSector,scope,cows, buffaloes, sheep, camel, horses, swine, poultry, mulesAndAssess, other, otherDescription, landEmission1, landEmission1Type, landEmission1Unit, landEmission2, landEmission2Type, landEmission2Unit, landEmission3, landEmission3Type, landEmission3Unit, burning, burningUnit, burningForest, burningForestUnit, burningGrass, burningGrassUnit, burningCrop, burningCropUnit, burningOther, burningOtherUnit, liming, limingUnit, urea, ureaUnit, rice, riceUnit);
        return new ResponseEntity<>(sc1, OK);
    }

    private Integer parseJSONValue(String strJSON) {
        return ChecksProvider.stringIsNotNull(strJSON) ? Integer.parseInt(strJSON.replace("\"", "")) : null;
    }

    @PostMapping("/update")
    public ResponseEntity<Sector5AFOLU> updateSector5 (@RequestParam("id") String strId,
                                                       @RequestParam("cows") String cowsStr,
                                                       @RequestParam("buffaloes") String buffaloesStr,
                                                       @RequestParam("sheep") String sheepStr,
                                                       @RequestParam("camel") String camelStr,
                                                       @RequestParam("horses") String horsesStr,
                                                       @RequestParam("swine") String swineStr,
                                                       @RequestParam("poultry") String poultryStr,
                                                       @RequestParam("mulesAndAssess") String mulesAndAssessStr,
                                                       @RequestParam("other") String otherStr,
                                                       @RequestParam("otherDescription") String otherDescription,
                                                       @RequestParam("landEmission1") String landEmission1Str,
                                                       @RequestParam("landEmission1Type") String landEmission1Type,
                                                       @RequestParam("landEmission1Unit") String landEmission1Unit,
                                                       @RequestParam("landEmission2") String landEmission2Str,
                                                       @RequestParam("landEmission2Type") String landEmission2Type,
                                                       @RequestParam("landEmission2Unit") String landEmission2Unit,
                                                       @RequestParam("landEmission3") String landEmission3Str,
                                                       @RequestParam("landEmission3Type") String landEmission3Type,
                                                       @RequestParam("landEmission3Unit") String landEmission3Unit,
                                                       @RequestParam("burning") String burningStr,
                                                       @RequestParam("burningUnit") String burningUnit,
                                                       @RequestParam("burningForest") String burningForestStr,
                                                       @RequestParam("burningForestUnit") String burningForestUnit,
                                                       @RequestParam("burningGrass") String burningGrassStr,
                                                       @RequestParam("burningGrassUnit") String burningGrassUnit,
                                                       @RequestParam("burningCrop") String burningCropStr,
                                                       @RequestParam("burningCropUnit") String burningCropUnit,
                                                       @RequestParam("burningOther") String burningOtherStr,
                                                       @RequestParam("burningOtherUnit") String burningOtherUnit,
                                                       @RequestParam("liming") String limingStr,
                                                       @RequestParam("limingUnit") String limingUnit,
                                                       @RequestParam("urea") String ureaStr,
                                                       @RequestParam("ureaUnit") String ureaUnit,
                                                       @RequestParam("rice") String riceStr,
                                                       @RequestParam("riceUnit") String riceUnit) throws IOException, ParseException {

        Long id = Long.valueOf(parseJSONValue(strId));
        Integer cows = parseJSONValue(cowsStr);
        Integer buffaloes = parseJSONValue(buffaloesStr);
        Integer sheep = parseJSONValue(sheepStr);
        Integer camel = parseJSONValue(camelStr);
        Integer horses = parseJSONValue(horsesStr);
        Integer swine = parseJSONValue(swineStr);
        Integer poultry = parseJSONValue(poultryStr);
        Integer mulesAndAssess = parseJSONValue(mulesAndAssessStr);
        Integer other = parseJSONValue(otherStr);
        Integer landEmission1 = parseJSONValue(landEmission1Str);
        Integer landEmission2 = parseJSONValue(landEmission2Str);
        Integer landEmission3 = parseJSONValue(landEmission3Str);
        Integer burning = parseJSONValue(burningStr);
        Integer burningForest = parseJSONValue(burningForestStr);
        Integer burningGrass = parseJSONValue(burningGrassStr);
        Integer burningCrop = parseJSONValue(burningCropStr);
        Integer burningOther = parseJSONValue(burningOtherStr);
        Integer liming = parseJSONValue(limingStr);
        Integer urea = parseJSONValue(ureaStr);
        Integer rice = parseJSONValue(riceStr);

        Sector5AFOLU sc1 = sector5AFOLUService.updateSector5(id,cows, buffaloes, sheep, camel, horses, swine, poultry, mulesAndAssess, other, otherDescription, landEmission1, landEmission1Type, landEmission1Unit, landEmission2, landEmission2Type, landEmission2Unit, landEmission3, landEmission3Type, landEmission3Unit, burning, burningUnit, burningForest, burningForestUnit, burningGrass, burningGrassUnit, burningCrop, burningCropUnit, burningOther, burningOtherUnit, liming, limingUnit, urea, ureaUnit, rice, riceUnit);
        return new ResponseEntity<>(sc1, OK);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyAuthority('user:delete')")
    public ResponseEntity<HttpResponse> deleteSector5(@PathVariable("id") String strId) throws IOException {
        Long id = Long.valueOf(ChecksProvider.stringIsNotNull(strId)?Integer.parseInt(strId.replace("\"","")):null);
        sector5AFOLUService.deleteSector5byId(id);
        return response(OK, Sector5_DELETED_SUCCESSFULLY);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(),
                message), httpStatus);
    }
}
