package com.supportportal.repository;

import com.supportportal.domain.Sector4IPPU;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Sector4IPPURepository extends JpaRepository<Sector4IPPU, Long> {

    Sector4IPPU findSector4ById(Long id);

    List<Sector4IPPU> findSector4BySubSector(String subSector);

    List<Sector4IPPU> findSector4ByScope(String scope);
}
