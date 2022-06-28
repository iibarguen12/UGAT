package com.supportportal.resource;

import com.supportportal.domain.HttpResponse;
import com.supportportal.domain.Sector2Transportation;
import com.supportportal.exception.ExceptionHandling;
import com.supportportal.service.Sector2TransportationService;
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
@RequestMapping(path = { "/sector2Transportation"})
public class Sector2TransportationResource extends ExceptionHandling {
    public static final String Sector2_DELETED_SUCCESSFULLY = "Sector 2 Transportation deleted successfully";

    private Sector2TransportationService sector2TransportationService;

    @Autowired
    public Sector2TransportationResource(Sector2TransportationService sector2TransportationService) {
        this.sector2TransportationService = sector2TransportationService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<Sector2Transportation>> getAllSector2() {
        List<Sector2Transportation> sectors1 = sector2TransportationService.getAllSector2();
        return new ResponseEntity<>(sectors1, OK);
    }

    @GetMapping("/find/id/{id}")
    public ResponseEntity<Sector2Transportation> getSector2ById(@PathVariable("id") String strId) {
        Long id = Long.valueOf(ChecksProvider.stringIsNotNull(strId)?Integer.parseInt(strId.replace("\"","")):null);
        Sector2Transportation sector2Transportation = sector2TransportationService.findSector2ById(id);
        return new ResponseEntity<>(sector2Transportation, OK);
    }

    @GetMapping("/find/subSector/{subSector}")
    public ResponseEntity<List<Sector2Transportation>> getAllSector2BySubSector(@PathVariable("subSector") String subSector) {
        List<Sector2Transportation> sectors1 = sector2TransportationService.findAllSector2BySubSector(subSector);
        return new ResponseEntity<>(sectors1, OK);
    }

    @GetMapping("/find/scope/{scope}")
    public ResponseEntity<List<Sector2Transportation>> getAllSector2ByScope(@PathVariable("scope") String scope) {
        List<Sector2Transportation> sectors1 = sector2TransportationService.findAllSector2ByScope(scope);
        return new ResponseEntity<>(sectors1, OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Sector2Transportation> addSector2 (@RequestParam("userName") String userName,
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

        Sector2Transportation sc1 = sector2TransportationService.addSector2(userName, city, inventoryPeriod, subSector, scope, diesel, dieselUnit, gasoline, gasolineUnit, naturalGas, naturalGasUnit, lgn, lgnUnit, propane, propaneUnit, other, otherUnit, otherDescription, electricity, electricityUnit);
        return new ResponseEntity<>(sc1, OK);
    }

    @PostMapping("/update")
    public ResponseEntity<Sector2Transportation> updateSector2 (@RequestParam("id") String strId,
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

        Sector2Transportation sc1 = sector2TransportationService.updateSector2(id, diesel, dieselUnit, gasoline, gasolineUnit, naturalGas, naturalGasUnit, lgn, lgnUnit, propane, propaneUnit, other, otherUnit, otherDescription, electricity, electricityUnit);
        return new ResponseEntity<>(sc1, OK);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyAuthority('user:delete')")
    public ResponseEntity<HttpResponse> deleteSector2(@PathVariable("id") String strId) throws IOException {
        Long id = Long.valueOf(ChecksProvider.stringIsNotNull(strId)?Integer.parseInt(strId.replace("\"","")):null);
        sector2TransportationService.deleteSector2byId(id);
        return response(OK, Sector2_DELETED_SUCCESSFULLY);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(),
                message), httpStatus);
    }
}
