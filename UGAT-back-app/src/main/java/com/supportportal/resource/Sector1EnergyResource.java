package com.supportportal.resource;

import com.supportportal.utility.ChecksProvider;
import com.supportportal.domain.HttpResponse;
import com.supportportal.domain.Sector1Energy;
import com.supportportal.exception.ExceptionHandling;
import com.supportportal.service.Sector1EnergyService;
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
@RequestMapping(path = { "/sector1Energy"})
public class Sector1EnergyResource extends ExceptionHandling {
    public static final String SECTOR1_DELETED_SUCCESSFULLY = "Sector 1 Energy deleted successfully";

    private Sector1EnergyService sector1EnergyService;

    @Autowired
    public Sector1EnergyResource(Sector1EnergyService sector1EnergyService) {
        this.sector1EnergyService = sector1EnergyService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<Sector1Energy>> getAllSector1() {
        List<Sector1Energy> sectors1 = sector1EnergyService.getAllSector1();
        return new ResponseEntity<>(sectors1, OK);
    }

    @GetMapping("/find/id/{id}")
    public ResponseEntity<Sector1Energy> getSector1ById(@PathVariable("id") String strId) {
        Long id = Long.valueOf(ChecksProvider.stringIsNotNull(strId)?Integer.parseInt(strId.replace("\"","")):null);
        Sector1Energy sector1Energy = sector1EnergyService.findSector1ById(id);
        return new ResponseEntity<>(sector1Energy, OK);
    }

    @GetMapping("/find/subSector/{subSector}")
    public ResponseEntity<List<Sector1Energy>> getAllSector1BySubSector(@PathVariable("subSector") String subSector) {
        List<Sector1Energy> sectors1 = sector1EnergyService.findAllSector1BySubSector(subSector);
        return new ResponseEntity<>(sectors1, OK);
    }

    @GetMapping("/find/scope/{scope}")
    public ResponseEntity<List<Sector1Energy>> getAllSector1ByScope(@PathVariable("scope") String scope) {
        List<Sector1Energy> sectors1 = sector1EnergyService.findAllSector1ByScope(scope);
        return new ResponseEntity<>(sectors1, OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Sector1Energy> addSector1 (@RequestParam("userName") String userName,
                                                     @RequestParam("city") String city,
                                                     @RequestParam("inventoryPeriod") String inventoryPeriod,
                                                     @RequestParam("subSector") String subSector,
                                                     @RequestParam("scope") String scope,
                                                     @RequestParam("diesel") String strDiesel,
                                                     @RequestParam("dieselUnit") String dieselUnit,
                                                     @RequestParam("gasoline") String strGasoline,
                                                     @RequestParam("gasolineUnit") String gasolineUnit,
                                                     @RequestParam("naturalGas") String strNaturalGas,
                                                     @RequestParam("naturalGasUnit") String naturalGasUnit,
                                                     @RequestParam("lgn") String strLgn,
                                                     @RequestParam("lgnUnit") String lgnUnit,
                                                     @RequestParam("propane") String strPropane,
                                                     @RequestParam("propaneUnit") String propaneUnit,
                                                     @RequestParam("other") String strOther,
                                                     @RequestParam("otherUnit") String otherUnit,
                                                     @RequestParam("otherDescription") String otherDescription,
                                                     @RequestParam("electricity") String strElectricity,
                                                     @RequestParam("electricityUnit") String electricityUnit) throws IOException, ParseException {

        Integer diesel = ChecksProvider.stringIsNotNull(strDiesel)?Integer.parseInt(strDiesel.replace("\"","")):null;
        Integer gasoline = ChecksProvider.stringIsNotNull(strGasoline)?Integer.parseInt(strGasoline.replace("\"","")):null;
        Integer naturalGas = ChecksProvider.stringIsNotNull(strNaturalGas)?Integer.parseInt(strNaturalGas.replace("\"","")):null;
        Integer lgn = ChecksProvider.stringIsNotNull(strLgn)?Integer.parseInt(strLgn.replace("\"","")):null;
        Integer propane = ChecksProvider.stringIsNotNull(strPropane)?Integer.parseInt(strPropane.replace("\"","")):null;
        Integer other = ChecksProvider.stringIsNotNull(strOther)?Integer.parseInt(strOther.replace("\"","")):null;
        Integer electricity = ChecksProvider.stringIsNotNull(strElectricity)?Integer.parseInt(strElectricity.replace("\"","")):null;

        Sector1Energy sc1 = sector1EnergyService.addSector1(userName, city, inventoryPeriod, subSector, scope, diesel, dieselUnit, gasoline, gasolineUnit, naturalGas, naturalGasUnit, lgn, lgnUnit, propane, propaneUnit, other, otherUnit, otherDescription, electricity, electricityUnit);
        return new ResponseEntity<>(sc1, OK);
    }

    @PostMapping("/update")
    public ResponseEntity<Sector1Energy> updateSector1 (@RequestParam("id") String strId,
                                                     @RequestParam("diesel") String strDiesel,
                                                     @RequestParam("dieselUnit") String dieselUnit,
                                                     @RequestParam("gasoline") String strGasoline,
                                                     @RequestParam("gasolineUnit") String gasolineUnit,
                                                     @RequestParam("naturalGas") String strNaturalGas,
                                                     @RequestParam("naturalGasUnit") String naturalGasUnit,
                                                     @RequestParam("lgn") String strLgn,
                                                     @RequestParam("lgnUnit") String lgnUnit,
                                                     @RequestParam("propane") String strPropane,
                                                     @RequestParam("propaneUnit") String propaneUnit,
                                                     @RequestParam("other") String strOther,
                                                     @RequestParam("otherUnit") String otherUnit,
                                                     @RequestParam("otherDescription") String otherDescription,
                                                     @RequestParam("electricity") String strElectricity,
                                                     @RequestParam("electricityUnit") String electricityUnit) throws IOException, ParseException {

        Long id = Long.valueOf(ChecksProvider.stringIsNotNull(strId)?Integer.parseInt(strId.replace("\"","")):null);
        Integer diesel = ChecksProvider.stringIsNotNull(strDiesel)?Integer.parseInt(strDiesel.replace("\"","")):null;
        Integer gasoline = ChecksProvider.stringIsNotNull(strGasoline)?Integer.parseInt(strGasoline.replace("\"","")):null;
        Integer naturalGas = ChecksProvider.stringIsNotNull(strNaturalGas)?Integer.parseInt(strNaturalGas.replace("\"","")):null;
        Integer lgn = ChecksProvider.stringIsNotNull(strLgn)?Integer.parseInt(strLgn.replace("\"","")):null;
        Integer propane = ChecksProvider.stringIsNotNull(strPropane)?Integer.parseInt(strPropane.replace("\"","")):null;
        Integer other = ChecksProvider.stringIsNotNull(strOther)?Integer.parseInt(strOther.replace("\"","")):null;
        Integer electricity = ChecksProvider.stringIsNotNull(strElectricity)?Integer.parseInt(strElectricity.replace("\"","")):null;

        Sector1Energy sc1 = sector1EnergyService.updateSector1(id, diesel, dieselUnit, gasoline, gasolineUnit, naturalGas, naturalGasUnit, lgn, lgnUnit, propane, propaneUnit, other, otherUnit, otherDescription, electricity, electricityUnit);
        return new ResponseEntity<>(sc1, OK);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyAuthority('user:delete')")
    public ResponseEntity<HttpResponse> deleteSector1(@PathVariable("id") String strId) throws IOException {
        Long id = Long.valueOf(ChecksProvider.stringIsNotNull(strId)?Integer.parseInt(strId.replace("\"","")):null);
        sector1EnergyService.deleteSector1byId(id);
        return response(OK, SECTOR1_DELETED_SUCCESSFULLY);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(),
                message), httpStatus);
    }
}
