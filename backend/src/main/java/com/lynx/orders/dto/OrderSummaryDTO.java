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
    private Integer total;
    private Integer itemCount;

    // Construtor
    public OrderSummaryDTO(Order order) {
        this.id = order.getId();
        this.customerId = order.getCustomerId();
        this.status = order.getStatus();
        this.createdAt = order.getCreatedAt();
        this.itemCount = order.getItems().size();
        this.total = order.getItems().stream()
                          .mapToInt(item -> item.getUnitPrice() * item.getQuantity())
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

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Integer getItemCount() {
        return itemCount;
    }

    public void setItemCount(Integer itemCount) {
        this.itemCount = itemCount;
    }

    
}