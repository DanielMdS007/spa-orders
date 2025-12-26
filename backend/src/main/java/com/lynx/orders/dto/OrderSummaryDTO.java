package com.lynx.orders.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.lynx.orders.entity.Order;

@JsonPropertyOrder({ "id", "customerId", "status", "createdAt" })
public class OrderSummaryDTO {
    private Long id;
    private Long customerId;
    private String status;
    private LocalDateTime createdAt;
    private Double total;

    // Construtor
    public OrderSummaryDTO(Order order) {
        this.id = order.getId();
        this.customerId = order.getCustomerId();
        this.status = order.getStatus();
        this.createdAt = order.getCreatedAt();
        this.total = order.getItems().stream()
                          .mapToDouble(item -> item.getUnitPrice() * item.getQuantity())
                          .sum();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    
}