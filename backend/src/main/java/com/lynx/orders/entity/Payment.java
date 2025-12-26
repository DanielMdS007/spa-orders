package com.lynx.orders.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "payments")
@JsonPropertyOrder({ "id", "order_id", "method", "amount_cents", "paid_at" })
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "order_id", nullable = false)
    @JsonProperty("order_id")
    private Long orderId;

    @Column(name = "method", nullable = false)
    private String method;
    
    @Column(name = "amount_cents", nullable = false)
    @JsonProperty("amount_cents")
    private Double amountCents;

    @Column(name = "paid_at", nullable = false)
    private LocalDateTime paidAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public Double getAmountCents() {
        return amountCents;
    }

    public void setAmountCents(Double amountCents) {
        this.amountCents = amountCents;
    }

    public LocalDateTime getPaidAt() {
        return paidAt;
    }

    public void setPaidAt(LocalDateTime paidAt) {
        this.paidAt = paidAt;
    }


        



}
