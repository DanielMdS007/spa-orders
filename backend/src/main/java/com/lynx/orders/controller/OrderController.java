package com.lynx.orders.controller;


import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lynx.orders.dto.CreateOrderRequestDTO;
import com.lynx.orders.dto.OrderSummaryDTO;
import com.lynx.orders.entity.Order;
import com.lynx.orders.entity.OrderItem;
import com.lynx.orders.service.OrderService;

@RestController
@RequestMapping("/orders")

public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
    //GET all orders
    @GetMapping
    public List<OrderSummaryDTO> getAllOrders() {
        return orderService.findAllSummary(); // resume without items
    }


    //GET order by id
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderService.findByIdWithItems(id); // traz pedido + itens
    }


    //Post create order with items
    @PostMapping
    public Order createOrderWithItems(@RequestBody CreateOrderRequestDTO request) {
        return orderService.createOrderWithItems(request);
    }

    //POST order item
    @PostMapping("/{Id}")
    public OrderItem addOrderItem(@PathVariable Long Id, @RequestBody OrderItem request){
        return orderService.addItemToOrder(Id, request.getProductId(), request.getQuantity());
    }
    
    

}
