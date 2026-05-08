package com.manoplas.viandas.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Map;
import java.util.HashMap;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResumenSemanalDTO {
    // Totales Semanales (Lunes a Viernes)
    // Key: "STANDARD", "CALORIAS", "SALAD"
    // Value: Map where Key is day (Lunes, Martes, etc.) and Value is counts (Normal, S/S)
    private Map<String, Map<String, DiaCountsDTO>> totalesSemanales = new HashMap<>();

    // Totales Diarios (Suma de todo por día)
    private Map<String, Integer> totalesDiarios = new HashMap<>();

    // Totales Diarios Incluyendo S/S
    private Map<String, Integer> totalesDiariosConEspeciales = new HashMap<>();

    // Totales Fin de Semana (Sabado, Domingo)
    // Key: "OPC 1", "OPC 2", "OPC 3", "EXTRA"
    private Map<String, Map<String, Integer>> totalesFinSemana = new HashMap<>();

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DiaCountsDTO {
        private int normal = 0;
        private int sinSal = 0;
    }
}
