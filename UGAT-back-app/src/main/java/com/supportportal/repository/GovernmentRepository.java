package com.supportportal.repository;

import com.supportportal.domain.Government;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GovernmentRepository extends JpaRepository<Government, Long> {

    Government findGovernmentByCityNameAndInventoryPeriod(String cityName, String inventoryPeriod);

    void deleteGovernmentByCityNameAndInventoryPeriod(String cityName, String inventoryPeriod);
}
