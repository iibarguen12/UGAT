package com.supportportal.resource;

import com.supportportal.domain.Government;
import com.supportportal.domain.HttpResponse;
import com.supportportal.exception.ExceptionHandling;
import com.supportportal.service.GovernmentService;
import com.supportportal.utility.ChecksProvider;
import com.supportportal.utility.JWTTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping(path = { "/government"})
public class GovernmentResource extends ExceptionHandling {
    public static final String GOVERNMENT_DELETED_SUCCESSFULLY = "Government deleted successfully";

    private AuthenticationManager authenticationManager;
    private GovernmentService governmentService;
    private JWTTokenProvider jwtTokenProvider;

    @Autowired
    public GovernmentResource(AuthenticationManager authenticationManager, GovernmentService governmentService, JWTTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.governmentService = governmentService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/add")
    public ResponseEntity<Government> addGovernment(@RequestParam("submissionDate") String strSubmissionDate,
                                                    @RequestParam("inventoryPeriod") String inventoryPeriod,
                                                    @RequestParam("cityName") String cityName,
                                                    @RequestParam("population") String strPopulation,
                                                    @RequestParam("populationYear") String strPopulationYear,
                                                    @RequestParam("gDPInUSD") String strGDPInUSD,
                                                    @RequestParam("landArea") String strLandArea,
                                                    @RequestParam("inventoryLevel") String inventoryLevel,
                                                    @RequestParam("personInCharge") String personInCharge,
                                                    @RequestParam("contactEmail") String contactEmail,
                                                    @RequestParam("gHGInventoryVerified") String GHGInventoryVerified,
                                                    @RequestParam("verificationYear") String strVerificationYear,
                                                    @RequestParam("verificationContact") String verificationContact) throws IOException, ParseException {

        Date submissionDate=new SimpleDateFormat("yyyy-MM-dd").parse(strSubmissionDate.replace("\"",""));
        Long population = ChecksProvider.stringIsNotNull(strPopulation)?Long.parseLong(strPopulation.replace("\"","")):null;
        Long GDPInUSD = ChecksProvider.stringIsNotNull(strGDPInUSD)?Long.parseLong(strGDPInUSD.replace("\"","")):null;
        Integer populationYear = ChecksProvider.stringIsNotNull(strPopulationYear)?Integer.parseInt(strPopulationYear.replace("\"","")):null;
        Integer landArea = ChecksProvider.stringIsNotNull(strLandArea)?Integer.parseInt(strLandArea.replace("\"","")):null;
        Integer verificationYear = ChecksProvider.stringIsNotNull(strVerificationYear)?Integer.parseInt(strVerificationYear.replace("\"","")):null;

        Government newGovernment = governmentService.addGovernment(submissionDate,inventoryPeriod,cityName,population,populationYear,GDPInUSD,landArea,inventoryLevel,personInCharge,contactEmail,GHGInventoryVerified,verificationYear,verificationContact);
        return new ResponseEntity<>(newGovernment, OK);
    }

    @PostMapping("/update")
    public ResponseEntity<Government> updateGovernment(@RequestParam("submissionDate") String strSubmissionDate,
                                                       @RequestParam("inventoryPeriod") String inventoryPeriod,
                                                       @RequestParam("cityName") String cityName,
                                                       @RequestParam("population") String strPopulation,
                                                       @RequestParam("populationYear") String strPopulationYear,
                                                       @RequestParam("gDPInUSD") String strGDPInUSD,
                                                       @RequestParam("landArea") String strLandArea,
                                                       @RequestParam("inventoryLevel") String inventoryLevel,
                                                       @RequestParam("personInCharge") String personInCharge,
                                                       @RequestParam("contactEmail") String contactEmail,
                                                       @RequestParam("gHGInventoryVerified") String GHGInventoryVerified,
                                                       @RequestParam("verificationYear") String strVerificationYear,
                                                       @RequestParam("verificationContact") String verificationContact) throws IOException, ParseException {

        Date submissionDate=new SimpleDateFormat("yyyy-MM-dd").parse(strSubmissionDate.replace("\"",""));
        Long population = ChecksProvider.stringIsNotNull(strPopulation)?Long.parseLong(strPopulation.replace("\"","")):null;
        Long GDPInUSD = ChecksProvider.stringIsNotNull(strGDPInUSD)?Long.parseLong(strGDPInUSD.replace("\"","")):null;
        Integer populationYear = ChecksProvider.stringIsNotNull(strPopulationYear)?Integer.parseInt(strPopulationYear.replace("\"","")):null;
        Integer landArea = ChecksProvider.stringIsNotNull(strLandArea)?Integer.parseInt(strLandArea.replace("\"","")):null;
        Integer verificationYear = ChecksProvider.stringIsNotNull(strVerificationYear)?Integer.parseInt(strVerificationYear.replace("\"","")):null;
        Government updatedGovernment = governmentService.updateGovernment(submissionDate,inventoryPeriod,cityName,population,populationYear,GDPInUSD,landArea,inventoryLevel,personInCharge,contactEmail,GHGInventoryVerified,verificationYear,verificationContact);
        return new ResponseEntity<>(updatedGovernment, OK);
    }
    
    @GetMapping("/find/{cityName}/{inventoryPeriod}")
    public ResponseEntity<Government> getGovernment(@PathVariable("cityName") String cityName,
                                        @PathVariable("inventoryPeriod") String inventoryPeriod) {
        Government government = governmentService.findGovernmentInfoByCityName(cityName, inventoryPeriod);
        return new ResponseEntity<>(government, OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Government>> getAllGovernments() {
        List<Government> users = governmentService.getGovernmentsInfo();
        return new ResponseEntity<>(users, OK);
    }

    @DeleteMapping("/delete/{cityName}/{inventoryPeriod}")
    @PreAuthorize("hasAnyAuthority('user:delete')")
    public ResponseEntity<HttpResponse> deleteGovernment(@PathVariable("cityName") String cityName,
                                                         @PathVariable("inventoryPeriod") String inventoryPeriod) throws IOException {
        governmentService.deleteGovernment(cityName,inventoryPeriod);
        return response(OK, GOVERNMENT_DELETED_SUCCESSFULLY);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(),
                message), httpStatus);
    }

}
