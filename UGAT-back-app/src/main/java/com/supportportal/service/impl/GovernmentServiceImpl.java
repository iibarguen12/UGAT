package com.supportportal.service.impl;

import com.supportportal.domain.Government;
import com.supportportal.repository.GovernmentRepository;
import com.supportportal.service.GovernmentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Date;
import java.util.List;


@Service
@Transactional
public class GovernmentServiceImpl implements GovernmentService {
    private Logger LOGGER = LoggerFactory.getLogger(getClass());
    private GovernmentRepository governmentRepository;

    @Autowired
    public GovernmentServiceImpl(GovernmentRepository governmentRepository) {
        this.governmentRepository = governmentRepository;
    }

    @Override
    public List<Government> getGovernmentsInfo() {
        return governmentRepository.findAll();
    }

    @Override
    public Government findGovernmentInfoByCityName(String cityName, String inventoryPeriod) {
        return governmentRepository.findGovernmentByCityNameAndInventoryPeriod(cityName, inventoryPeriod);
    }

    @Override
    public Government addGovernment(Date submissionDate, String inventoryPeriod, String cityName, Long population, Integer populationYear, Long GDPInUSD, Integer landArea, String inventoryLevel, String personInCharge, String contactEmail, String GHGInventoryVerified, Integer verificationYear, String verificationContact) throws IOException {
        Government government = new Government();
        government.setSubmissionDate(submissionDate);
        government.setInventoryPeriod(inventoryPeriod);
        government.setCityName(cityName);
        government.setPopulation(population);
        government.setPopulationYear(populationYear);
        government.setgDPInUSD(GDPInUSD);
        government.setLandArea(landArea);
        government.setInventoryLevel(inventoryLevel);
        government.setPersonInCharge(personInCharge);
        government.setContactEmail(contactEmail);
        government.setgHGInventoryVerified(GHGInventoryVerified);
        government.setVerificationYear(verificationYear);
        government.setVerificationContact(verificationContact);
        governmentRepository.save(government);
        LOGGER.info("New government for city " + government.getCityName() + " and period "+government.getInventoryPeriod());
        return government;
    }

    @Override
    public Government updateGovernment(Date submissionDate, String inventoryPeriod, String cityName, Long population, Integer populationYear, Long GDPInUSD, Integer landArea, String inventoryLevel, String personInCharge, String contactEmail, String GHGInventoryVerified, Integer verificationYear, String verificationContact) throws IOException {
        Government government = new Government();
        government.setSubmissionDate(submissionDate);
        government.setInventoryPeriod(inventoryPeriod);
        government.setCityName(cityName);
        government.setPopulation(population);
        government.setPopulationYear(populationYear);
        government.setgDPInUSD(GDPInUSD);
        government.setLandArea(landArea);
        government.setInventoryLevel(inventoryLevel);
        government.setPersonInCharge(personInCharge);
        government.setContactEmail(contactEmail);
        government.setgHGInventoryVerified(GHGInventoryVerified);
        government.setVerificationYear(verificationYear);
        government.setVerificationContact(verificationContact);
        governmentRepository.save(government);
        LOGGER.info("Government for city " + government.getCityName() + " and period "+government.getInventoryPeriod()+" updated");
        return government;
    }

    @Override
    public void deleteGovernment(String cityName, String inventoryPeriod) throws IOException {
        governmentRepository.deleteGovernmentByCityNameAndInventoryPeriod(cityName, inventoryPeriod);

    }
}
