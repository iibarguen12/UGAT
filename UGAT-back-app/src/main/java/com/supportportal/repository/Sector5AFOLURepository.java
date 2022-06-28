package com.supportportal.repository;

import com.supportportal.domain.Sector5AFOLU;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Sector5AFOLURepository extends JpaRepository<Sector5AFOLU, Long> {

    Sector5AFOLU findSector5ById(Long id);

    List<Sector5AFOLU> findSector5BySubSector(String subSector);

    List<Sector5AFOLU> findSector5ByScope(String scope);
}
