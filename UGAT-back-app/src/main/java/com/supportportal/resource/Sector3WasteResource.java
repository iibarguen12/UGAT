package com.supportportal.resource;

import com.supportportal.domain.HttpResponse;
import com.supportportal.domain.Sector3Waste;
import com.supportportal.exception.ExceptionHandling;
import com.supportportal.service.Sector3WasteService;
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
@RequestMapping(path = { "/sector3Waste"})
public class Sector3WasteResource extends ExceptionHandling {
    public static final String Sector3_DELETED_SUCCESSFULLY = "Sector 2 Transportation deleted successfully";

    private Sector3WasteService sector3WasteService;

    @Autowired
    public Sector3WasteResource(Sector3WasteService sector3WasteService) {
        this.sector3WasteService = sector3WasteService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<Sector3Waste>> getAllSector3() {
        List<Sector3Waste> sectors1 = sector3WasteService.getAllSector3();
        return new ResponseEntity<>(sectors1, OK);
    }

    @GetMapping("/find/id/{id}")
    public ResponseEntity<Sector3Waste> getSector3ById(@PathVariable("id") String strId) {
        Long id = Long.valueOf(ChecksProvider.stringIsNotNull(strId)?Integer.parseInt(strId.replace("\"","")):null);
        Sector3Waste sector3Waste = sector3WasteService.findSector3ById(id);
        return new ResponseEntity<>(sector3Waste, OK);
    }

    @GetMapping("/find/subSector/{subSector}")
    public ResponseEntity<List<Sector3Waste>> getAllSector3BySubSector(@PathVariable("subSector") String subSector) {
        List<Sector3Waste> sectors1 = sector3WasteService.findAllSector3BySubSector(subSector);
        return new ResponseEntity<>(sectors1, OK);
    }

    @GetMapping("/find/scope/{scope}")
    public ResponseEntity<List<Sector3Waste>> getAllSector3ByScope(@PathVariable("scope") String scope) {
        List<Sector3Waste> sectors1 = sector3WasteService.findAllSector3ByScope(scope);
        return new ResponseEntity<>(sectors1, OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Sector3Waste> addSector3 (@RequestParam("userName") String userName,
                                                     @RequestParam("city") String city,
                                                     @RequestParam("inventoryPeriod") String inventoryPeriod,
                                                     @RequestParam("subSector") String subSector,
                                                     @RequestParam("scope") String scope,
                                                     @RequestParam("organic") String strOrganic,
                                                     @RequestParam("organicUnit") String organicUnit,
                                                     @RequestParam("paper") String strPaper,
                                                     @RequestParam("paperUnit") String paperUnit,
                                                     @RequestParam("plastic") String strPlastic,
                                                     @RequestParam("plasticUnit") String plasticUnit,
                                                     @RequestParam("glass") String strGlass,
                                                     @RequestParam("glassUnit") String glassUnit,
                                                     @RequestParam("gardening") String strGardening,
                                                     @RequestParam("gardeningUnit") String gardeningUnit,
                                                     @RequestParam("inert") String strInert,
                                                     @RequestParam("inertUnit") String inertUnit,
                                                     @RequestParam("water") String strWater,
                                                     @RequestParam("waterUnit") String waterUnit) throws IOException, ParseException {

        Integer organic = parseJSONValue(strOrganic);
        Integer paper = parseJSONValue(strPaper);
        Integer plastic = parseJSONValue(strPlastic);
        Integer glass = parseJSONValue(strGlass);
        Integer gardening = parseJSONValue(strGardening);
        Integer inert = parseJSONValue(strInert);
        Integer water = parseJSONValue(strWater);

        Sector3Waste sc1 = sector3WasteService.addSector3(userName, city, inventoryPeriod, subSector, scope, organic, organicUnit, paper, paperUnit, plastic, plasticUnit, glass, glassUnit, gardening, gardeningUnit, inert, inertUnit, water, waterUnit);
        return new ResponseEntity<>(sc1, OK);
    }

    private Integer parseJSONValue(String strJSON) {
        return ChecksProvider.stringIsNotNull(strJSON) ? Integer.parseInt(strJSON.replace("\"", "")) : null;
    }

    @PostMapping("/update")
    public ResponseEntity<Sector3Waste> updateSector3 (@RequestParam("id") String strId,
                                                       @RequestParam("organic") String strOrganic,
                                                       @RequestParam("organicUnit") String organicUnit,
                                                       @RequestParam("paper") String strPaper,
                                                       @RequestParam("paperUnit") String paperUnit,
                                                       @RequestParam("plastic") String strPlastic,
                                                       @RequestParam("plasticUnit") String plasticUnit,
                                                       @RequestParam("glass") String strGlass,
                                                       @RequestParam("glassUnit") String glassUnit,
                                                       @RequestParam("gardening") String strGardening,
                                                       @RequestParam("gardeningUnit") String gardeningUnit,
                                                       @RequestParam("inert") String strInert,
                                                       @RequestParam("inertUnit") String inertUnit,
                                                       @RequestParam("water") String strWater,
                                                       @RequestParam("waterUnit") String waterUnit) throws IOException, ParseException {

        Long id = Long.valueOf(parseJSONValue(strId));
        Integer organic = parseJSONValue(strOrganic);
        Integer paper = parseJSONValue(strPaper);
        Integer plastic = parseJSONValue(strPlastic);
        Integer glass = parseJSONValue(strGlass);
        Integer gardening = parseJSONValue(strGardening);
        Integer inert = parseJSONValue(strInert);
        Integer water = parseJSONValue(strWater);

        Sector3Waste sc1 = sector3WasteService.updateSector3(id, organic, organicUnit, paper, paperUnit, plastic, plasticUnit, glass, glassUnit, gardening, gardeningUnit, inert, inertUnit, water, waterUnit);
        return new ResponseEntity<>(sc1, OK);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyAuthority('user:delete')")
    public ResponseEntity<HttpResponse> deleteSector3(@PathVariable("id") String strId) throws IOException {
        Long id = Long.valueOf(ChecksProvider.stringIsNotNull(strId)?Integer.parseInt(strId.replace("\"","")):null);
        sector3WasteService.deleteSector3byId(id);
        return response(OK, Sector3_DELETED_SUCCESSFULLY);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(),
                message), httpStatus);
    }
}
