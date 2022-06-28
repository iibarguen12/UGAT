package com.supportportal.domain;

import java.io.Serializable;
import java.util.Objects;

public class GovernmentId implements Serializable {
    private String inventoryPeriod;
    private String cityName;

    public GovernmentId() {
    }

    public GovernmentId(String inventoryPeriod, String cityName) {
        this.inventoryPeriod = inventoryPeriod;
        this.cityName = cityName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GovernmentId that = (GovernmentId) o;
        return inventoryPeriod.equals(that.inventoryPeriod) && cityName.equals(that.cityName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(inventoryPeriod, cityName);
    }
}
