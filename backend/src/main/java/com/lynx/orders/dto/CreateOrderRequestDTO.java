package com.lynx.orders.dto;

import java.util.List;

public class CreateOrderRequestDTO {

    private Long customerId;
    private List<CreateOrderItemDTO> items;

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public List<CreateOrderItemDTO> getItems() {
        return items;
    }

    public void setItems(List<CreateOrderItemDTO> items) {
        this.items = items;
    }
}