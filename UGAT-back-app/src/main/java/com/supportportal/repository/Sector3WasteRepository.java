package com.supportportal.repository;

import com.supportportal.domain.Sector3Waste;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Sector3WasteRepository extends JpaRepository<Sector3Waste, Long> {

    Sector3Waste findSector3ById(Long id);

    List<Sector3Waste> findSector3BySubSector(String subSector);

    List<Sector3Waste> findSector3ByScope(String scope);
}
