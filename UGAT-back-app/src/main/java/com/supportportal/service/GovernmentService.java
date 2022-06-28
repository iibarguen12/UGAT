package com.supportportal.service;

import com.supportportal.domain.Government;
import com.supportportal.exception.domain.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.util.Date;
import java.util.List;

public interface GovernmentService {

    List<Government> getGovernmentsInfo();

    Government findGovernmentInfoByCityName(String cityName, String inventoryPeriod);

    Government addGovernment(Date submissionDate, String inventoryPeriod, String cityName, Long population, Integer populationYear, Long GDPInUSD, Integer landArea, String inventoryLevel, String personInCharge, String contactEmail, String GHGInventoryVerified, Integer verificationYear, String verificationContact) throws  IOException;

    Government updateGovernment(Date submissionDate, String inventoryPeriod, String cityName, Long population, Integer populationYear, Long GDPInUSD, Integer landArea, String inventoryLevel, String personInCharge, String contactEmail, String GHGInventoryVerified, Integer verificationYear, String verificationContact) throws  IOException;

    void deleteGovernment(String cityName, String inventoryPeriod) throws IOException;

}
