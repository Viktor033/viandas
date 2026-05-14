package com.manoplas.viandas.dto;

import java.util.Map;
import java.util.HashMap;

public class ResumenSemanalDTO {

    private Map<String, Map<String, DiaCountsDTO>> totalesSemanales = new HashMap<>();
    private Map<String, Integer> totalesDiarios = new HashMap<>();
    private Map<String, Integer> totalesDiariosConEspeciales = new HashMap<>();
    private Map<String, Map<String, Integer>> totalesFinSemana = new HashMap<>();

    public Map<String, Map<String, DiaCountsDTO>> getTotalesSemanales() { return totalesSemanales; }
    public void setTotalesSemanales(Map<String, Map<String, DiaCountsDTO>> v) { this.totalesSemanales = v; }

    public Map<String, Integer> getTotalesDiarios() { return totalesDiarios; }
    public void setTotalesDiarios(Map<String, Integer> v) { this.totalesDiarios = v; }

    public Map<String, Integer> getTotalesDiariosConEspeciales() { return totalesDiariosConEspeciales; }
    public void setTotalesDiariosConEspeciales(Map<String, Integer> v) { this.totalesDiariosConEspeciales = v; }

    public Map<String, Map<String, Integer>> getTotalesFinSemana() { return totalesFinSemana; }
    public void setTotalesFinSemana(Map<String, Map<String, Integer>> v) { this.totalesFinSemana = v; }

    public static class DiaCountsDTO {
        private int normal = 0;
        private int sinSal = 0;

        public DiaCountsDTO() {}
        public DiaCountsDTO(int normal, int sinSal) { this.normal = normal; this.sinSal = sinSal; }

        public int getNormal() { return normal; }
        public void setNormal(int normal) { this.normal = normal; }
        public int getSinSal() { return sinSal; }
        public void setSinSal(int sinSal) { this.sinSal = sinSal; }
    }
}
