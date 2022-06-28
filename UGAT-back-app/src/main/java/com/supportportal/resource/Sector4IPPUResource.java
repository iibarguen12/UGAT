package com.supportportal.resource;

import com.supportportal.domain.HttpResponse;
import com.supportportal.domain.Sector4IPPU;
import com.supportportal.exception.ExceptionHandling;
import com.supportportal.service.Sector4IPPUService;
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
@RequestMapping(path = { "/sector4IPPU"})
public class Sector4IPPUResource extends ExceptionHandling {
    public static final String Sector4_DELETED_SUCCESSFULLY = "Sector 2 Transportation deleted successfully";

    private Sector4IPPUService sector4IPPUService;

    @Autowired
    public Sector4IPPUResource(Sector4IPPUService sector4IPPUService) {
        this.sector4IPPUService = sector4IPPUService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<Sector4IPPU>> getAllSector4() {
        List<Sector4IPPU> sectors1 = sector4IPPUService.getAllSector4();
        return new ResponseEntity<>(sectors1, OK);
    }

    @GetMapping("/find/id/{id}")
    public ResponseEntity<Sector4IPPU> getSector4ById(@PathVariable("id") String strId) {
        Long id = Long.valueOf(ChecksProvider.stringIsNotNull(strId)?Integer.parseInt(strId.replace("\"","")):null);
        Sector4IPPU sector4IPPU = sector4IPPUService.findSector4ById(id);
        return new ResponseEntity<>(sector4IPPU, OK);
    }

    @GetMapping("/find/subSector/{subSector}")
    public ResponseEntity<List<Sector4IPPU>> getAllSector4BySubSector(@PathVariable("subSector") String subSector) {
        List<Sector4IPPU> sectors1 = sector4IPPUService.findAllSector4BySubSector(subSector);
        return new ResponseEntity<>(sectors1, OK);
    }

    @GetMapping("/find/scope/{scope}")
    public ResponseEntity<List<Sector4IPPU>> getAllSector4ByScope(@PathVariable("scope") String scope) {
        List<Sector4IPPU> sectors1 = sector4IPPUService.findAllSector4ByScope(scope);
        return new ResponseEntity<>(sectors1, OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Sector4IPPU> addSector4 (@RequestParam("userName") String userName,
                                                     @RequestParam("city") String city,
                                                     @RequestParam("inventoryPeriod") String inventoryPeriod,
                                                     @RequestParam("subSector") String subSector,
                                                     @RequestParam("scope") String scope,
                                                   @RequestParam("clinker") String clinkerStr,
                                                   @RequestParam("clinkerUnit") String clinkerUnit,
                                                   @RequestParam("lime") String limeStr,
                                                   @RequestParam("limeUnit") String limeUnit,
                                                   @RequestParam("glass") String glassStr,
                                                   @RequestParam("glassUnit") String glassUnit,
                                                   @RequestParam("ammonia") String ammoniaStr,
                                                   @RequestParam("ammoniaUnit") String ammoniaUnit,
                                                   @RequestParam("nitricAcid") String nitricAcidStr,
                                                   @RequestParam("nitricAcidUnit") String nitricAcidUnit,
                                                   @RequestParam("adipicAcid") String adipicAcidStr,
                                                   @RequestParam("adipicAcidUnit") String adipicAcidUnit,
                                                   @RequestParam("othersAcid") String othersAcidStr,
                                                   @RequestParam("othersAcidUnit") String othersAcidUnit,
                                                   @RequestParam("carbide") String carbideStr,
                                                   @RequestParam("carbideUnit") String carbideUnit,
                                                   @RequestParam("titanium") String titaniumStr,
                                                   @RequestParam("titaniumUnit") String titaniumUnit,
                                                   @RequestParam("soda") String sodaStr,
                                                   @RequestParam("sodaUnit") String sodaUnit,
                                                   @RequestParam("metallurgical") String metallurgicalStr,
                                                   @RequestParam("metallurgicalUnit") String metallurgicalUnit,
                                                   @RequestParam("iron") String ironStr,
                                                   @RequestParam("ironUnit") String ironUnit,
                                                   @RequestParam("ferroalloy") String ferroalloyStr,
                                                   @RequestParam("ferroalloyUnit") String ferroalloyUnit,
                                                   @RequestParam("aluminum") String aluminumStr,
                                                   @RequestParam("aluminumUnit") String aluminumUnit,
                                                   @RequestParam("magnesium") String magnesiumStr,
                                                   @RequestParam("magnesiumUnit") String magnesiumUnit,
                                                   @RequestParam("lead") String leadStr,
                                                   @RequestParam("leadUnit") String leadUnit,
                                                   @RequestParam("zinc") String zincStr,
                                                   @RequestParam("zincUnit") String zincUnit,
                                                   @RequestParam("other") String otherStr,
                                                   @RequestParam("otherUnit") String otherUnit,
                                                   @RequestParam("otherDescription") String otherDescription,
                                                   @RequestParam("lubricants") String lubricantsStr,
                                                   @RequestParam("lubricantsUnit") String lubricantsUnit,
                                                   @RequestParam("parafin") String parafinStr,
                                                   @RequestParam("parafinUnit") String parafinUnit,
                                                   @RequestParam("petroleum") String petroleumStr,
                                                   @RequestParam("petroleumUnit") String petroleumUnit,
                                                   @RequestParam("aromatics") String aromaticsStr,
                                                   @RequestParam("aromaticsUnit") String aromaticsUnit,
                                                   @RequestParam("fluids") String fluidsStr,
                                                   @RequestParam("fluidsUnit") String fluidsUnit,
                                                   @RequestParam("pfc") String pfcStr,
                                                   @RequestParam("pfcUnit") String pfcUnit,
                                                   @RequestParam("hfc") String hfcStr,
                                                   @RequestParam("hfcUnit") String hfcUnit,
                                                   @RequestParam("other2") String other2Str,
                                                   @RequestParam("other2Unit") String other2Unit,
                                                   @RequestParam("other2Description") String other2Description) throws IOException, ParseException {

        Integer clinker = parseJSONValue(clinkerStr);
        Integer lime = parseJSONValue(limeStr);
        Integer glass = parseJSONValue(glassStr);
        Integer ammonia = parseJSONValue(ammoniaStr);
        Integer nitricAcid = parseJSONValue(nitricAcidStr);
        Integer adipicAcid = parseJSONValue(adipicAcidStr);
        Integer othersAcid = parseJSONValue(othersAcidStr);
        Integer carbide = parseJSONValue(carbideStr);
        Integer titanium = parseJSONValue(titaniumStr);
        Integer soda = parseJSONValue(sodaStr);
        Integer metallurgical = parseJSONValue(metallurgicalStr);
        Integer iron = parseJSONValue(ironStr);
        Integer ferroalloy = parseJSONValue(ferroalloyStr);
        Integer aluminum = parseJSONValue(aluminumStr);
        Integer magnesium = parseJSONValue(magnesiumStr);
        Integer lead = parseJSONValue(leadStr);
        Integer zinc = parseJSONValue(zincStr);
        Integer other = parseJSONValue(otherStr);
        Integer lubricants = parseJSONValue(lubricantsStr);
        Integer parafin = parseJSONValue(parafinStr);
        Integer petroleum = parseJSONValue(petroleumStr);
        Integer aromatics = parseJSONValue(aromaticsStr);
        Integer fluids = parseJSONValue(fluidsStr);
        Integer pfc = parseJSONValue(pfcStr);
        Integer hfc = parseJSONValue(hfcStr);
        Integer other2 = parseJSONValue(other2Str);

        Sector4IPPU sc1 = sector4IPPUService.addSector4(userName, city, inventoryPeriod, subSector, scope, clinker,clinkerUnit,lime,limeUnit,glass,glassUnit,ammonia,ammoniaUnit,nitricAcid,nitricAcidUnit,adipicAcid,adipicAcidUnit,othersAcid,othersAcidUnit, carbide,  carbideUnit,  titanium,  titaniumUnit,  soda,  sodaUnit,  metallurgical,  metallurgicalUnit,  iron,  ironUnit,  ferroalloy,  ferroalloyUnit,  aluminum,  aluminumUnit,  magnesium,  magnesiumUnit,  lead,  leadUnit,  zinc,  zincUnit,  other,  otherUnit,  otherDescription,  lubricants,  lubricantsUnit,  parafin,  parafinUnit,  petroleum,  petroleumUnit,  aromatics,  aromaticsUnit,  fluids,  fluidsUnit,  pfc,  pfcUnit,  hfc,  hfcUnit,  other2,  other2Unit,  other2Description);
        return new ResponseEntity<>(sc1, OK);
    }

    private Integer parseJSONValue(String strJSON) {
        return ChecksProvider.stringIsNotNull(strJSON) ? Integer.parseInt(strJSON.replace("\"", "")) : null;
    }

    @PostMapping("/update")
    public ResponseEntity<Sector4IPPU> updateSector4 (@RequestParam("id") String strId,
                                                      @RequestParam("clinker") String clinkerStr,
                                                      @RequestParam("clinkerUnit") String clinkerUnit,
                                                      @RequestParam("lime") String limeStr,
                                                      @RequestParam("limeUnit") String limeUnit,
                                                      @RequestParam("glass") String glassStr,
                                                      @RequestParam("glassUnit") String glassUnit,
                                                      @RequestParam("ammonia") String ammoniaStr,
                                                      @RequestParam("ammoniaUnit") String ammoniaUnit,
                                                      @RequestParam("nitricAcid") String nitricAcidStr,
                                                      @RequestParam("nitricAcidUnit") String nitricAcidUnit,
                                                      @RequestParam("adipicAcid") String adipicAcidStr,
                                                      @RequestParam("adipicAcidUnit") String adipicAcidUnit,
                                                      @RequestParam("othersAcid") String othersAcidStr,
                                                      @RequestParam("othersAcidUnit") String othersAcidUnit,
                                                      @RequestParam("carbide") String carbideStr,
                                                      @RequestParam("carbideUnit") String carbideUnit,
                                                      @RequestParam("titanium") String titaniumStr,
                                                      @RequestParam("titaniumUnit") String titaniumUnit,
                                                      @RequestParam("soda") String sodaStr,
                                                      @RequestParam("sodaUnit") String sodaUnit,
                                                      @RequestParam("metallurgical") String metallurgicalStr,
                                                      @RequestParam("metallurgicalUnit") String metallurgicalUnit,
                                                      @RequestParam("iron") String ironStr,
                                                      @RequestParam("ironUnit") String ironUnit,
                                                      @RequestParam("ferroalloy") String ferroalloyStr,
                                                      @RequestParam("ferroalloyUnit") String ferroalloyUnit,
                                                      @RequestParam("aluminum") String aluminumStr,
                                                      @RequestParam("aluminumUnit") String aluminumUnit,
                                                      @RequestParam("magnesium") String magnesiumStr,
                                                      @RequestParam("magnesiumUnit") String magnesiumUnit,
                                                      @RequestParam("lead") String leadStr,
                                                      @RequestParam("leadUnit") String leadUnit,
                                                      @RequestParam("zinc") String zincStr,
                                                      @RequestParam("zincUnit") String zincUnit,
                                                      @RequestParam("other") String otherStr,
                                                      @RequestParam("otherUnit") String otherUnit,
                                                      @RequestParam("otherDescription") String otherDescription,
                                                      @RequestParam("lubricants") String lubricantsStr,
                                                      @RequestParam("lubricantsUnit") String lubricantsUnit,
                                                      @RequestParam("parafin") String parafinStr,
                                                      @RequestParam("parafinUnit") String parafinUnit,
                                                      @RequestParam("petroleum") String petroleumStr,
                                                      @RequestParam("petroleumUnit") String petroleumUnit,
                                                      @RequestParam("aromatics") String aromaticsStr,
                                                      @RequestParam("aromaticsUnit") String aromaticsUnit,
                                                      @RequestParam("fluids") String fluidsStr,
                                                      @RequestParam("fluidsUnit") String fluidsUnit,
                                                      @RequestParam("pfc") String pfcStr,
                                                      @RequestParam("pfcUnit") String pfcUnit,
                                                      @RequestParam("hfc") String hfcStr,
                                                      @RequestParam("hfcUnit") String hfcUnit,
                                                      @RequestParam("other2") String other2Str,
                                                      @RequestParam("other2Unit") String other2Unit,
                                                      @RequestParam("other2Description") String other2Description
                                                      ) throws IOException, ParseException {

        Long id = Long.valueOf(parseJSONValue(strId));
        Integer clinker = parseJSONValue(clinkerStr);
        Integer lime = parseJSONValue(limeStr);
        Integer glass = parseJSONValue(glassStr);
        Integer ammonia = parseJSONValue(ammoniaStr);
        Integer nitricAcid = parseJSONValue(nitricAcidStr);
        Integer adipicAcid = parseJSONValue(adipicAcidStr);
        Integer othersAcid = parseJSONValue(othersAcidStr);
        Integer carbide = parseJSONValue(carbideStr);
        Integer titanium = parseJSONValue(titaniumStr);
        Integer soda = parseJSONValue(sodaStr);
        Integer metallurgical = parseJSONValue(metallurgicalStr);
        Integer iron = parseJSONValue(ironStr);
        Integer ferroalloy = parseJSONValue(ferroalloyStr);
        Integer aluminum = parseJSONValue(aluminumStr);
        Integer magnesium = parseJSONValue(magnesiumStr);
        Integer lead = parseJSONValue(leadStr);
        Integer zinc = parseJSONValue(zincStr);
        Integer other = parseJSONValue(otherStr);
        Integer lubricants = parseJSONValue(lubricantsStr);
        Integer parafin = parseJSONValue(parafinStr);
        Integer petroleum = parseJSONValue(petroleumStr);
        Integer aromatics = parseJSONValue(aromaticsStr);
        Integer fluids = parseJSONValue(fluidsStr);
        Integer pfc = parseJSONValue(pfcStr);
        Integer hfc = parseJSONValue(hfcStr);
        Integer other2 = parseJSONValue(other2Str);

        Sector4IPPU sc1 = sector4IPPUService.updateSector4(id,clinker,clinkerUnit,lime,limeUnit,glass,glassUnit,ammonia,ammoniaUnit,nitricAcid,nitricAcidUnit,adipicAcid,adipicAcidUnit,othersAcid,othersAcidUnit, carbide,  carbideUnit,  titanium,  titaniumUnit,  soda,  sodaUnit,  metallurgical,  metallurgicalUnit,  iron,  ironUnit,  ferroalloy,  ferroalloyUnit,  aluminum,  aluminumUnit,  magnesium,  magnesiumUnit,  lead,  leadUnit,  zinc,  zincUnit,  other,  otherUnit,  otherDescription,  lubricants,  lubricantsUnit,  parafin,  parafinUnit,  petroleum,  petroleumUnit,  aromatics,  aromaticsUnit,  fluids,  fluidsUnit,  pfc,  pfcUnit,  hfc,  hfcUnit,  other2,  other2Unit,  other2Description);
        return new ResponseEntity<>(sc1, OK);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyAuthority('user:delete')")
    public ResponseEntity<HttpResponse> deleteSector4(@PathVariable("id") String strId) throws IOException {
        Long id = Long.valueOf(ChecksProvider.stringIsNotNull(strId)?Integer.parseInt(strId.replace("\"","")):null);
        sector4IPPUService.deleteSector4byId(id);
        return response(OK, Sector4_DELETED_SUCCESSFULLY);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(),
                message), httpStatus);
    }
}
