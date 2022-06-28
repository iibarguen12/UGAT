package com.supportportal.repository;

import com.supportportal.domain.Sector2Transportation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Sector2TransportationRepository extends JpaRepository<Sector2Transportation, Long> {

    Sector2Transportation findSector2ById(Long id);

    List<Sector2Transportation> findSector2BySubSector(String subSector);

    List<Sector2Transportation> findSector2ByScope(String scope);
}
