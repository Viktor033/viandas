package com.manoplas.viandas.service;

import com.manoplas.viandas.model.DetallePedido;
import com.manoplas.viandas.model.Pedido;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.*;
import com.mercadopago.resources.preference.Preference;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class MercadoPagoService {

    @Value("${mp.access.token}")
    private String accessToken;

    @Value("${mp.back.url.success}")
    private String backUrlSuccess;

    @Value("${mp.back.url.failure}")
    private String backUrlFailure;

    @Value("${mp.back.url.pending}")
    private String backUrlPending;

    @Value("${mp.notification.url}")
    private String notificationUrl;

    public String createPreference(Pedido pedido) {
        try {
            MercadoPagoConfig.setAccessToken(accessToken);

            // DEBUG LOGS
            System.out.println("--- DEBUG MP SERVICE ---");
            System.out.println("Access Token: " + (accessToken != null ? "PRESENTE" : "NULO"));
            System.out.println("Back URL Success: " + backUrlSuccess);

            // Validación de URLs de retorno usando las propiedades inyectadas
            if (backUrlSuccess == null || backUrlSuccess.trim().isEmpty())
                backUrlSuccess = "http://localhost:4200/pago-exitoso";
            if (backUrlFailure == null || backUrlFailure.trim().isEmpty())
                backUrlFailure = "http://localhost:4200/pago-fallido";
            if (backUrlPending == null || backUrlPending.trim().isEmpty())
                backUrlPending = "http://localhost:4200/pago-pendiente";

            System.out.println("Usando Back URLs: Success=" + backUrlSuccess + ", Failure=" + backUrlFailure
                    + ", Pending=" + backUrlPending);

            // Check Notification URL
            if (notificationUrl != null) {
                System.out.println("Notification URL: " + notificationUrl);
            }

            List<PreferenceItemRequest> items = new ArrayList<>();

            for (DetallePedido detalle : pedido.getDetalles()) {
                PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
                        .id(detalle.getProducto().getId().toString())
                        .title(detalle.getProducto().getNombre())
                        .quantity(detalle.getCantidad())
                        .unitPrice(new BigDecimal(detalle.getPrecioUnitario()))
                        .currencyId("ARS")
                        .build();
                items.add(itemRequest);
            }

            PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.builder()
                    .success(backUrlSuccess)
                    .failure(backUrlFailure)
                    .pending(backUrlPending)
                    .build();

            // Configuración de métodos de pago
            List<PreferencePaymentMethodRequest> excludedPaymentMethods = new ArrayList<>();
            // Si el método es específicamente TARJETA, podríamos excluir otros medios.
            // Por defecto, MP muestra todo. Si queremos "solo tarjeta", podemos excluir
            // 'ticket' (efectivo) y 'atm'.
            if (pedido.getMetodoPago() == com.manoplas.viandas.model.MetodoPago.TARJETA) {
                excludedPaymentMethods.add(PreferencePaymentMethodRequest.builder().id("ticket").build());
                excludedPaymentMethods.add(PreferencePaymentMethodRequest.builder().id("atm").build());
            }

            PreferencePaymentMethodsRequest paymentMethods = PreferencePaymentMethodsRequest.builder()
                    .excludedPaymentMethods(excludedPaymentMethods)
                    .installments(12) // Permitir hasta 12 cuotas por defecto
                    .build();

            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(items)
                    .backUrls(backUrls)
                    .paymentMethods(paymentMethods)
                    .autoReturn("approved")
                    .notificationUrl(notificationUrl)
                    .externalReference(pedido.getId().toString())
                    .build();

            PreferenceClient client = new PreferenceClient();
            Preference preference = client.create(preferenceRequest);

            return preference.getInitPoint(); // Para producción usar getInitPoint(), sandbox usar getSandboxInitPoint()
                                              // solo si es especÃ­fico

        } catch (com.mercadopago.exceptions.MPApiException apiException) {
            System.err.println("=== ERROR RESPUESTA MERCADOPAGO ===");
            System.err.println(apiException.getApiResponse().getContent());
            System.err.println("===================================");
            throw new RuntimeException("Error MP: " + apiException.getApiResponse().getContent());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error al crear preferencia de MP", e);
        }
    }
}
