package com.supportportal.repository;

import com.supportportal.domain.Sector1Energy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Sector1EnergyRepository extends JpaRepository<Sector1Energy, Long> {

    Sector1Energy findSector1ById(Long id);

    List<Sector1Energy> findSector1BySubSector(String subSector);

    List<Sector1Energy> findSector1ByScope(String scope);
}
